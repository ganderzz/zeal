export const GET_SEARCH = "GET_SEARCH"
export const RECEIVE_SEARCH = "RECEIVE_SEARCH"
export const FAIL_SEARCH = "FAIL_SEARCH"

const fetchingSearch = () => ({
  type: GET_SEARCH,
})

const fetchedSearch = (payload) => ({
  type: RECEIVE_SEARCH,
  payload,
})

const failedSearch = (payload) => ({
  type: FAIL_SEARCH,
  payload,
})

export const executeSearch = async (name, ingredients) => {
  const response = await fetch("/api/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, ingredients }),
  })
  const searchResults = await response.json()

  if (!response.ok) {
    throw new Error(searchResults.error)
  }

  return searchResults
}

export const searchRecipes = (name, ingredients) => {
  return async (dispatch) => {
    dispatch(fetchingSearch())

    try {
      const res = await executeSearch(name, ingredients)
      dispatch(fetchedSearch(res))
    } catch (error) {
      dispatch(failedSearch(error))
    }
  }
}
