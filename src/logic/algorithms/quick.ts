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

  private partition(mArr: number[], idxOne: number, idxTwo: number): number {
    let [i, j] = [idxOne, idxTwo];
    const pivot = mArr[Math.floor((i + j) / 2)]!;

    while (i <= j) {
      while (mArr[i]! < pivot) {
        i++;
      }

      while (mArr[j]! > pivot) {
        j--;
      }

      if (i <= j) {
        this.swap(i, j);
        i++;
        j--;
      }
    }

    return i;
  }
}
