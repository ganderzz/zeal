import * as React from "react"
import * as ReactDOM from "react-dom"
import { Provider } from "react-redux"
import thunkMiddleware from "redux-thunk"
import { createStore, applyMiddleware } from "redux"
import { hot } from "react-hot-loader"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./Containers/Home"
import Recipe from "./Containers/Recipe"
import reducers from "./reducers"
import * as actions from "./actions"
import { Root } from "./components/root"

const store = createStore(reducers, applyMiddleware(thunkMiddleware))

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/recipe/:recipeId",
    element: <Recipe />,
    loader: ({ params }) => {
      store.dispatch(actions.getRecipe(params.recipeId))
      return null
    },
  },
])

const WrappedHome = () => (
  <Provider store={store}>
    <Root>
      <RouterProvider router={router} />
    </Root>
  </Provider>
)

const HotHome = hot(module)(WrappedHome)

ReactDOM.render(<HotHome />, document.getElementById("home"))
