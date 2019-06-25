ember-split-view-modifier [![Ember Observer Score](http://emberobserver.com/badges/ember-split-view-modifier.svg)](http://emberobserver.com/addons/ember-split-view-modifier) [![npm version](https://badge.fury.io/js/ember-split-view-modifier.svg)](https://badge.fury.io/js/ember-split-view-modifier) [![travis status](https://travis-ci.org/OAGAnalytics/ember-split-view-modifier.svg)](https://travis-ci.org/OAGAnalytics/ember-split-view-modifier.svg)
==============================================================================
Ember element modifier `{{split-view}}` that turns all child elements into resizeable split views. It uses [Split.js](https://split.js.org/) under the hood. [DEMO](http://ember-split-view-modifier.surge.sh/)


Installation
------------------------------------------------------------------------------

```
ember install ember-split-view-modifier
```


Usage
------------------------------------------------------------------------------

```hbs

<div {{split-view sizes=(array 25 25 50)}} class="your-container-class">
  <div></div>
  <div></div>
  <div></div>
</div>

```


## Configuration

The modifier accepts the following options:

| Options        | Type            | Default        | Description                                              |
| -------------- | --------------- | -------------- | -------------------------------------------------------- |
| `sizes`        | Array           |                | Initial sizes of each element in percents or CSS values. |
| `minSize`      | Number or Array | `100`          | Minimum size of each element.                            |
| `expandToMin`  | Boolean         | `false`        | Grow initial sizes to `minSize`                          |
| `gutterSize`   | Number          | `10`           | Gutter size in pixels.                                   |
| `gutterAlign`  | String          | `'center'`     | Gutter alignment between elements.                       |
| `snapOffset`   | Number          | `30`           | Snap to minimum size offset in pixels.                   |
| `dragInterval` | Number          | `1`            | Number of pixels to drag.                                |
| `direction`    | String          | `'horizontal'` | Direction to split: horizontal or vertical.              |
| `cursor`       | String          | `'col-resize'` | Cursor to display while dragging.                        |
| `gutter`       | Function        |                | Called to create each gutter element                     |
| `elementStyle` | Function        |                | Called to set the style of each element.                 |
| `gutterStyle`  | Function        |                | Called to set the style of the gutter.                   |
| `onDrag`       | Function        |                | Callback on drag.                                        |
| `onDragStart`  | Function        |                | Callback on drag start.                                  |
| `onDragEnd`    | Function        |                | Callback on drag end.                                    |

Refer to [Split.js documentation](https://github.com/nathancahill/split/tree/master/packages/splitjs#documentation) for more details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
