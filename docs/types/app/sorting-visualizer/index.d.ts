import './css/sorting-visualizer.css';
export declare class SortingVisualizer {
    arraySize: number;
    domNode: HTMLDivElement;
    private _array;
    private _hasStartedSorting;
    private _swapQueue;
    private readonly _swapMillisecondsNeeded;
    private readonly _finishedSortingDelayMilliseconds;
    get array(): number[];
    set array(array: number[]);
    constructor(arraySize: number);
    addSwapArrayValuesToQueue(indexOne: number, indexTwo: number): void;
    startSwapping(): void;
    finishSorting(): void;
    resetArray(): void;
    private setupDomNode;
    private onArrayUpdate;
    private createArrayValues;
    private playSound;
}
//# sourceMappingURL=index.d.ts.map