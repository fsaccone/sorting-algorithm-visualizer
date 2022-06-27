import { Bubble, Insertion, Quick, SelectionAlg } from 'logic';
import { SORTING_VISUALIZER, SortingAlgorithm } from 'index';
import type { SortingAlgorithm as SortAlgorithmType } from 'logic/sorting-algorithm';
import startSvg from './svg/start.svg';

export class SortStartButton {
  public domNode = document.createElement('button');

  public constructor(
      private readonly getSelectedAlgorithm: () => SortingAlgorithm | null,
      private readonly blockInput: () => void
  ) {
    this.setupDomNode();
  }

  private setupDomNode(): void {
    this.domNode.classList.add('sort-start-button');

    const startSvgDomNode = document.createElement('img');

    startSvgDomNode.src = startSvg;
    this.domNode.append(startSvgDomNode);

    this.domNode.onclick = () => {
      this.startAlgorithm(this.getSelectedAlgorithm());
    };
  }

  private startAlgorithm(alg: SortingAlgorithm | null): void {
    const sortAlgArgs = [
      SORTING_VISUALIZER.array,
      (i: number, j: number) => {
        SORTING_VISUALIZER.addSwapArrayValuesToQueue(i, j);
      },
      () => {
        SORTING_VISUALIZER.finishSorting();
      }
    ] as const;
    let algorithm: SortAlgorithmType | null = null;

    switch (alg) {
      case SortingAlgorithm.QUICK:
        algorithm = new Quick(...sortAlgArgs);
        break;
      case SortingAlgorithm.BUBBLE:
        algorithm = new Bubble(...sortAlgArgs);
        break;
      case SortingAlgorithm.INSERTION:
        algorithm = new Insertion(...sortAlgArgs);
        break;
      case SortingAlgorithm.SELECTION:
        algorithm = new SelectionAlg(...sortAlgArgs);
        break;
      default:
    }

    if (algorithm) {
      algorithm.run();
      this.blockInput();
    }
  }
}
