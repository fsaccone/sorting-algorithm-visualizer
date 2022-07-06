import { SortingAlgorithm } from 'index';
export declare class SortStartButton {
    private readonly getSelectedAlgorithm;
    private readonly blockInput;
    private readonly unblockInput;
    domNode: HTMLButtonElement;
    private readonly _startSvgDomNode;
    private readonly _stopSvgDomNode;
    constructor(getSelectedAlgorithm: () => SortingAlgorithm | null, blockInput: () => void, unblockInput: () => void);
    setAction(action: 'start' | 'stop'): void;
    private setupDomNode;
    private startAlgorithm;
}
//# sourceMappingURL=sort-start-button.d.ts.map