import './css/sorting-visualizer.css';
import { ArrayValue } from './array-value';
import { USER_INPUT } from 'index';

export class SortingVisualizer {
  public domNode = document.createElement('div');

  private _array: number[] = [];
  private _hasStartedSorting = false;
  private _swapQueue: [number, number][] = [];
  private readonly _swapMillisecondsNeeded = 100;
  private readonly _finishedSortingDelayMilliseconds = 1000;

  public get array(): number[] {
    return this._array;
  }

  public set array(array: number[]) {
    this._array = array;
    this.onArrayUpdate(this.array);
  }

  public constructor(
      public arraySize: number
  ) {
    this.setupDomNode();
    this.resetArray();
  }

  public addSwapArrayValuesToQueue(indexOne: number, indexTwo: number): void {
    this._swapQueue.push([indexOne, indexTwo]);
  }

  public startSwapping(): void {
    this._hasStartedSorting = true;

    const loopSwapQueue = setInterval(() => {
      const swap = this._swapQueue.shift();

      if (!swap) {
        return;
      }

      const [indexOne, indexTwo] = swap;

      [
        this._array[indexOne], this._array[indexTwo]
      ] = [
        this._array[indexTwo]!, this._array[indexOne]!
      ];

      const childOne = this.domNode.children.item(indexOne)!;
      const childTwo = this.domNode.children.item(indexTwo)!;

      if (
        childTwo instanceof HTMLDivElement
        && childOne instanceof HTMLDivElement
      ) {
        childOne.dataset['state'] = 'processing';
        childTwo.dataset['state'] = 'processing';
        setTimeout(() => {
          const childOnePreviousSibling = childOne.previousSibling;

          childTwo.insertAdjacentElement('beforebegin', childOne);

          if (indexOne === 0) {
            this.domNode.insertBefore(childTwo, this.domNode.firstChild);
          } else {
            childOnePreviousSibling?.after(childTwo);
          }
        }, this._swapMillisecondsNeeded / 2);
        setTimeout(() => {
          childOne.dataset['state'] = 'static';
          childTwo.dataset['state'] = 'static';
        }, this._swapMillisecondsNeeded / 2);
      }

      this.playSound(this._array[indexOne] ?? 0);

      if (this._swapQueue.length <= 0) {
        this.finishSorting();
        clearInterval(loopSwapQueue);
      }
    }, ((1000 / this.arraySize) + this._swapMillisecondsNeeded));
  }

  public finishSorting(): void {
    if (!this._hasStartedSorting) {
      this.startSwapping();
      return;
    }

    setTimeout(() => {
      this._swapQueue = [];
      this._hasStartedSorting = false;
      USER_INPUT.unblockResetArray();
    }, this._finishedSortingDelayMilliseconds
      + ((1000 / this.arraySize) * this.domNode.childNodes.length));
    setTimeout(() => {
      this.domNode.childNodes.forEach((mChildNode, i) => {
        setTimeout(() => {
          if (mChildNode instanceof HTMLElement) {
            this.playSound(Number(mChildNode.dataset['value']));
            mChildNode.dataset['state'] = 'completed';
          }
        }, (1000 / this.arraySize) * i);
      });
    }, this._finishedSortingDelayMilliseconds);
  }

  public resetArray(): void {
    this.array = [];
    USER_INPUT.unblockInput();

    for (let i = 0; i < this.arraySize; i++) {
      const randomNumber = Math.floor((Math.random() * this.arraySize) + 1);

      if (this.array.includes(randomNumber)) {
        i--;
        continue;
      }

      this.array.push(randomNumber);
    }

    this.onArrayUpdate(this.array);
  }

  private setupDomNode(): void {
    this.domNode.classList.add('sorting-visualizer');
  }

  private onArrayUpdate(array: number[]): void {
    this.createArrayValues();
  }

  private createArrayValues(): void {
    requestAnimationFrame(() => {
      this.domNode.innerText = '';

      for (const value of this.array) {
        const arrayValue = new ArrayValue(this.domNode, this.arraySize, value);

        this.domNode.append(arrayValue.domNode);
      }
    });
  }

  private playSound(value: number): void {
    const audioCtx = new AudioContext();
    const frequency = Math.floor(value / this.arraySize * 275);
    const volume = 3e-2;
    const durationMs = 50;
    const oscillator = new OscillatorNode(audioCtx);
    const gainNode = new GainNode(audioCtx);

    oscillator.type = 'square';
    oscillator.frequency.value = frequency;
    gainNode.gain.value = volume;
    oscillator
        .connect(gainNode)
        .connect(audioCtx.destination);
    oscillator.start();
    setTimeout(() => {
      oscillator.stop();
    }, durationMs);
  }
}
