import { SortingAlgorithm, type TArray, type TFinish, type TSwap } from 'logic/sorting-algorithm';
export declare class Quick extends SortingAlgorithm {
    protected readonly array: TArray;
    protected readonly swap: TSwap;
    protected readonly finish: TFinish;
    constructor(array: TArray, swap: TSwap, finish: TFinish);
    run(): number[];
    private quickSort;
    private partition;
}
//# sourceMappingURL=quick.d.ts.map