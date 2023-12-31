# Notes

Hello 👋! These notes will include my thoughts and ideas about the take-home project.

## Frontend

- Added react-router to handle routing within the application quickly and to use the search parameters as the source of truth
  - It can be easy to run into state bugs if we have two sources of truth (`query param` vs. `this.state`)
  - Using react-router's `useSearchParams` hook allows the page to watch for changes and rerender the UI when search parameters change
  - To use hooks, I needed to convert the `<Home />` component from a class-based to a functional component
  - Updated Webpack to include `historyApiFallback: true,` in `devServer` to allow nested urls to route back to the SPA
    - Also updated `publicPath` to map back to the root path so static assets always load from `/` instead of `/recipe/:id/index.js`
- Added error response handling that will display for the user to all API's
  - In the future, we would want to evaluate if we want to show all errors or only relevant errors (e.g., only 400 errors)

### Pages

- The index page `/` will provide the ability to search/filter recipes and view a recipe
- Navigate to `recipe/:recipeId` to view just a recipe

## Backend

- The ingredients in the `/recipes/:id` endpoint can return duplicate ingredients
  - This is due to mock data, but we could prevent duplicates by adding a DB unique constraint
  - On the frontend: removing the duplicate ingredients would simplify the `key` prop in React to improve list rendering--right now we need to use `ingredient + index` for the key

## Docker

Build both frontend and backend images from the root of the project.

**Frontend:** `docker build -f frontend/Dockerfile -t zeal-frontend .`

**Backend:** `docker build -f backend/Dockerfile -t zeal-backend .`

- I needed to upgrade webpack/webpack-cli to work correctly with Yarn PnP
  - Because webpack-cli was updated, the webpack dev-server also needed to be updated, which requires new `webpack.config.js` settings
- `mongodb-memory-server` upgrade was required to have it work inside a Docker container
  - Also, [could not use an alpine image](https://nodkz.github.io/mongodb-memory-server/docs/guides/integration-examples/docker/) so ended up using `node:bullseye`.
  - Given more time, we would not use `mongodb-memory-server` inside the Docker container and instead run a MongoDB image as a stand-alone container
- Using a non-root user Nginx image (nginxinc/nginx-unprivileged) to run the frontend
  - Default port is `8080` instead of `80` (e.g. `docker run -p 3000:8080 [image]`)
- The frontend is hard coded to loop-back on itself when using the `/api` endpoint through Docker
  - We could fix this in a few different ways, but the simplest, if we deploy to Kubernetes, would be to populate an `nginx.conf` configmap for the frontend pods. The nginx config would route `/api` endpoints to the backend pods using `proxy_pass`
