import { SortingAlgorithm, type TArray, type TFinish, type TSwap } from 'logic/sorting-algorithm';

export class Quick extends SortingAlgorithm {
  public constructor(
      protected readonly array: TArray,
      protected readonly swap: TSwap,
      protected readonly finish: TFinish
  ) {
    super();
  }

  public run(): number[] {
    const sorted = this.quickSort(this.array, 0, this.array.length - 1);

    this.finish();
    return sorted;
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

  private partition(mArr: number[], idxOne: number, idxTwo: number): number {
    let [i, j] = [idxOne, idxTwo];
    const middleIdx = mArr[Math.floor((i + j) / 2)]!;

    while (i <= j) {
      while (mArr[i]! < middleIdx) {
        i++;
      }

      while (mArr[j]! > middleIdx) {
        j--;
      }

      if (i <= j) {
        this.swap(i, j);

        const firstValue = mArr[i]!;

        mArr[i] = mArr[j]!;
        mArr[j] = firstValue;
        i++;
        j--;
      }
    }

    return i;
  }
}
