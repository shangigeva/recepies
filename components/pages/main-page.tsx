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
import { Facebook, FacebookIcon, Instagram, Utensils } from "lucide-react";
import Link from "next/link";
import CarouselSection from "./carousel-section";
import Image from "next/image";
import Autocomplete from "./search-recipe";
import { GetServerSideProps } from "next";
import SearchDialog from "./search-dialog";

export default async function MainPage() {
  const recipe = await prisma.recipe.findMany();
  const categories = await prisma.category.findMany({
    include: {
      subCategory: true,
    },
  });
  const recipes = await prisma.recipe.findMany();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <header className="bg-slate-300 text-white py-24">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-5xl font-extrabold md:text-7xl tracking-tight text-neutral-900">
            שני גבע
          </h1>
          <h2 className="text-2xl font-semibold mt-2 text-neutral-800">
            בלוג המתכונים
          </h2>
          <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-neutral-700">
            מזמינה אתכם לחפש את אחד המתכונים האהובים שלי
          </p>
          <SearchDialog recipes={recipes} />
        </div>
      </header>
      {/* Carousel Section */}
      <section className="py-16 md:py-24 bg-neutral-100">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tight text-center text-neutral-900 mb-8">
            קטגוריות{" "}
          </h2>
          <CarouselSection />
        </div>
      </section>
      {/* Recommended Recipes Section */}
      <section className="py-16 md:py-24 bg-slate-200">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-12 text-neutral-900">
            מתכונים מומלצים
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {recipe.map((rec) => (
              <Card
                key={rec.id}
                className="bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300"
              >
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-neutral-900">
                    {rec.name}
                  </CardTitle>
                  <CardDescription className="relative w-full h-48 overflow-hidden rounded-lg">
                    {rec.image && (
                      <Image
                        src={rec.image}
                        alt={rec.name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                      />
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-neutral-600">
                    זמן הכנה: <span>{rec.cookTime}</span>
                  </p>
                  <p className="text-sm text-neutral-600">
                    רמת קושי: <span>{rec.difficulty}</span>
                  </p>
                </CardContent>
                <CardFooter>
                  <Link
                    href={`/recipeId/${rec.id}`}
                    className="text-slate-600-500 hover:underline"
                  >
                    מתכון
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* Footer Section */}
      <footer className="bg-slate-500 text-white py-6">
        <div className="container mx-auto px-4 md:px-6 flex flex-col items-center sm:flex-row justify-between">
          <p className="text-xs">© כל הזכויות שמורות לשני גבע. </p>
          <nav className="flex gap-5">
            <Link
              href="#"
              className="text-xs hover:underline underline-offset-4"
            >
              אודות{" "}
            </Link>
            <Link
              href="#"
              className="text-xs hover:underline underline-offset-4"
            >
              פרטיות
            </Link>{" "}
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              href="#"
            >
              <Facebook />
            </Link>
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              href="#"
            >
              <Instagram />
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
