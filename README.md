# React Flyweight Container

[![npm version](https://badge.fury.io/js/react-flyweight.svg)](https://badge.fury.io/js/react-flyweight)

Simple, lightweight flyweight container for your react apps.
Clean up those `onClicks`.

`~1kb`, awesome.

### Usage

```bash
npm i --save react-flyweight
```

```diff
  import React from 'react';
  import { render } from 'react-dom';
  import PropTypes from 'prop-types';
+ import FlyweightContainer from 'react-flyweight';

  const arr = [];

- const add = (idToAdd) => {
-   arr.push(elData.id);
- }
+ const onClickHandler = (elData) => {
+   // decide what to do on click here
+   if(elData.action === 'add') { arr.push(elData.id); }
+ }

  const App = () => (
+   <FlyweightContainer onClickDispatcher={onClickHandler}>
-     <button onClick={() => add(1);}>Add</button>
-     <button onClick={() => add(2);}>Add</button>
+     <button data-action="add" data-id={1}>Add</button>
+     <button data-action="add" data-id={2}>Add</button>
+   </FlyweightContainer>
  );

  render(<App />, document.getElementById('root'));
```
