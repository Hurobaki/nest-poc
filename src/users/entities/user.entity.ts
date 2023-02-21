import { Company } from '../../utils/models/Company';

export class User {
	constructor(
		id: string,
		name: string,
		age: number,
		company: Company,
		email: string,
		registered: Date
	) {
		this.id = id;
		this.name = name;
		this.age = age;
		this.company = company;
		this.email = email;
		this.registered = registered;
	}

	/**
	 * The id of the user
	 */
	public id: string;

	/**
	 * The name of the user
	 * @example Steve
	 */
	public name: string;

	/**
	 * The age of the user
	 */
	public age?: number;

	/**
	 * The company of the user
	 */
	company: Company;

	/**
	 * The email of the user
	 */
	public email: string;

	/**
	 * The registered date of the user
	 */
	public registered: Date;
}
