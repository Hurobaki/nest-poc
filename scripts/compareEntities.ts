import * as fs from 'fs';

const REGX = /constructor\(([^)]*)\)/g;

const run = () => {
	fs.readFile('../src/cats/entities/cat.entity.ts', 'utf8', (err, data) => {
		if (err) {
			console.log('Error reading file : ', err);
			return;
		}

		const match = REGX.exec(data);
		REGX.lastIndex = 0;

		if (match) {
			console.log(JSON.stringify(match));

			match.shift();

			const [extract] = match;

			console.log('extract : ', extract);
		} else {
			console.log('No match');
		}
	});
};

run();
