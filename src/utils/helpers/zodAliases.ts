import {
	string as stringZod,
	number as number_,
	boolean as boolean_
} from 'zod';

export const string = stringZod();
export const number = number_();
export const boolean = boolean_();
