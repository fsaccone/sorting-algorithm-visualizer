import { SortingAlgorithm } from 'logic/sorting-algorithm';

export class Bubble extends SortingAlgorithm {
  protected sort(): void {
    for (const k of this.array.keys()) {
      for (let i = 0; i < this.array.length - k - 1; i++) {
        if (this.array[i]! > this.array[i + 1]!) {
          this.swap(i, i + 1);
        }
      }
    }
  }
}
