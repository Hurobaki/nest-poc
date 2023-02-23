export class CatEntity {
	constructor(
		id: string,
		name: string,
		age: number,
		lastVaccinationTimestamp: { value?: number[] },
		siblings: string[]
	) {
		this.id = id;
		this.name = name;
		this.age = age;
		this.lastVaccinationTimestamp = lastVaccinationTimestamp;
		this.siblings = siblings;
	}

	/**
	 * The id of the cat
	 */
	public id: string;

	/**
	 * The name of the cat
	 */
	public name: string;

	/**
	 * The age of the cat
	 */
	public age: number;

	/**
	 * The lastVaccinationTimestamp of the cat
	 */
	public lastVaccinationTimestamp: { value?: number[] };

	/**
	 * An array of the names of the cat's siblings
	 */
	public siblings: string[];
}
