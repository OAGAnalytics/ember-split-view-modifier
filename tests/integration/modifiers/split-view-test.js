import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import SplitViewModifier from 'dummy/modifiers/split-view';

module('Integration | Modifiers | split-view', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('modifier:split-view', SplitViewModifier);
  });

  test('modifier adds gutter and sets styles correctly', async function(assert) {
    await render(hbs`
      <div {{split-view}} class='container'>
        <div class='child'></div>
        <div class='child'></div>
        <div class='child'></div>
      </div>
    `);

    assert.dom('.gutter').exists({ count: 2 });
    assert.dom('.child').exists({ count: 3 });
    assert.dom('.child').hasStyle({
      'flex-basis': 'calc(33.3333% - 3.5px)',
      'max-width': 'calc(33.3333% - 3.5px)'
    });

    assert.dom('.container').hasStyle({
      'display': 'flex',
      'flex-direction': 'row'
    });
  });

});
