import React, { useEffect } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import Input from "@material-ui/core/Input"
import Checkbox from "@material-ui/core/Checkbox"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Divider from "@material-ui/core/Divider"
import Button from "@material-ui/core/Button"
import LinearProgress from "@material-ui/core/LinearProgress"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import { useSearchParams } from "react-router-dom"
import { Alert } from "../../components/alert"
import * as actions from "../../actions"
import Recipe from "../Recipe"

const ingredientList = ["flour", "sugar", "salt", "butter", "milk"]

const Home = ({
  recipes,
  isLoading,
  error,
  searchRecipes,
  getRecipe,
  resetRecipe,
}) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const term = searchParams.get("term") ?? ""
  const ingredients = searchParams.getAll("ingredients")
  const recipeId = searchParams.get("recipeId")

  useEffect(() => {
    // Load the recipies if we have any search terms.
    if (term || ingredients.length > 0) {
      fetchSearch()
    }

    if (recipeId) {
      fetchRecipe()
    }
  }, [])

  const updateQueryParams = (params) => {
    for (const [key, value] of Object.entries(params)) {
      if (!value || (Array.isArray(value) && value.length === 0)) {
        searchParams.delete(key)
        continue
      }

      if (Array.isArray(value)) {
        // When dealing with multiple values, it's simpler to clear out the
        // parameter key, then append the rest of the values.
        searchParams.set(key, value[0])
        for (const item of value.slice(1)) {
          searchParams.append(key, item)
        }
      } else {
        searchParams.set(key, value)
      }
    }

    setSearchParams(searchParams)
  }

  const fetchSearch = () => {
    searchRecipes(term, ingredients)
  }

  const fetchRecipe = () => {
    getRecipe(searchParams.get("recipeId"))
  }

  const clearRecipe = () => {
    searchParams.delete("recipeId")
    setSearchParams(searchParams)
    resetRecipe()
  }

  const handleSearch = (event) => {
    const term = event.target.value
    updateQueryParams({ term })
  }

  const handleRecipeClick = (recipeId, event) => {
    updateQueryParams({ recipeId })
    fetchRecipe()
  }

  const handleIngredient = (ingredient, event) => {
    const ingredientsClone = [...ingredients]
    if (event.target.checked) {
      ingredientsClone.push(ingredient)
    } else {
      const foundIngredient = ingredientsClone.indexOf(ingredient)
      ingredientsClone.splice(foundIngredient, 1)
    }
    updateQueryParams({ ingredients: ingredientsClone })
  }

  return (
    <>
      {error && <Alert mb={2}>{error.toString()}</Alert>}

      <Input
        onChange={handleSearch}
        value={term}
        placeholder="Search..."
        autoFocus
        fullWidth
      />
      <div>
        <h3>Ingredients on hand</h3>
        {ingredientList.map((ingredient) => (
          <FormControlLabel
            key={ingredient}
            control={
              <Checkbox
                checked={ingredients.includes(ingredient)}
                onChange={(event) => handleIngredient(ingredient, event)}
                value={ingredient}
              />
            }
            label={ingredient}
          />
        ))}
      </div>
      <Button
        onClick={() => {
          fetchSearch()
          clearRecipe()
        }}
      >
        search
      </Button>
      <Divider />
      {recipes && (
        <List>
          {recipes.map((recipe) => (
            <ListItem
              key={recipe.id}
              onClick={(event) => handleRecipeClick(recipe.id, event)}
              selected={recipe.id === recipeId}
              button
            >
              <ListItemText primary={recipe.name} />
            </ListItem>
          ))}
        </List>
      )}
      {isLoading && <LinearProgress />}
      <Divider />

      <Recipe />
    </>
  )
}

const mapStateToProps = (state) => {
  const { search } = state
  return { ...search }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      searchRecipes: actions.searchRecipes,
      getRecipe: actions.getRecipe,
      resetRecipe: actions.resetRecipe,
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Home)
