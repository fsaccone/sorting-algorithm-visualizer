import './css/user-input.css';
import { SetArraySizeRange } from './set-array-size-range';
import { SortChooseList } from './sort-choose-list';
import { SortStartButton } from './sort-start-button';
import type { SortingAlgorithm } from 'index';
declare type TNullableAlgorithm = SortingAlgorithm | null;
export declare class UserInput {
    domNode: HTMLDivElement;
    children: {
        'set-array-size-range': SetArraySizeRange;
        'sort-start-button': SortStartButton;
        'sort-choose-list': SortChooseList;
    };
    setArraySizeRange: SetArraySizeRange;
    selectedAlgorithm: TNullableAlgorithm;
    constructor();
    blockInput(): void;
    unblockInput(): void;
    private setupDomNode;
    private getSelectedAlgorithm;
    private setSelectedAlgorithm;
}
export {};
//# sourceMappingURL=index.d.ts.map