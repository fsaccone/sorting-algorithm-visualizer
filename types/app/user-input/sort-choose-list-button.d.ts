import { SortingAlgorithm } from 'index';
export declare class SortChooseListButton {
    private readonly setSelectedAlgorithm;
    private readonly userInputDomNode;
    readonly domNode: HTMLButtonElement;
    readonly buttonAlgorithmNodes: HTMLButtonElement[];
    readonly selectAlgListDomNode: HTMLDivElement;
    private readonly _sortAlgoritms;
    constructor(setSelectedAlgorithm: (alg: SortingAlgorithm) => void, userInputDomNode: HTMLDivElement);
    resetSelectedDomDataset(): void;
    hideSortList(): void;
    private setupDomNode;
    private showOrHideChildrenIfOpened;
    private appendSelectButtons;
}
//# sourceMappingURL=sort-choose-list-button.d.ts.map