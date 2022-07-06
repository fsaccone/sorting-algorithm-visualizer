import './css/sorting-visualizer.css';
import { ArrayValue } from './array-value';
import { USER_INPUT } from 'index';

type TQueueElement = 'check' | 'swap';

export class SortingVisualizer {
	public domNode = document.createElement('div');

	private _array: number[] = [];
	private _hasStartedSortVisualizing = false;
	private _animationQueue: [TQueueElement, number[]][] = [];
	private readonly _animateValueMillisecondsNeeded = 1e-5;
	private readonly _finishedSortingMillisecondsPerElement = 10;
	private readonly _finishedSortingMillisecondsBeforeAnimation = 1000;
	private readonly _finishedSortingMillisecondsAfterAnimationBeforeReset = 1000;

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

	public addToQueue(type: TQueueElement, ...indexes: number[]): void {
		this._animationQueue.push([type, indexes]);
	}

	public startAnimating(): void {
		this._hasStartedSortVisualizing = true;

		const loopQueue = setInterval(() => {
			const queueElement = this._animationQueue.shift();

			if (!queueElement) {
				return;
			}

			const type = queueElement[0];

			if (queueElement[1].length < 1) {
				return;
			}

			switch (type) {
				case 'swap':
					this.animationSwap(queueElement[1][0]!, queueElement[1][1]!);
					break;
				case 'check':
					this.animationCheck(...queueElement[1]);
					break;
				default:
			}

			if (this._animationQueue.length <= 0) {
				this.finishSorting();
				clearInterval(loopQueue);
			}
		}, ((1000 / this.arraySize) + this._animateValueMillisecondsNeeded));
	}

	public finishSorting(): void {
		if (!this._hasStartedSortVisualizing) {
			this.startAnimating();
			return;
		}

		USER_INPUT.blockStopStartButton();
		this._animationQueue = [];
		this._hasStartedSortVisualizing = false;
		setTimeout(() => {
			this.domNode.childNodes.forEach((mChildNode, i) => {
				setTimeout(() => {
					if (mChildNode instanceof HTMLElement) {
						this.playSound(
								Number(mChildNode.dataset['value']) || 0,
								this._finishedSortingMillisecondsPerElement * (this.arraySize / 10)
						);
						mChildNode.dataset['state'] = 'completed';
						setTimeout(() => {
							mChildNode.dataset['state'] = 'static';
						}, this._finishedSortingMillisecondsPerElement * (this.arraySize / 10));
					}

					if (i === this.domNode.childNodes.length - 1) {
						setTimeout(
								() => {
									this.resetArray();
									USER_INPUT.unblockInput();
								},
								this._finishedSortingMillisecondsAfterAnimationBeforeReset
									+ (this._finishedSortingMillisecondsPerElement * (this.arraySize / 10))
						);
					}
				}, this._finishedSortingMillisecondsPerElement * i);
			});
		}, this._finishedSortingMillisecondsBeforeAnimation);
	}

	public resetArray(): void {
		this.array = [];
		this._animationQueue = [];
		this._hasStartedSortVisualizing = false;

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

	private animationSwap(indexOne: number, indexTwo: number): void {
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
			childOne.dataset['state'] = 'swapping';
			childTwo.dataset['state'] = 'swapping';
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
			}, this._animateValueMillisecondsNeeded / 2);
			setTimeout(() => {
				childOne.dataset['state'] = 'static';
				childTwo.dataset['state'] = 'static';
			}, this._animateValueMillisecondsNeeded);
			this.playSound(Number(childOne.dataset['value']) || 0, this._animateValueMillisecondsNeeded * 1.5);
			this.playSound(Number(childTwo.dataset['value']) || 0, this._animateValueMillisecondsNeeded * 1.5);
		}
	}

	private animationCheck(...indexes: number[]): void {
		for (let i = 0; i < indexes.length; i++) {
			const index = indexes[i]!;
			const child = this.domNode.children.item(index)!;

			if (child instanceof HTMLDivElement) {
				child.dataset['state'] = 'checking';
				setTimeout(() => {
					child.dataset['state'] = 'static';
				}, this._animateValueMillisecondsNeeded);
				this.playSound((Number(child.dataset['value']) || 0) * 2, this._animateValueMillisecondsNeeded * 1.5);
			}
		}
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
			const arrayValue = new ArrayValue(
					this.domNode,
					this._animateValueMillisecondsNeeded,
					this.arraySize,
					value
			);

			this.domNode.append(arrayValue.domNode);
		}
	}

	private playSound(value: number, durationMs: number): void {
		const audioCtx = new AudioContext();
		const frequencyValueMultiplier = 700;
		const frequency = Math.floor((value / this.arraySize) * frequencyValueMultiplier);
		const volume = 5e-3;
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
