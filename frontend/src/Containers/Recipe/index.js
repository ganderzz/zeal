import React from "react"
import { connect } from "react-redux"
import Box from "@material-ui/core/Box"
import LinearProgress from "@material-ui/core/LinearProgress"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import { Alert } from "../../components/alert"

const Recipe = ({ recipe, isLoading, error }) => {
  if (isLoading) {
    return <LinearProgress />
  }

  if (error) {
    return <Alert>{error.toString()}</Alert>
  }

  if (!recipe) {
    return null
  }

  return (
    <>
      <Box>
        <h3>{recipe.name}</h3>
        <p>{recipe.instructions}</p>
      </Box>
      <List subheader={<h3>Ingredients</h3>}>
        {recipe.ingredients.map((ingredient, i) => (
          <ListItem key={`${ingredient}-${i}`}>
            <ListItemText primary={ingredient} />
          </ListItem>
        ))}
      </List>
    </>
  )
}

const mapStateToProps = (state) => {
  const { recipe } = state
  return { ...recipe }
}

export default connect(mapStateToProps, {})(Recipe)
