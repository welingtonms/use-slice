# use-slice

Provides a React hook similar to the Redux Toolkit [createSlice](https://redux-toolkit.js.org/usage/usage-with-typescript#createslice).

Whenever you intend to use React's `useReducer` hook, `useSlice` can be a big help; it wires the whole reducers/actions parts for you out of the box so you can focus on the business logic of your app.

The idea is that you are able to create your `reducers` and `actions` to be used with React's [useReducer](https://reactjs.org/docs/hooks-reference.html#usereducer).

## Instalation

You can add this hook as a dependency by running `npm install @cheesebit/use-slice` or `yarn add @cheesebit/use-slice`.

## Props

- **`name`** - Name of your slice. This is used to internally compose your actions' names (use this is case you want to dispatch your actions manually).

- **`initialState`** - Initial state for your slice.

- **`reducers`** - Finally, here you provide your reducers. Here we expect an object with your reducer functions. Each reducer function receives as parameters (as any reducer would), the current `state` and the `action` object. Important to notice that we handle the payload to you as an `array`, containing the arguments provided when your action was called (so your action can use as many parameter as needed).

## What you get

When you call `useSlice` we generate a wrapper around your reducers, generating actions types and using React's `useReducer` to produce your "slice" of state, and return the following:

- **`state`** - This is state that's being handled in your slice.

- **`actions`** - This object holds you **dispatchable** actions ([!] do **NOT** forget to `dispatch` your action call), generated from the reducers you provided. That means, if your `reducers` object has a reducer `increment`, for instance, your `actions` object will have a function with the same name, so you can call it to perform the intended operation on your state.

- **`dispatch`** - The dispatcher function.

## Usage guide

Check a more complete example [here](https://codesandbox.io/embed/relaxed-fast-h4lv4?fontsize=14&hidenavigation=1&theme=dark).

```jsx
import React from "react";
import { useSlice } from "@cheesebit/use-slice";

import "./styles.css";

function ToDoWithSlice() {
  const [description, setDescription] = React.useState("");
  const { state: toDos, actions, dispatch } = useSlice("todo", [], {
    addTodo(state, action) {
      const { payload } = action;
      const [newTodo] = payload;

      return [...state, newTodo];
    },
    setDone(state, action) {
      const { payload } = action;
      const [index] = payload;

      return [
        ...state.slice(0, index),
        {
          ...state[index],
          done: true
        },
        ...state.slice(index + 1)
      ];
    }
  });

  return (
    <div className="block p-4">
      <h1>ToDoWithSlice</h1>
      <form className="flex flex-row items-end space-x-2 mb-4">
        <label className="flex flex-col items-start">
          Description
          <input
            type="text"
            className="border px-4 py-2"
            value={description}
            onChange={function handler(e) {
              const {
                target: { value }
              } = e;

              setDescription(value);
            }}
          />
        </label>
        <button
          type="button"
          className="bg-blue-500 px-4 py-2 text-white"
          onClick={function addTodo() {
            dispatch(
              actions.addTodo({
                description,
                done: false
              })
            );

            // You could also write:
            // dispatch({
            //   type: actions.addTodo.type,
            //   payload: [{
            //     description,
            //     done: false
            //   }]
            // })

            setDescription("");
          }}
        >
          Add
        </button>
      </form>
      <ul className="list-disc flex flex-col items-stretch">
        {toDos.map((toDo, index) => {
          return (
            <li
              key={index}
              className={`flex items-center border-b py-2 ${
                toDo.done && "line-through"
              }`}
            >
              {toDo.description}
              <button
                type="button"
                disabled={toDo.done}
                className="bg-green-500 px-4 py-2 text-white ml-auto mr-0"
                onClick={function addTodo() {
                  dispatch(actions.setDone(index));
                  setDescription("");
                }}
              >
                Done
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function App() {
  return (
    <div className="App">
      <h1>How to use @cheesebit/use-slice</h1>
      <ToDoWithSlice />
    </div>
  );
}
```
