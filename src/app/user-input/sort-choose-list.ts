import { SortingAlgorithm } from 'index';

export class SortChooseList {
  public readonly domNode = document.createElement('div');

  private readonly _sortAlgoritms = {
    bubble: SortingAlgorithm.BUBBLE,
    insertion: SortingAlgorithm.INSERTION
  };

  public constructor(
    private readonly setSelectedAlgorithm: (alg: SortingAlgorithm) => void
  ) {
    this.setupDomNode();
  }

  public resetSelectedDomDataset(): void {
    this.domNode.childNodes.forEach(mChildNode => {
      if (!(mChildNode instanceof HTMLButtonElement)) {
        return;
      }

      mChildNode.dataset['selected'] = 'false';
    });
  }

  private setupDomNode(): void {
    this.domNode.classList.add('sort-choose-list');
    this.resetSelectedDomDataset();
    this.appendSelectButtons();
  }

  private appendSelectButtons(): void {
    for (const [algName, alg] of Object.entries(this._sortAlgoritms)) {
      const domNode = document.createElement('button');

      domNode.innerText = algName.toUpperCase();

      domNode.onclick = () => {
        this.setSelectedAlgorithm(alg);
        this.resetSelectedDomDataset();
        domNode.dataset['selected'] = 'true';
      };

      this.domNode.append(domNode);
    }
  }
}
