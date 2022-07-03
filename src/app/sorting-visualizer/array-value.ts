import './css/array-value.css';

export class ArrayValue {
	public readonly domNode = document.createElement('div');

	public constructor(
			public readonly domParentNode: HTMLDivElement,
			private readonly maxSize: number,
			public readonly value: number
	) {
		this.setupDomNode();
	}

	protected setupDomNode(): void {
		this.domNode.classList.add('array-value');
		this.domNode.dataset['state'] = 'static';
		this.domNode.dataset['value'] = String(this.value);
		this.domNode.style.height = this.domNode.style.width
			= `${100 * this.value / this.maxSize}%`;

		const transitionDurations = {
			height: 2100 / this.maxSize,
			background: 500 / this.maxSize
		};

		this.domNode.style.transition
			= `height ease-in-out ${transitionDurations.height}ms,`
				+ `background linear ${transitionDurations.background}ms`;
	}

	private getCurrentValue(): number {
		return Number(this.domNode.dataset['value']);
	}
}
