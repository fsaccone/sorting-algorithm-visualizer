import { SortingAlgorithm } from 'logic/sorting-algorithm';

export class Insertion extends SortingAlgorithm {
	protected sort(): void {
		for (let i = 0; i < this.array.length; i++) {
			if (!i) {
				continue;
			}

			for (let j = i; j > 0; j--) {
				if (this.array[j - 1]! > this.array[j]!) {
					this.swap(j, j - 1);
				} else {
					this.check(j, j - 1);
				}
			}
		}
	}
}
