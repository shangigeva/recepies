import { prisma } from "@/lib/db";
import { useRouter } from "next/router";

export default async function RecipePage({
  params,
}: {
  params: { recipeId: number };
}) {
  const recipe = await prisma.recipe.findFirstOrThrow({
    where: {
      id: Number(params.recipeId),
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
    <div className="container mx-auto px-4 py-6">
      <h1>{recipe.name}</h1>
      {recipe.image && (
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-64 object-cover rounded-lg"
        />
      )}
      <p>
        <strong>זמן הכנה:</strong> {recipe.cookTime}
      </p>
      <p>
        <strong>רמת קושי:</strong> {recipe.difficulty}
      </p>
      <p>
        <strong>מצרכים:</strong>{" "}
        {recipe.ingredients?.split("?").map((ing, index) => (
          <li key={index}>{ing.trim()}</li>
        ))}
      </p>
      <p>
        <strong>הוראות:</strong>{" "}
        {recipe.steps?.split("?").map((ing, index) => (
          <li key={index}>{ing.trim()}</li>
        ))}
      </p>
    </div>
  );
}
