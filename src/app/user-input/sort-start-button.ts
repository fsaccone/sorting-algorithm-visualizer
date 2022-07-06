import { Bubble, Heap, Insertion, OptimizedBubble, Quick, SelectionAlg } from 'logic';
import { SORTING_VISUALIZER, SortingAlgorithm } from 'index';
import type { SortingAlgorithm as SortAlgorithmType } from 'logic/sorting-algorithm';
import startSvg from './img/start.svg';
import stopSvg from './img/stop.svg';

export class SortStartButton {
	public domNode = document.createElement('button');

	private readonly _startSvgDomNode = document.createElement('img');
	private readonly _stopSvgDomNode = document.createElement('img');

	public constructor(
			private readonly getSelectedAlgorithm: () => SortingAlgorithm | null,
			private readonly blockInput: () => void,
			private readonly unblockInput: () => void
	) {
		[this._startSvgDomNode.src, this._stopSvgDomNode.src] = [startSvg, stopSvg];
		this._startSvgDomNode.draggable = this._stopSvgDomNode.draggable = false;
		this.setupDomNode();
	}

	public setAction(action: 'start' | 'stop'): void {
		this.domNode.dataset['action'] = action;
		this.domNode.innerText = '';

		if (action === 'start') {
			this.domNode.append(this._startSvgDomNode);
		} else {
			this.domNode.append(this._stopSvgDomNode);
		}
	}

	private setupDomNode(): void {
		this.domNode.classList.add('sort-start-button');
		this.setAction('start');

		this.domNode.onclick = () => {
			if (this.domNode.dataset['action'] === 'stop') {
				SORTING_VISUALIZER.resetArray();
				this.unblockInput();
			} else {
				this.startAlgorithm(this.getSelectedAlgorithm());
			}
		};
	}

	private startAlgorithm(alg: SortingAlgorithm | null): void {
		let algorithm: SortAlgorithmType | null = null;

		switch (alg) {
			case SortingAlgorithm.QUICK:
				algorithm = new Quick();
				break;
			case SortingAlgorithm.HEAP:
				algorithm = new Heap();
				break;
			case SortingAlgorithm.BUBBLE:
				algorithm = new Bubble();
				break;
			case SortingAlgorithm.OPTIMIZED_BUBBLE:
				algorithm = new OptimizedBubble();
				break;
			case SortingAlgorithm.INSERTION:
				algorithm = new Insertion();
				break;
			case SortingAlgorithm.SELECTION:
				algorithm = new SelectionAlg();
				break;
			default:
		}

		let result: number[] | null = null;

		if (algorithm) {
			result = algorithm.run();
		}

		if (result) {
			this.blockInput();
		}
	}
}
