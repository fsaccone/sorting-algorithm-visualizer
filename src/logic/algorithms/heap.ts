import { SortingAlgorithm } from 'logic/sorting-algorithm';

export class Heap extends SortingAlgorithm {
	protected sort(): void {
		let i = Math.floor((this.array.length / 2) - 1);
		let k = this.array.length - 1;

		while (i >= 0) {
			this.heapify(this.array.length, i);
			i--;
		}

		while (k >= 0) {
			this.swap(0, k);
			this.heapify(k, 0);
			k--;
		}
	}

	private heapify(size: number, i: number): void {
		let largest = i;
		const left = (2 * i) + 1;
		const right = left + 1;

		if (left < size && this.array[left]! > this.array[largest]!) {
			largest = left;
		} else {
			this.check(left, largest);
		}

		if (right < size && this.array[right]! > this.array[largest]!) {
			largest = right;
		} else {
			this.check(right, largest);
		}

		if (largest !== i) {
			this.swap(i, largest);
			this.heapify(size, largest);
		}
	}
}
