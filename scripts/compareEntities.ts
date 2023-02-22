import * as fs from 'fs';
import { ArrayHelpers } from 'ts-help';
import * as path from 'path';

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

const EXTRACT_OBJECT_DECODER_REGEX = (typeName: string) =>
	new RegExp(
		`${typeName}Decoder = object\\({\\n\\t([\\w\\W]*)\\n}\\);\\n$`,
		'g'
	);

const removeEscapedCharacters = (properties: string[]): string[] => {
	return properties.map((property) => {
		return property.replace(/\n/g, '').replace(/\t/g, '').replace(/\r/g, '');
	});
};

enum PropertyType {
	Array = 'Array',
	Maybe = 'Maybe'
}

type ArrayProperty = {
	type: PropertyType.Array;
	name: string;
	valuesType: string;
};

type MaybeProperty = {
	type: PropertyType.Maybe;
	name: string;
	valueType: string;
};

type FilePropertyType = MaybeProperty | ArrayProperty;

const arrayPropertiesMatch = (
	fileProp: ArrayProperty,
	fileEntityProp: string
): boolean => {
	return fileEntityProp === `${fileProp.name}: array(${fileProp.valuesType})`;
};

const maybePropertiesMatch = (
	fileProp: MaybeProperty,
	fileEntityProp: string
): boolean => {
	return (
		fileEntityProp === `${fileProp.name}: { value?: ${fileProp.valueType}}`
	);
};

const ARRAY_PROPERTY_REGEX = /^([\w\W]*): ([\w\W]*)\[]$/g;

const getFilePropertyType = (fileProperty: string): FilePropertyType => {
	//TODO
	return {
		type: PropertyType.Array,
		name: '',
		valuesType: ''
	};
};

const run = () => {
	const files = recursiveReadDir('../src/utils/models/entities', '.ts');
	const entitiesFiles = recursiveReadDir('../src/modules/cats', '.entity.ts');

	console.log('EntitiesFiles : ', JSON.stringify(entitiesFiles));

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
			throw new Error(`No entity file found for ${file}`);
		}
	});

	console.log('Tuples: ', filesTuples);

	filesTuples.forEach(([file, fileEntity]) => {
		const fileProperties: string[] = [];
		const fileEntityProperties: string[] = [];

		const fileName = getFileName(file, '.ts');
		const fileContent = fs.readFileSync(file).toString();

		const fileMatch = EXTRACT_OBJECT_DECODER_REGEX(fileName).exec(fileContent);

		if (fileMatch) {
			fileMatch.shift();
			const [extract] = fileMatch;
			fileProperties.push(...removeEscapedCharacters(extract.split(',\n')));
		} else {
			throw new Error(`Cannot find ${fileName} type in ${file} file`);
		}

		const fileEntityName = getFileName(fileEntity, '.entity.ts');
		const fileEntityContent = fs.readFileSync(fileEntity).toString();

		const fileEntityMatch =
			EXTRACT_CLASS_CONSTRUCTOR_REGEX.exec(fileEntityContent);

		if (fileEntityMatch) {
			fileEntityMatch.shift();
			const [extract] = fileEntityMatch;
			fileEntityProperties.push(
				...removeEscapedCharacters(extract.split(',\n'))
			);
		} else {
			throw new Error(`Cannot find ${fileEntityName} type in ${file} file`);
		}

		if (fileProperties.length !== fileEntityProperties.length) {
			throw new Error(
				`${fileName} entity and type don't have the same amount of properties`
			);
		}

		fileProperties.forEach((fileProperty) => {
			const maybeMatchingFileEntityProperty = ArrayHelpers.find(
				fileEntityProperties,
				(fileEntityProperty) => {
					const filePropertyType = getFilePropertyType(fileProperty);

					//TODO check for match depending on property type
					return true;
				}
			);
		});
	});
};

run();
