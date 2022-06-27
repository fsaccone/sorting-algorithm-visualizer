import { SortingAlgorithm } from 'index';
export declare class SortStartButton {
    private readonly getSelectedAlgorithm;
    private readonly blockInput;
    domNode: HTMLButtonElement;
    constructor(getSelectedAlgorithm: () => SortingAlgorithm | null, blockInput: () => void);
    private setupDomNode;
    private startAlgorithm;
}
//# sourceMappingURL=sort-start-button.d.ts.map