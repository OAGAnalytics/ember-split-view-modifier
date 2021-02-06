import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { TestContext as BaseTestContext } from 'ember-test-helpers';
import { set } from '@ember/object';
import { render, settled } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { SplitOptions } from 'ember-split-view-modifier/modifiers/split-view';

type SplitViewTestContext = BaseTestContext & SplitOptions;

module('Integration | Modifier | split-view', function (hooks) {
  setupRenderingTest(hooks);

  test('modifier adds gutter and sets styles correctly', async function (this: SplitViewTestContext, assert) {
    await render(hbs`
      <div {{split-view}} class='container'>
        <div class='child' />
        <div class='child' />
        <div class='child' />
      </div>
    `);

    assert.dom('.gutter').exists({ count: 2 });
    assert.dom('.child').exists({ count: 3 });
    assert.dom('.child').hasStyle({
      'flex-basis': 'calc(33.3333% - 3.5px)',
      'max-width': 'calc(33.3333% - 3.5px)',
    });

    assert.dom('.container').hasStyle({
      display: 'flex',
      'flex-direction': 'row',
    });
  });

  test('No gutter exists when the number of children is not greater than 1', async function (this: SplitViewTestContext, assert) {
    await render(hbs`
      <div {{split-view}} class='container'>
        <div class='child' />
      </div>
    `);

    assert.dom('.gutter').doesNotExist('Gutter does not exist when there arent at least two children.')
  });

  test('Passing the direction property with the value vertical splits up its children vertically', async function (this: SplitViewTestContext, assert) {
    set(this, "direction", "vertical");
    
    await render(hbs`
      <div {{split-view direction=this.direction}} class='container'>
        <div class='left' />
        <div class='right' />
      </div>
    `);

    assert.dom('.container').hasStyle({
      display: 'flex',
      'flex-direction': 'column',
    });
  });

  test('Split view modifier rerenders when arguments update', async function (this: SplitViewTestContext, assert) {
    set(this, "direction", "vertical");
    
    await render(hbs`
      <div {{split-view direction=this.direction}} class='container'>
        <div class='left' />
        <div class='right' />
      </div>
    `);

    set(this, "direction", "horizontal");

    await settled();

    assert.dom('.container').hasStyle({
      display: 'flex',
      'flex-direction': 'row',
    });
  });

  test('Passing in the sizes parameter splits up its children by their respective amount', async function (this: SplitViewTestContext, assert) {
    const leftSizePercentage = 25;
    const rightSizePercentage = 75;

    set(this, "sizes", [leftSizePercentage, rightSizePercentage])
    
    await render(hbs`
      <div {{split-view sizes=this.sizes}} class='container'>
        <div class='left' />
        <div class='right' />
      </div>
    `);

    assert.dom('.left').hasStyle({
      'flex-basis': `calc(${leftSizePercentage}% - 3.5px)`,
      'max-width': `calc(${leftSizePercentage}% - 3.5px)`,
    });

    assert.dom('.right').hasStyle({
      'flex-basis': `calc(${rightSizePercentage}% - 3.5px)`,
      'max-width': `calc(${rightSizePercentage}% - 3.5px)`,
    });
  });
});
