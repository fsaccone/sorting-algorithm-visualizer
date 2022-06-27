export type TArray = number[];
export type TSwap = (i: number, j: number) => void;
export type TFinish = () => void;
export abstract class SortingAlgorithm {
  protected abstract readonly array: TArray;
  protected abstract readonly swap: TSwap;
  protected abstract readonly finish: TFinish;
  public abstract run(): number[];
}
