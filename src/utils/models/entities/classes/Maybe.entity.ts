export class MaybeEntity<T> {
	constructor(value?: T) {
		this.value = value;
	}

	/**
	 * The optional value
	 */
	value?: T;
}
