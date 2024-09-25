"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

const inputIsInvalid = (text) => {
  return !text || text.trim() === "";
};

export const shareMeal = async (prevState, formData) => {
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  if (
    inputIsInvalid(meal.title) ||
    inputIsInvalid(meal.summary) ||
    inputIsInvalid(meal.instructions) ||
    inputIsInvalid(meal.creator) ||
    inputIsInvalid(meal.creator_email) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    meal.image.size === 0
  ) {
    return { message: "Invalid input" };
  }

  await saveMeal(meal);
  revalidatePath('/meals')
  redirect("/meals");
};
