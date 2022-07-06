import './css/sorting-visualizer.css';
declare type TQueueElement = 'check' | 'swap';
export declare class SortingVisualizer {
    arraySize: number;
    domNode: HTMLDivElement;
    private _array;
    private _hasStartedSortVisualizing;
    private _animationQueue;
    private readonly _animateValueMillisecondsNeeded;
    private readonly _finishedSortingMillisecondsPerElement;
    private readonly _finishedSortingMillisecondsBeforeAnimation;
    private readonly _finishedSortingMillisecondsAfterAnimationBeforeReset;
    get array(): number[];
    set array(array: number[]);
    constructor(arraySize: number);
    addToQueue(type: TQueueElement, ...indexes: number[]): void;
    startAnimating(): void;
    finishSorting(): void;
    resetArray(): void;
    private animationSwap;
    private animationCheck;
    private setupDomNode;
    private onArrayUpdate;
    private createArrayValues;
    private playSound;
}
export {};
//# sourceMappingURL=index.d.ts.map