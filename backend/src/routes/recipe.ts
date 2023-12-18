import { Request, Response, NextFunction } from "express"
import { Recipe, RecipeModel } from "../models"

type RecipeResponse = {
  name: string
  instructions: string
  ingredients: string[]
}

const recipeCleaner = (recipe: Recipe): RecipeResponse => {
  const { name, instructions, ingredients } = recipe
  return {
    name,
    instructions,
    ingredients: ingredients.map((ingredient) => ingredient.name),
  }
}

export const recipeMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id = req.params.id
  const model = await RecipeModel.findById(id)
  if (!model) {
    res.status(404).send({ error: "Recipe not found" })
    return
  }
  res.send(recipeCleaner(model))
}
