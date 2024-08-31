import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { prisma } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";

// Sample sub-categories data

export default async function CarouselSection() {
  const categories = await prisma.category.findMany();
  return (
    <div dir="ltr" className="w-full  mx-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Sub Categories</h2>
      <Carousel
        dir="ltr"
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className=" flex justify-center ml-2 md:-ml-4">
          {categories.map((category, index) => (
            <CarouselItem
              key={index}
              className="pl-2 md:pl-4 basis-1/3 md:basis-1/4 lg:basis-1/6"
            >
              <div className="flex flex-col items-center space-y-2">
                <Link href={`/${category.id}`}>
                  <div className="relative w-20 h-20 overflow-hidden rounded-full border-2 border-primary">
                    <Image
                      src={category.image || ""}
                      alt={category.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <span className="text-sm font-medium text-center">
                    {category.name}
                  </span>
                </Link>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
