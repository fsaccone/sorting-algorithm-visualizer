import { SortingAlgorithm } from 'logic/sorting-algorithm';

export class Bubble extends SortingAlgorithm {
	protected sort(): void {
		let swapped = true;

		do {
			swapped = false;

			for (let i = 1; i < this.array.length; i++) {
				if (this.array[i - 1]! > this.array[i]!) {
					this.swap(i - 1, i);
					swapped = true;
				} else {
					this.check(i - 1, i);
				}
			}
		} while (swapped);
	}
}
