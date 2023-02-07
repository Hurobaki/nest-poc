interface GameSett {
	Speed: number;

	[key: string]: number;
}

const NUMBER_OF_SEC = 5_000;

const gameSett: GameSett = { Speed: 456 };

const testFn = (peitt: number): string => {
	const lamatest = gameSett['lama'];

	switch (peitt) {
		case 1:
			return '';
		default:
			break;
	}

	console.log('test');

	return '';
};

const littleFn = (): number => {
	return 0;
};
