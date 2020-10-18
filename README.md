# DEPRECATED

This library is now deprecated. It hasn't been actively maintained in a while, there are better ways of getting similar results through hooks and non-component based architecture.

- Having an extra element breaks some accessibility use cases, as well as styling
- React has moved on and hooks are probably a better way of going about this
- The flyweight pattern is still beneficial to improve application performance and hope this library can aim to inspire

An important part of OSS is admitting defeat :)

## React Flyweight Container

[![npm version](https://badge.fury.io/js/react-flyweight.svg)](https://badge.fury.io/js/react-flyweight)
[![No Maintenance Intended](https://unmaintained.tech/badge.svg)](http://unmaintained.tech/)

Simple, lightweight flyweight container for your react apps.

Clean up those `event`s. Handle from a single top-level. No need to deeply pass function definitions down through components.

Leverages [DOM bubbling](https://javascript.info/bubbling-and-capturing).

### Usage

```bash
npm i --save react-flyweight
```

```diff
  import React from 'react';
  import { render } from 'react-dom';
  import PropTypes from 'prop-types';
+ import Flyweight from 'react-flyweight';

  const arr = [];

- const add = (idToAdd) => {
-   arr.push(elData.id);
- }
+ const onClickHandler = (target) => {
+   // decide what to do on click here
+   if(target.dataset.action === 'add') { arr.push(target.dataset.id); }
+ }

  const App = () => (
+   <Flyweight onClickDispatcher={onClickHandler} bindSelector="button">
-     <button onClick={() => add(1);}>Add</button>
-     <button onClick={() => add(2);}>Add</button>
+     <button data-action="add" data-id={1}>Add</button>
+     <button data-action="add" data-id={2}>Add</button>
+   </Flyweight>
  );

  render(<App />, document.getElementById('root'));
```

### Prop Types

`onClickDispatcher` a function that, given an element, will perform some action.

`onKeyDownDispatcher` a function that performs in much the same way as the `onClickDispatcher` prop..

`bindSelector` a string html entity selector e.g. `button`, `div.item`. This tells the flyweight to only care about events coming from these elements. The flyweight component will also accept clicks within the given element selector and treat them as it's own. This works great if you have `<span>` elements nested inside your buttons.

`children` react child or children nodes.

`className` any classnames to attach to the Flyweight container `div` or custom root element (see below). By default the component will have a `react-flyweight-container` class.

`rootElementTagName` any html element, as string, e.g "table", "section". By default the component will render as a `<div>`.
