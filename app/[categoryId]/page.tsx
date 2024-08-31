import MainPage from "@/components/pages/main-page";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CarouselSection from "@/components/pages/carousel-section";

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
      <CarouselSection />
    </div>
  );
}
