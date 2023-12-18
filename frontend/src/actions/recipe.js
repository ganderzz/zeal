export const GET_RECIPE = "GET_RECIPE"
export const RECEIVE_RECIPE = "RECEIVE_RECIPE"
export const FAIL_RECIPE = "FAIL_RECIPE"
export const RESET_RECIPE = "RESET_RECIPE"

const fetchingRecipe = () => ({
  type: GET_RECIPE,
})

const fetchedRecipe = (payload) => ({
  type: RECEIVE_RECIPE,
  payload,
})

const failedRecipe = (payload) => ({
  type: FAIL_RECIPE,
  payload,
})

export const resetRecipe = () => ({
  type: RESET_RECIPE,
})

export const executeRecipe = async (recipeId) => {
  if (!recipeId) {
    throw new Error("recipeId is required when fetching a recipe.")
  }

  const response = await fetch(`/api/recipe/${recipeId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  const payload = await response.json()

  if (!response.ok) {
    throw new Error(payload.error)
  }

  return payload
}

export const getRecipe = (recipeId) => {
  return async (dispatch) => {
    dispatch(fetchingRecipe())

    try {
      const res = await executeRecipe(recipeId)
      dispatch(fetchedRecipe(res))
    } catch (error) {
      dispatch(failedRecipe(error))
    }
  }
}
