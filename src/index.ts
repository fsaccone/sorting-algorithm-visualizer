import 'css/index.css';
import { SortingVisualizer } from 'app/sorting-visualizer';
import { UserInput } from 'app/user-input';

export enum SortingAlgorithm {
  QUICK,
  BUBBLE,
  INSERTION,
  SELECTION
}
export const USER_INPUT = new UserInput();
export const SORTING_VISUALIZER = new SortingVisualizer(
    Math.floor(USER_INPUT.setArraySizeRange.domNode.valueAsNumber)
);

document.body.append(USER_INPUT.domNode, SORTING_VISUALIZER.domNode);
