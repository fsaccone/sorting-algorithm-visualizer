import './css/array-value.css';

export class ArrayValue {
	public readonly domNode = document.createElement('div');

	public constructor(
			public readonly domParentNode: HTMLDivElement,
			private readonly animateValueMillisecondsNeeded: number,
			private readonly maxValue: number,
			public readonly value: number
	) {
		this.setupDomNode();
	}

	protected setupDomNode(): void {
		this.domNode.classList.add('array-value');
		this.domNode.dataset['state'] = 'static';
		this.domNode.dataset['value'] = String(this.value);
		this.domNode.style.height = this.domNode.style.width
			= `${100 * this.value / this.maxValue}%`;
		this.domNode.style.transition = `background linear ${
			(this.animateValueMillisecondsNeeded * 10) / this.maxValue
		}ms`;
	}

	private getCurrentValue(): number {
		return Number(this.domNode.dataset['value']);
	}
}
