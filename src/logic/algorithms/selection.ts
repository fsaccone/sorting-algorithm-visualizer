import { SortingAlgorithm, type TArray, type TFinish, type TSwap } from 'logic/sorting-algorithm';

export class SelectionAlg extends SortingAlgorithm {
  public constructor(
      protected readonly array: TArray,
      protected readonly swap: TSwap,
      protected readonly finish: TFinish
  ) {
    super();
  }

  public run(): number[] {
    for (let i = 0; i < this.array.length; i++) {
      let minIdx = i;

      for (let j = i; j < this.array.length; j++) {
        if (this.array[j]! < this.array[minIdx]!) {
          minIdx = j;
        }
      }

      if (minIdx !== i) {
        this.swap(i, minIdx);

        const firstValue = this.array[i]!;

        this.array[i] = this.array[minIdx]!;
        this.array[minIdx] = firstValue;
      }
    }

    this.finish();
    return this.array;
  }
}
