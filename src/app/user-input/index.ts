import './css/user-input.css';
import { SetArraySizeRange } from './set-array-size-range';
import { SortChooseListButton } from './sort-choose-list-button';
import { SortStartButton } from './sort-start-button';
import type { SortingAlgorithm } from 'index';

type TNullableAlgorithm = SortingAlgorithm | null;

export class UserInput {
	public domNode = document.createElement('div');
	public children = {
		'set-array-size-range': new SetArraySizeRange(),
		'sort-choose-list': new SortChooseListButton(alg => {
			this.setSelectedAlgorithm(alg);
		}, this.domNode),
		'sort-start-button': new SortStartButton(
				() => this.getSelectedAlgorithm(),
				() => {
					this.blockInput();
				},
				() => {
					this.unblockInput();
				}
		)
	};

	public setArraySizeRange = this.children['set-array-size-range'];
	public selectedAlgorithm: TNullableAlgorithm = null;

	public constructor() {
		this.setupDomNode();
	}

	public blockStopStartButton(): void {
		this.children['sort-start-button'].domNode.dataset['blocked'] = 'true';
	}

	public blockInput(): void {
		for (const [childName, child] of Object.entries(this.children)) {
			if (childName === 'sort-start-button') {
				continue;
			}

			child.domNode.dataset['blocked'] = 'true';
		}

		this.children['sort-start-button'].setAction('stop');
		this.children['sort-choose-list'].hideSortList();
	}

	public unblockInput(): void {
		for (const [childName, child] of Object.entries(this.children)) {
			child.domNode.dataset['blocked'] = 'false';
		}

		this.selectedAlgorithm = null;
		this.children['sort-start-button'].setAction('start');
		this.children['sort-choose-list'].resetSelectedDomDataset();
	}

	private setupDomNode(): void {
		this.domNode.classList.add('user-input');

		for (let i = 0; i < Object.values(this.children).length; i++) {
			const child = Object.values(this.children)[i]!;

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
