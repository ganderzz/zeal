# Notes

Hello! This is a place where I (Dylan) am putting my thoughts and ideas down for how I'm thinking about the take home project.

## Backend

- The ingredients in the `/recipes/:id` endpoint can return duplicate ingredients
  - This is due to mock data, but we could prevent inserting duplicates by checking during the ingredient/recipe creation API (POST) and/or by adding a DB constraint
  - On the frontend: removing the duplicate ingredients would simplify the `key` prop in React to improve list rendering
