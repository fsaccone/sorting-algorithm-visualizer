import { SortingAlgorithm, type TArray, type TFinish, type TSwap } from 'logic/sorting-algorithm';
export declare class Insertion extends SortingAlgorithm {
    protected readonly array: TArray;
    protected readonly swap: TSwap;
    protected readonly finish: TFinish;
    constructor(array: TArray, swap: TSwap, finish: TFinish);
    run(): number[];
}
//# sourceMappingURL=insertion.d.ts.map