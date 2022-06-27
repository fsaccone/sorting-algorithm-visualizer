export declare type TArray = number[];
export declare type TSwap = (i: number, j: number) => void;
export declare type TFinish = () => void;
export declare abstract class SortingAlgorithm {
    protected abstract readonly array: TArray;
    protected abstract readonly swap: TSwap;
    protected abstract readonly finish: TFinish;
    abstract run(): number[];
}
//# sourceMappingURL=sorting-algorithm.d.ts.map