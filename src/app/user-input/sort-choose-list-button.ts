import { SortingAlgorithm } from 'index';
import algImg from './img/algorithm.png';

export class SortChooseListButton {
  public readonly domNode = document.createElement('button');
  public readonly buttonAlgorithmNodes: HTMLButtonElement[] = [];
  public readonly selectAlgListDomNode = document.createElement('div');

  private readonly _sortAlgoritms = {
    quick: SortingAlgorithm.QUICK,
    bubble: SortingAlgorithm.BUBBLE,
    insertion: SortingAlgorithm.INSERTION,
    selection: SortingAlgorithm.SELECTION
  };

  public constructor(
    private readonly setSelectedAlgorithm: (alg: SortingAlgorithm) => void,
    private readonly userInputDomNode: HTMLDivElement
  ) {
    this.setupDomNode();
  }

  public resetSelectedDomDataset(): void {
    for (const buttonAlgorithmNode of this.buttonAlgorithmNodes) {
      if (!(buttonAlgorithmNode instanceof HTMLButtonElement)) {
        return;
      }

      buttonAlgorithmNode.dataset['selected'] = 'false';
    }
  }

  public hideSortList(): void {
    this.domNode.dataset['opened'] = 'false';
    this.showOrHideChildrenIfOpened('true');
  }

  private setupDomNode(): void {
    this.domNode.classList.add('sort-choose-list-button');
    this.resetSelectedDomDataset();
    this.appendSelectButtons();
    this.domNode.dataset['opened'] = 'false';

    const algImgDomNode = document.createElement('img');

    algImgDomNode.src = algImg;
    this.domNode.append(algImgDomNode);

    this.domNode.onclick = ev => {
      ev.stopPropagation();
      this.showOrHideChildrenIfOpened(this.domNode.dataset['opened']);
    };
  }

  private showOrHideChildrenIfOpened(currentlyOpened?: string): void {
    this.domNode.dataset['opened'] = currentlyOpened === 'true'
      ? 'false'
      : 'true';
    setTimeout(() => {
      this.selectAlgListDomNode.style.display
          = `${currentlyOpened === 'true' ? 'none' : 'flex'}`;
    }, currentlyOpened === 'true' ? 101 : 1);
    setTimeout(() => {
      this.selectAlgListDomNode.style.opacity
          = currentlyOpened === 'true' ? '0' : '1';
    }, currentlyOpened === 'true' ? 1 : 101);
  }

  private appendSelectButtons(): void {
    this.selectAlgListDomNode.classList.add('select-alg-list');
    [
      this.selectAlgListDomNode.style.display,
      this.selectAlgListDomNode.style.opacity
    ] = [
      'none',
      '0'
    ];

    for (const [algName, alg] of Object.entries(this._sortAlgoritms)) {
      const domNode = document.createElement('button');

      domNode.innerText = algName.toUpperCase();

      domNode.onclick = ev => {
        ev.stopPropagation();
        this.setSelectedAlgorithm(alg);
        this.resetSelectedDomDataset();
        domNode.dataset['selected'] = 'true';
      };

      this.buttonAlgorithmNodes.push(domNode);
      this.selectAlgListDomNode.append(domNode);
    }

    this.userInputDomNode.append(this.selectAlgListDomNode);
  }
}
