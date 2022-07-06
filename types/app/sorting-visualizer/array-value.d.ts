import './css/array-value.css';
export declare class ArrayValue {
    readonly domParentNode: HTMLDivElement;
    private readonly animateValueMillisecondsNeeded;
    private readonly maxValue;
    readonly value: number;
    readonly domNode: HTMLDivElement;
    constructor(domParentNode: HTMLDivElement, animateValueMillisecondsNeeded: number, maxValue: number, value: number);
    protected setupDomNode(): void;
    private getCurrentValue;
}
//# sourceMappingURL=array-value.d.ts.map