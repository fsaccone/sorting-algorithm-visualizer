import { SortingAlgorithm } from 'index';
export declare class SortChooseList {
    private readonly setSelectedAlgorithm;
    readonly domNode: HTMLDivElement;
    private readonly _sortAlgoritms;
    constructor(setSelectedAlgorithm: (alg: SortingAlgorithm) => void);
    private setupDomNode;
    private appendSelectButtons;
    private resetSelectedDomDataset;
}
//# sourceMappingURL=sort-choose-list.d.ts.map