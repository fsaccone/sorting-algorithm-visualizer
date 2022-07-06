import { SORTING_VISUALIZER } from 'index';

export abstract class SortingAlgorithm {
	protected array = SORTING_VISUALIZER.array;

	public run(): number[] {
		this.sort();
		this.finish();
		return this.array;
	}

	protected swap(indexOne: number, indexTwo: number): void {
		if (
			this.array.length <= indexOne
			|| this.array.length <= indexTwo
			|| indexOne === indexTwo
		) {
			return;
		}

		[
			this.array[indexOne],
			this.array[indexTwo]
		] = [
			this.array[indexTwo]!,
			this.array[indexOne]!
		];
		SORTING_VISUALIZER.addToQueue('swap', indexOne, indexTwo);
	}

	protected check(...indexes: number[]): void {
		if (indexes.some(i => this.array.length <= i)) {
			return;
		}

		SORTING_VISUALIZER.addToQueue('check', ...indexes);
	}

	protected finish(): void {
		SORTING_VISUALIZER.finishSorting();
	}

  protected abstract sort(): void;
}
