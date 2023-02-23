import * as fs from 'fs';
import { ArrayHelpers } from 'ts-help';
import * as path from 'path';

const EXTRACT_OBJECT_DECODER_REGEX = (typeName: string) =>
	new RegExp(
		`${typeName}Decoder = object\\({\\n\\t([\\w\\W]*)\\n}\\);\\n$`,
		'g'
	);

const EXTRACT_CLASS_CONSTRUCTOR_REGEX = /constructor\(([^)]*)\)/g;

const recursiveReadDir = (dirPath: string, extension?: string): string[] => {
	const results: string[] = [];
	const files = fs.readdirSync(dirPath);

	if (ArrayHelpers.isEmpty(files)) return results;

	files.forEach((fileName) => {
		const file = path.resolve(dirPath, fileName);
		const stat = fs.statSync(file);

		if (stat.isDirectory()) {
			const results_ = recursiveReadDir(file, extension);
			results.push(...results_);
		} else if (!extension || file.endsWith(extension)) {
			results.push(file);
		}
	});

	return results;
};

const getFileName = (path: string, extensionToRemove?: string): string => {
	return (path.split('/').pop() || path).replace(extensionToRemove || '', '');
};

const removeEscapedCharacters = (properties: string[]): string[] => {
	return properties.map((property) => {
		return property.replace(/\n/g, '').replace(/\t/g, '').replace(/\r/g, '');
	});
};

enum PropertyType {
	Array = 'Array',
	Maybe = 'Maybe',
	Classic = 'Classic'
}

type ArrayProperty = {
	type: PropertyType.Array;
	valuesType: FilePropertyType;
};

type MaybeProperty = {
	type: PropertyType.Maybe;
	valueType: FilePropertyType;
};

type ClassicProperty = {
	type: PropertyType.Classic;
	property: string;
};

type FilePropertyType = MaybeProperty | ArrayProperty | ClassicProperty;

type FileProperty = {
	name: string;
	type: FilePropertyType;
};

const propertiesMatch = (
	fileProp: FileProperty,
	fileEntityProp: string
): boolean => {
	const expected = `${
		fileProp.name
	}: ${translateFilePropertyToFileEntityProperty(fileProp.type)}`;
	//console.log('EXPECTED: ', expected);
	return expected === fileEntityProp;
};

const translateFilePropertyToFileEntityProperty = (
	fileProperty: FilePropertyType
): string => {
	switch (fileProperty.type) {
		case PropertyType.Array:
			return translateArrayProperty(fileProperty);

		case PropertyType.Maybe:
			return translateMaybeProperty(fileProperty);

		case PropertyType.Classic:
			return translateClassicProperty(fileProperty);
	}
};

const translateArrayProperty = (fileProp: ArrayProperty): string => {
	return `${translateFilePropertyToFileEntityProperty(fileProp.valuesType)}[]`;
};

const translateMaybeProperty = (fileProp: MaybeProperty): string => {
	return `{ value?: ${translateFilePropertyToFileEntityProperty(
		fileProp.valueType
	)} }`;
};

const translateClassicProperty = (fileProp: ClassicProperty): string => {
	return fileProp.property;
};

const EXTRACT_PROPERTY_NAME_AND_TYPE_REGEX = /^([\w\W]*): ([\w\W]*)$/g;

const ARRAY_PROPERTY_REGEX = /^array\(([\w\W]*)\)$/g;

const MAYBE_PROPERTY_REGEX = /^MaybeDecoder\(([\w\W]*)\)$/g;

const getFilePropertyType = (filePropertyType: string): FilePropertyType => {
	const [arrayMatch, maybeMatch] = [
		ARRAY_PROPERTY_REGEX.exec(filePropertyType),
		MAYBE_PROPERTY_REGEX.exec(filePropertyType)
	];

	ARRAY_PROPERTY_REGEX.lastIndex = 0;
	MAYBE_PROPERTY_REGEX.lastIndex = 0;

	if (arrayMatch) {
		arrayMatch.shift();
		const [valuesType] = arrayMatch;

		if (valuesType) {
			return {
				type: PropertyType.Array,
				valuesType: getFilePropertyType(valuesType)
			};
		}
	} else if (maybeMatch) {
		maybeMatch.shift();
		const [valueType] = maybeMatch;

		if (valueType) {
			return {
				type: PropertyType.Maybe,
				valueType: getFilePropertyType(valueType)
			};
		}
	} else {
		return {
			type: PropertyType.Classic,
			property: filePropertyType
		};
	}

	throw new Error(`Couldn't determine valueType : "${filePropertyType}"`);
};

