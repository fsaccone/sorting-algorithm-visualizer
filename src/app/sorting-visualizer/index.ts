import './css/sorting-visualizer.css';
import { ArrayValue } from './array-value';
import { USER_INPUT } from 'index';

export class SortingVisualizer {
	public domNode = document.createElement('div');

	private _array: number[] = [];
	private _hasStartedSortVisualizing = false;
	private _swapQueue: [number, number][] = [];
	private readonly _swapMillisecondsNeeded = 100;
	private readonly _finishedSortingDelayMilliseconds = 1000;
	private readonly _finishAnimationFinishedIdleMilliseconds = 1000;

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
		this._hasStartedSortVisualizing = true;

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
					[
						childOne.style.width,
						childOne.style.height,
						childTwo.style.width,
						childTwo.style.height,
						childOne.dataset['value'],
						childTwo.dataset['value']
					] = [
						childTwo.style.width,
						childTwo.style.height,
						childOne.style.width,
						childOne.style.height,
						childTwo.dataset['value'],
						childOne.dataset['value']
					];
				}, this._swapMillisecondsNeeded / 2);
				setTimeout(() => {
					childOne.dataset['state'] = 'static';
					childTwo.dataset['state'] = 'static';
				}, this._swapMillisecondsNeeded);
			}

			this.playSound(
					((this._array[indexOne] ?? 0) + (this._array[indexTwo] ?? 0)) / 2
			);

			if (this._swapQueue.length <= 0) {
				this.finishSorting();
				clearInterval(loopSwapQueue);
			}
		}, ((1000 / this.arraySize) + this._swapMillisecondsNeeded));
	}

	public finishSorting(): void {
		if (!this._hasStartedSortVisualizing) {
			this.startSwapping();
			return;
		}

		this._swapQueue = [];
		this._hasStartedSortVisualizing = false;
		setTimeout(() => {
			this.domNode.childNodes.forEach((mChildNode, i) => {
				setTimeout(() => {
					if (mChildNode instanceof HTMLElement) {
						this.playSound(Number(mChildNode.dataset['value']));
						mChildNode.dataset['state'] = 'completed';
					}

					if (i === this.domNode.childNodes.length - 1) {
						setTimeout(() => {
							this.resetArray();
							USER_INPUT.unblockInput();
						}, this._finishAnimationFinishedIdleMilliseconds);
					}
				}, (1000 / this.arraySize) * i);
			});
		}, this._finishedSortingDelayMilliseconds);
	}

	public resetArray(): void {
		this.array = [];

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
		this.domNode.innerText = '';

		for (let i = 0; i < this.array.length; i++) {
			const value = this.array[i]!;
			const arrayValue = new ArrayValue(this.domNode, this.arraySize, value);

			this.domNode.append(arrayValue.domNode);
		}
	}

	private playSound(value: number): void {
		const audioCtx = new AudioContext();
		const frequency = Math.floor((value / this.arraySize) * 400);
		const volume = 1e-2;
		const durationMs = 50;
		const stoppingSoundDurationMs = durationMs / 10;
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
			const stoppingSound = setInterval(() => {
				gainNode.gain.value -= volume / 10;

				if (gainNode.gain.value <= 0) {
					oscillator.stop();
					clearInterval(stoppingSound);
				}
			}, stoppingSoundDurationMs / 10);
		}, durationMs - stoppingSoundDurationMs);
	}
}
