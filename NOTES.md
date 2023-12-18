# Notes

Hello! This is a place where I (Dylan) am putting my thoughts and ideas down for how I'm thinking about the take home project.

## Frontend

- Added react-router to easily handle routing within the application, and to use the search parameters as the source of truth
  - It can be easy to run into state bugs if we have two sources of truth (`query param` and `this.state`)
  - Using react-router's `useSearchParams` hook allows the page to watch for changes and rerender the UI when search parameters change
  - To use hooks I needed to convert the `<Home />` component from a class-based to a fuctional component
  - Updated webpack to include `historyApiFallback: true,` in `devServer` to allow nested urls to route back to the SPA and updated `publicPath` to map back to the root path

### Pages

- The index page `/` will provide the ability to search/filter recipes and viewing a single recipe
- Navigate to `recipe/:recipeId` to view just a recipe

## Backend

- The ingredients in the `/recipes/:id` endpoint can return duplicate ingredients
  - This is due to mock data, but we could prevent inserting duplicates by checking during the ingredient/recipe creation API (POST) and/or by adding a DB constraint
  - On the frontend: removing the duplicate ingredients would simplify the `key` prop in React to improve list rendering
