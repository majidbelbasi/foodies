import { Suspense } from "react";
import Link from "next/link";
import classes from "./page.module.css";
import MealsGrid from "@/components/Meals/MealsGrid";
import { getMeals } from "@/lib/meals";

export const metadata = {
  title: "All Meals",
  description: "Browse the delecious meals shared by our vibrant community.",
};
const Meals = async () => {
  const meals = await getMeals();
  return <MealsGrid meals={meals} />;
};
export default async function MealsPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, created
          <span className={classes.highlight}> by you.</span>
        </h1>
        <p>
          Chose you favorite recipes and cook it by yourself, it is easy and
          fun!
        </p>
        <p className={classes.cta}>
          <Link href={"/meals/share"}>Share your Favorite Recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense
          fallback={<p className={classes.loading}>Fetching meals...</p>}
        >
          <Meals />
        </Suspense>
      </main>
    </>
  );
}
