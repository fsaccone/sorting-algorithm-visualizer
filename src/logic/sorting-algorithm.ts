import { SORTING_VISUALIZER } from 'index';

export abstract class SortingAlgorithm {
	protected array = SORTING_VISUALIZER.array;

	public run(): number[] {
		this.sort();
		this.finish();
		return this.array;
	}

	protected swap(indexOne: number, indexTwo: number): void {
		if (this.array.length <= indexOne || this.array.length <= indexTwo) {
			return;
		}

		[
			this.array[indexOne],
			this.array[indexTwo]
		] = [
			this.array[indexTwo]!,
			this.array[indexOne]!
		];
		SORTING_VISUALIZER.addSwapArrayValuesToQueue(indexOne, indexTwo);
	}

	protected finish(): void {
		SORTING_VISUALIZER.finishSorting();
	}

  protected abstract sort(): void;
}
