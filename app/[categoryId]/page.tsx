import MainPage from "@/components/pages/main-page";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CarouselSection from "@/components/pages/carousel-section";
import Image from "next/image";
import Link from "next/link";

export default async function Home({
  params,
}: {
  params: { categoryId: number };
}) {
  const category = await prisma.category.findFirstOrThrow({
    where: {
      id: Number(params.categoryId),
    },
    include: {
      subCategory: {
        include: {
          Recipe: true,
        },
      },
    },
  });

  return (
    <div dir="ltr">
      <main className=" flex flex-col">
        {category.subCategory.map((subCategory) => {
          return (
            <div className="">
              {subCategory.name}
              <div className="grid grid-cols-4" key={subCategory.id}>
                {subCategory.Recipe.map((recipe) => (
                  <Card
                    key={recipe.id}
                    className=" shadow-lg rounded-lg overflow-hidden bg-black"
                  >
                    <CardHeader className="p-4 border-b">
                      <CardTitle className="text-xl font-semibold">
                        {recipe.name}
                      </CardTitle>
                      <CardDescription className="relative w-full h-64 overflow-hidden mt-2">
                        {recipe.image && (
                          <Image
                            src={recipe.image}
                            alt={recipe.name}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-lg"
                          />
                        )}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        זמן הכנה: <span>{recipe.cookTime}</span>
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        רמת קושי: <span>{recipe.difficulty}</span>
                      </p>
                    </CardContent>
                    <CardFooter className="p-4 border-t">
                      <Link
                        href={`/${recipe.id}`}
                        className="w-full text-center text-blue-500 hover:underline"
                      >
                        מתכון
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
}
