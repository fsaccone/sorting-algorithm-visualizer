import { SortingAlgorithm } from 'logic/sorting-algorithm';

export class Insertion extends SortingAlgorithm {
  protected sort(): void {
    for (const i of this.array.keys()) {
      if (!i) {
        continue;
      }

      for (let j = i; j > 0 && this.array[j - 1]! > this.array[j]!; j--) {
        this.swap(j, j - 1);
      }
    }
  }
}
