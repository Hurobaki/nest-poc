import { MaybeDecoder } from '../../../decoders/Maybe';
import { array, object, z } from 'zod';
import { Maybe } from 'ts-help';
import { number, string } from '../../../helpers/zodAliases';

const test = () => {
	const decodeResult = CatDecoder.safeParse('');

	if (decodeResult.success) {
		// Decoded type is not called a Maybe, but it is equivalent. We can type it as a Maybe to use it as is, if Maybe
		// changes in the future this equivalence won't be true anymore and TS will not accept this typing.
		const maybeTimestamp: Maybe<number[]> =
			decodeResult.data.lastVaccinationTimestamp;
	}
};

export type Cat = z.infer<typeof CatDecoder>;

export const CatDecoder = object({
	id: string,
	name: string,
	age: number,
	lastVaccinationTimestamp: MaybeDecoder(array(number)),
	siblings: array(string)
});
