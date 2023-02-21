import { Maybe } from 'ts-help';

export type Cat = {
	id: string;
	name: string;
	age: number;
	lastVaccinationTimestamp: Maybe<number>;
};
