import { setModifierManager } from '@ember/modifier';
import EmberObject from '@ember/object';
import { assign } from '@ember/polyfills';
import Split from 'split.js';

export function createSplit(el, args) {
  let { children } = el;

  if (children.length > 1) {
    let isVertical = args.direction === 'vertical';
    el.style.display = 'flex';
    el.style['flex-direction'] = isVertical ? 'column': 'row';

    return Split(children, assign({}, {
      gutterSize: 7,
      elementStyle(dimension, size, gutterSize) {
        let amount = `calc(${size}% - ${gutterSize}px)`;
        let props = { 'flex-basis': amount };
        props[isVertical ? 'max-height' : 'max-width'] = amount
        return props;
      },
      gutterStyle(dimension, gutterSize) {
        return {
          'flex-basis': `${gutterSize}px`
        }
      }
    }, args))
  }

  return null;
}


class SplitModifierManager {
  constructor(owner) {
    this.owner = owner;
  }

  createModifier(factory, args) {
    return factory.create(args);
  }

  installModifier(instance, element, args) {
    let { positional, named } = args;
    instance.element = element;
    instance.didInsertElement(element, positional, named);
  }

  updateModifier(instance, args) {
    let { positional, named } = args;
    instance.didUpdate(instance.element, positional, named);
  }


  destroyModifier(instance) {
    instance.willDestroyElement();
  }
}

class SplitViewModifier extends EmberObject {
  didInsertElement(el, positional, args) {
    this.splitInstance = createSplit(el, args);
  }

  didUpdate(el, positional, args) {
    let { rerender } = args;
    if (this.rerender !== rerender) {
      if (this.splitInstance) {
        this.splitInstance.destroy();
        this.splitInstance = null;
      }

      this.splitInstance = createSplit(el, args);
      this.rerender = rerender;
    }
  }

  willDestroyElement() {
    if (this.splitInstance) {
      this.splitInstance.destroy();
      this.splitInstance = null;
    }
  }
}

export default setModifierManager(
  (owner) => new SplitModifierManager(owner), SplitViewModifier
);
