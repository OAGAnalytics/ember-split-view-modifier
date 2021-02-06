import Modifier, { ModifierArgs } from 'ember-modifier';
import { assign } from '@ember/polyfills';
import Split from 'split.js';

type SplitViewModifierArgs = ModifierArgs<Split.Options>;
type SplitInstance = Split.Instance;
type Dimension = 'width' | 'height';
type SplitOptions = Record<keyof Split.Options, Split.Options>;

export const createSplit = (el: HTMLElement, args: SplitOptions) => {
  const children = el.children;

  if (children.length <= 1) {
    return null;
  }

  const isVertical = args.direction === 'vertical';
  el.style.display = 'flex';
  el.style.flexDirection = isVertical ? 'column' : 'row';

  const elementStyle = (
    _dimension: Dimension,
    size: number,
    gutterSize: number
  ) => {
    const amount = `calc(${size}% - ${gutterSize}px)`;
    const props = {
      'flex-basis': amount,
      [isVertical ? 'max-height' : 'max-width']: amount,
    };

    return props;
  };

  const gutterStyle = (_dimension: Dimension, gutterSize: number) => {
    return {
      'flex-basis': `${gutterSize}px`,
    };
  };

  const defaultArgs = {
    gutterSize: 7,
    elementStyle,
    gutterStyle,
  };

  // @ts-expect-error Doesn't add HTMLCollection as a possible type for children
  return Split(children, assign({}, defaultArgs, args));
};

export default class SplitViewModifier extends Modifier<SplitViewModifierArgs> {
  splitInstance: SplitInstance | null = null;

  destroyInstance() {
    if (this.splitInstance) {
      this.splitInstance.destroy();
      this.splitInstance = null;
    }
  }

  didReceiveArguments() {
    this.splitInstance = createSplit(this.element as HTMLElement, this.args.named);
  }

  didUpdateArguments() {
    this.destroyInstance();
    this.splitInstance = createSplit(this.element as HTMLElement, this.args.named);
  }

  willDestroy() {
    this.destroyInstance();
  }
}
