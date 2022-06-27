import { Bubble, Insertion } from 'logic';
import { SORTING_VISUALIZER, SortingAlgorithm } from 'index';
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

    if (alg === SortingAlgorithm.BUBBLE) {
      const bubble = new Bubble(...sortAlgArgs);

      bubble.run();
      this.blockInput();
    }

    if (alg === SortingAlgorithm.INSERTION) {
      const insertion = new Insertion(...sortAlgArgs);

      insertion.run();
      this.blockInput();
    }
  }
}
