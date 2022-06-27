import { SortingAlgorithm } from 'index';
export declare class SortChooseList {
    private readonly setSelectedAlgorithm;
    readonly domNode: HTMLDivElement;
    private readonly _sortAlgoritms;
    constructor(setSelectedAlgorithm: (alg: SortingAlgorithm) => void);
    resetSelectedDomDataset(): void;
    private setupDomNode;
    private appendSelectButtons;
}
//# sourceMappingURL=sort-choose-list.d.ts.map