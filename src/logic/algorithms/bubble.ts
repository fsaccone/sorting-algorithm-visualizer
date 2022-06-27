import { SortingAlgorithm, type TArray, type TFinish, type TSwap } from 'logic/sorting-algorithm';

export class Bubble extends SortingAlgorithm {
  public constructor(
      protected readonly array: TArray,
      protected readonly swap: TSwap,
      protected readonly finish: TFinish
  ) {
    super();
  }

  public run(): number[] {
    for (const k of this.array.keys()) {
      for (let i = 0; i < this.array.length - k - 1; i++) {
        if (this.array[i]! > this.array[i + 1]!) {
          this.swap(i, i + 1);

          const firstValue = this.array[i]!;

          this.array[i] = this.array[i + 1]!;
          this.array[i + 1] = firstValue;
        }
      }
    }

    this.finish();
    return this.array;
  }
}
