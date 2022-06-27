import { SortingAlgorithm, type TArray, type TFinish, type TSwap } from 'logic/sorting-algorithm';

export class Insertion extends SortingAlgorithm {
  public constructor(
      protected readonly array: TArray,
      protected readonly swap: TSwap,
      protected readonly finish: TFinish
  ) {
    super();
  }

  public run(): number[] {
    for (const i of this.array.keys()) {
      if (!i) {
        continue;
      }

      for (let j = i; j > 0 && this.array[j - 1]! > this.array[j]!; j--) {
        this.swap(j, j - 1);

        const firstValue = this.array[j]!;

        this.array[j] = this.array[j - 1]!;
        this.array[j - 1] = firstValue;
      }
    }

    this.finish();
    return this.array;
  }
}
