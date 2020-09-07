# use-slice
Provides a React hook similar to the Redux Toolkit [createSlice](https://redux-toolkit.js.org/usage/usage-with-typescript#createslice).

Whenever you intend to use React's `useReducer` hook, `useSlice` can be a big help; it wires the whole reducers/actions parts for you out of the box so you can focus on the business logic of your app.

The idea is that you are able to create your `reducers` and `actions` to be used with React's [useReducer](https://reactjs.org/docs/hooks-reference.html#usereducer).

## Instalation
You can add this hook as a dependency by running `npm install @cheesebit/use-slice` or `yarn add @cheesebit/use-slice`.

## Usage guide

```jsx
import React from 'react';
import useSlice from '@cheesebit/use-slice';

function ToDoList() {
 const { state, actions, dispatch } = useSlice('todo', [], {
  addTodo(state, action) {
    const { payload: newTodo } = action;

    return [
      ...state,
      newTodo,
    ];
  },
  setDone(state, action) {
    const { payload: index } = action;
    
    return [
      ...state.slice(0, index),
      {
        ...state[index],
        done: true
      },
      ...state.slice(index)
    ]
  }
 });
 
 return (
  <div>
    <ul>
      {
        state.map(toDo => {
          // ... TODO: Show toDo
        }
      }
    <ul/>
    // TODO: Add form
  </div>
 );
}
```
