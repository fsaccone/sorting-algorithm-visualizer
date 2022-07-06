import './css/user-input.css';
import { SetArraySizeRange } from './set-array-size-range';
import { SortChooseListButton } from './sort-choose-list-button';
import { SortStartButton } from './sort-start-button';
import type { SortingAlgorithm } from 'index';
declare type TNullableAlgorithm = SortingAlgorithm | null;
export declare class UserInput {
    domNode: HTMLDivElement;
    children: {
        'set-array-size-range': SetArraySizeRange;
        'sort-choose-list': SortChooseListButton;
        'sort-start-button': SortStartButton;
    };
    setArraySizeRange: SetArraySizeRange;
    selectedAlgorithm: TNullableAlgorithm;
    constructor();
    blockStopStartButton(): void;
    blockInput(): void;
    unblockInput(): void;
    private setupDomNode;
    private getSelectedAlgorithm;
    private setSelectedAlgorithm;
}
export {};
//# sourceMappingURL=index.d.ts.map