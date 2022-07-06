import { SortingAlgorithm } from 'logic/sorting-algorithm';

export class Quick extends SortingAlgorithm {
	protected sort(): void {
		this.quickSort(this.array, 0, this.array.length - 1);
	}

	private quickSort(arr: number[], start: number, end: number): number[] {
		if (start === end) {
			return arr;
		}

		const i = this.partition(arr, start, end);

		if (start < i - 1) {
			this.quickSort(arr, start, i - 1);
		}

		if (i < end) {
			this.quickSort(arr, i, end);
		}

		return arr;
	}

	private partition(arr: number[], idxOne: number, idxTwo: number): number {
		let [i, j] = [idxOne, idxTwo];
		const iPivot = Math.floor((i + j) / 2);
		const pivot = arr[iPivot]!;

		this.check(iPivot);

		while (i <= j) {
			while (arr[i]! < pivot) {
				i++;
			}

			while (arr[j]! > pivot) {
				j--;
			}

			if (i <= j) {
				this.swap(i, j);
				i++;
				j--;
			} else {
				this.check(i, j);
			}
		}

		return i;
	}
}
