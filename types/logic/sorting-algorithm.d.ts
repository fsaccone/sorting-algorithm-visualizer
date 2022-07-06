export declare abstract class SortingAlgorithm {
    protected array: number[];
    run(): number[];
    protected swap(indexOne: number, indexTwo: number): void;
    protected check(...indexes: number[]): void;
    protected finish(): void;
    protected abstract sort(): void;
}
//# sourceMappingURL=sorting-algorithm.d.ts.map