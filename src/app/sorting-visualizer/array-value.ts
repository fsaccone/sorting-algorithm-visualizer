import './css/array-value.css';

type TArrayValueState = 'completed' | 'processing' | 'static';

export class ArrayValue {
  public readonly domNode = document.createElement('div');

  public constructor(
      public readonly domParentNode: HTMLDivElement,
      private readonly maxSize: number,
      public readonly value: number
  ) {
    this.setupDomNode();
  }

  private setupDomNode(): void {
    this.domNode.classList.add('array-value');
    this.domNode.dataset['state'] = 'static';
    this.domNode.dataset['value'] = String(this.value);
    this.domNode.style.height = this.domNode.style.width
        = `${100 * this.value / this.maxSize}%`;
  }
}
