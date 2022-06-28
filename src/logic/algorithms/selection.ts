import { SortingAlgorithm } from 'logic/sorting-algorithm';

export class SelectionAlg extends SortingAlgorithm {
  protected sort(): void {
    for (let i = 0; i < this.array.length; i++) {
      let minIdx = i;

      for (let j = i; j < this.array.length; j++) {
        if (this.array[j]! < this.array[minIdx]!) {
          minIdx = j;
        }
      }

      if (minIdx !== i) {
        this.swap(i, minIdx);
      }
    }
  }
}
