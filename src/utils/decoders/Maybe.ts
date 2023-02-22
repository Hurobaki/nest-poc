import { discriminatedUnion, literal, object, ZodTypeAny } from 'zod';

export const MaybeDecoder = <T extends ZodTypeAny>(valueDecoder: T) => {
	return discriminatedUnion('isSome', [
		object({
			isSome: literal(true),
			value: valueDecoder
		}),
		object({ isSome: literal(false) })
	]);
};
