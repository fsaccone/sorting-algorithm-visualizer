import { SORTING_VISUALIZER } from 'index';

export class SetArraySizeRange {
  public readonly domNode = document.createElement('input');
  public readonly minSize = 8;
  public readonly maxSize = 1000;

  public constructor() {
    this.setupDomNode();
  }

  private setupDomNode(): void {
    this.domNode.classList.add('set-array-size-range');
    this.domNode.type = 'range';
    this.domNode.min = String(this.minSize);
    this.domNode.max = String(this.maxSize);
    this.domNode.value = String(Math.floor(
        ((Math.random() * (this.maxSize - this.minSize)) + this.minSize)
    ));

    this.domNode.oninput = () => {
      SORTING_VISUALIZER.arraySize = this.domNode.valueAsNumber;
      SORTING_VISUALIZER.resetArray();
    };
  }
}
