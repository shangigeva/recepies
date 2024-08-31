import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { prisma } from "@/lib/db";
import { Utensils } from "lucide-react";
import Link from "next/link";
import CarouselSection from "./carousel-section";

export default async function MainPage() {
  const recipes = [
    {
      title: "Spaghetti Carbonara",
      description:
        "A classic Italian pasta dish with eggs, cheese, and pancetta.",
      cookTime: "20 mins",
      difficulty: "Easy",
    },
    {
      title: "Chicken Stir Fry",
      description: "A quick and healthy Asian-inspired dish with vegetables.",
      cookTime: "15 mins",
      difficulty: "Medium",
    },
    {
      title: "Vegetable Curry",
      description:
        "A flavorful and spicy vegetarian curry with mixed vegetables.",
      cookTime: "30 mins",
      difficulty: "Medium",
    },
    {
      title: "Beef Tacos",
      description:
        "Delicious and easy-to-make Mexican-style tacos with ground beef.",
      cookTime: "25 mins",
      difficulty: "Easy",
    },
  ];

  const categories = await prisma.category.findMany({
    include: {
      subCategory: true,
    },
  });
  console.log(categories);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <Utensils className="h-6 w-6" />
          <span className="sr-only">Tasty Recipes</span>
        </Link>
        <nav className="mr-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Home
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Recipes
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            About
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48  flex flex-row items-center justify-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Welcome to Tasty Recipes
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Discover delicious recipes for every occasion. From quick
                  weeknight dinners to impressive party dishes.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1"
                    placeholder="Search recipes"
                    type="search"
                  />
                  <Button type="submit">Search</Button>
                </form>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48  flex flex-row items-center justify-center">
          <div className=" px-4 md:px-6 w-full ">
            <div className="flex flex-col  w-full  items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl  font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Welcome to Tasty Recipes
                </h1>
              </div>
              <div className="w-full space-y-2">
                <CarouselSection />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full flex flex-row items-center justify-center py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6 ">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">
              Featured Recipes
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {categories.map((category) => (
                <Card key={category.id}>
                  <CardHeader>
                    <CardTitle>{category.name}</CardTitle>
                    <CardDescription>
                      {category.subCategory.map((sub) => (
                        <span key={sub.id}>{sub.name},</span>
                      ))}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Cook Time: זמן בישול
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Difficulty: מורכבות
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/${category.id}`} className="w-full">
                      View Recipe
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2023 Tasty Recipes. All rights reserved.
        </p>
        <nav className="sm:mr-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