const getFileProperty = (fileProperty: string): FileProperty => {
	const propertyMatch = EXTRACT_PROPERTY_NAME_AND_TYPE_REGEX.exec(fileProperty);
	EXTRACT_PROPERTY_NAME_AND_TYPE_REGEX.lastIndex = 0;

	if (propertyMatch) {
		propertyMatch.shift();

		const [propertyName, propertyType] = propertyMatch;

		if (propertyName && propertyType) {
			return {
				name: propertyName,
				type: getFilePropertyType(propertyType)
			};
		}
	}

	throw new Error(`Couldn't extract name and valueType : "${fileProperty}"`);
};

const run = () => {
	const files = recursiveReadDir('../src/utils/models/entities', '.ts');
	const entitiesFiles = recursiveReadDir('../src/modules/cats', '.entity.ts');

	// console.log('EntitiesFiles : ', JSON.stringify(entitiesFiles));

	if (files.length !== entitiesFiles.length) {
		throw new Error(
			'The amount of entities is not the same as the amount of types'
		);
	}

	const filesTuples: [string, string][] = files.map((file) => {
		const maybeEntityFile = ArrayHelpers.find(entitiesFiles, (entityFile) =>
			entityFile.endsWith(`${getFileName(file, '.ts').toLowerCase()}.entity.ts`)
		);

		if (maybeEntityFile.isSome) {
			return [file, maybeEntityFile.value];
		} else {
			throw new Error(`No entity file found for "${file}"`);
		}
	});

	// console.log('Tuples: ', filesTuples);

	filesTuples.forEach(([file, fileEntity]) => {
		const fileProperties: string[] = [];
		let fileEntityProperties: string[] = [];

		const fileName = getFileName(file, '.ts');
		const fileContent = fs.readFileSync(file).toString();

		const fileMatch = EXTRACT_OBJECT_DECODER_REGEX(fileName).exec(fileContent);

		if (fileMatch) {
			fileMatch.shift();
			const [extract] = fileMatch;
			fileProperties.push(...removeEscapedCharacters(extract.split(',\n')));
		} else {
			throw new Error(`Cannot find "${fileName}" type in "${file}" file`);
		}

		const fileEntityName = getFileName(fileEntity, '.entity.ts');
		const fileEntityContent = fs.readFileSync(fileEntity).toString();

		const fileEntityMatch =
			EXTRACT_CLASS_CONSTRUCTOR_REGEX.exec(fileEntityContent);
		EXTRACT_CLASS_CONSTRUCTOR_REGEX.lastIndex = 0;

		if (fileEntityMatch) {
			fileEntityMatch.shift();
			const [extract] = fileEntityMatch;
			fileEntityProperties.push(
				...removeEscapedCharacters(extract.split(',\n'))
			);
		} else {
			throw new Error(`Cannot find "${fileEntityName}" type in "${file}" file`);
		}

		if (fileProperties.length !== fileEntityProperties.length) {
			throw new Error(
				`"${fileName}" entity and type don't have the same amount of properties`
			);
		}

		// console.log(
		// 	'fileEntitiesProperties: ',
		// 	JSON.stringify(fileEntityProperties)
		// );

		fileProperties.forEach((fileProperty) => {
			const fileProperty_ = getFileProperty(fileProperty);
			const matchingFileEntityPropertyIndex = fileEntityProperties.findIndex(
				(fileEntityProperty) => {
					// console.log('PROP TEST : ', fileEntityProperty);
					return propertiesMatch(fileProperty_, fileEntityProperty);
				}
			);
			const maybeMatchingFileEntityProperty = ArrayHelpers.getValue(
				fileEntityProperties,
				matchingFileEntityPropertyIndex
			);

			if (!maybeMatchingFileEntityProperty.isSome) {
				throw new Error(
					`Couldn't match types on property "${fileProperty}" in ${fileName}.ts and ${fileEntityName}.entity.ts`
				);
			}

			fileEntityProperties = fileEntityProperties.reduce<string[]>(
				(acc, curr, index) => {
					index !== matchingFileEntityPropertyIndex && acc.push(curr);
					return acc;
				},
				[]
			);
		});

		console.log('Verification successful');
	});
};

run();
