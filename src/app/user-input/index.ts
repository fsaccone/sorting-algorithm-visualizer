import './css/user-input.css';
import { SetArraySizeRange } from './set-array-size-range';
import { SortChooseList } from './sort-choose-list';
import { SortStartButton } from './sort-start-button';
import type { SortingAlgorithm } from 'index';

type TNullableAlgorithm = SortingAlgorithm | null;

export class UserInput {
  public domNode = document.createElement('div');
  public children = {
    'set-array-size-range': new SetArraySizeRange(),
    'sort-start-button': new SortStartButton(
        () => this.getSelectedAlgorithm(),
        () => {
          this.blockInput();
        }
    ),
    'sort-choose-list': new SortChooseList(alg => {
      this.setSelectedAlgorithm(alg);
    })
  };

  public setArraySizeRange = this.children['set-array-size-range'];
  public selectedAlgorithm: TNullableAlgorithm = null;

  public constructor() {
    this.setupDomNode();
  }

  public blockInput(): void {
    this.domNode.style.pointerEvents = 'none';
    this.children['set-array-size-range'].domNode.style.pointerEvents = 'auto';
    this.domNode.dataset['blocked'] = 'true';
  }

  public unblockInput(): void {
    this.domNode.style.pointerEvents = 'auto';
    this.domNode.dataset['blocked'] = 'false';
  }

  private setupDomNode(): void {
    this.domNode.classList.add('user-input');

    for (const child of Object.values(this.children)) {
      this.domNode.append(child.domNode);
    }
  }

  private getSelectedAlgorithm(): TNullableAlgorithm {
    return this.selectedAlgorithm;
  }

  private setSelectedAlgorithm(alg: SortingAlgorithm): void {
    this.selectedAlgorithm = alg;
  }
}
