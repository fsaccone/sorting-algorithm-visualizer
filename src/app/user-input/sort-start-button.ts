import { Bubble, Insertion, Quick, SelectionAlg } from 'logic';
import type { SortingAlgorithm as SortAlgorithmType } from 'logic/sorting-algorithm';
import { SortingAlgorithm } from 'index';
import startSvg from './img/start.svg';

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
		let algorithm: SortAlgorithmType | null = null;

		switch (alg) {
			case SortingAlgorithm.QUICK:
				algorithm = new Quick();
				break;
			case SortingAlgorithm.BUBBLE:
				algorithm = new Bubble();
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
