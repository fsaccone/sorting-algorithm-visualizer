import { SortingAlgorithm } from 'logic/sorting-algorithm';

export class Bubble extends SortingAlgorithm {
	protected sort(): void {
		for (let i = 0; i < this.array.length; i++) {
			for (let j = 0; j < this.array.length - i - 1; j++) {
				if (this.array[j]! > this.array[j + 1]!) {
					this.swap(j, j + 1);
				}
			}
		}
	}
}
