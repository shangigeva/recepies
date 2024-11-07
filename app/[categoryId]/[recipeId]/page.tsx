import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/lib/db";
import { ChevronDown, ChevronUp, Clock, Users } from "lucide-react";
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
  // function RecipeClientSide({ recipe, defaultServings }: { recipe: any; defaultServings: number }) {
  //   const [servings, setServings] = useState(defaultServings);

  //   const adjustIngredient = (amount: string, factor: number) => {
  //     const match = amount.match(/(\d+(\.\d+)?)/);
  //     if (match) {
  //       const num = parseFloat(match[1]);
  //       return amount.replace(match[1], (num * factor).toFixed(1));
  //     }
  //     return amount;
  //   };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1>{recipe.name}</h1>
      <div className="sticky top-0 bg-background/80 backdrop-blur-sm z-10 py-4 mb-8">
        <h1 className="text-4xl font-bold mb-2">{recipe.name}</h1>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {recipe.cookTime} דקות
          </span>
          <span>רמת קושי: {recipe.difficulty}</span>
        </div>
      </div>
      {recipe.image && (
        <img
          src={recipe.image}
          alt={recipe.name}
          width={1200}
          height={800}
          className="rounded-lg mb-8 w-full h-auto"
        />
      )}

      <div className="flex flex-wrap gap-2 mb-8">
        <Badge variant="secondary">{recipe.subCategoryId}</Badge>
        {/* לעשות שיהיה פה איזה קטגוריות זה */}
      </div>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <h2 className="text-2xl font-semibold mb-4">מצרכים</h2>
          <div className="flex items-center gap-2 mb-4">
            <span>מנות הגשה:</span> <Users className="w-4 h-4" />
            {/* <Button
              variant="outline"
              size="icon"
              onClick={() => setServings(Math.max(1, servings - 1))}
            >
              <ChevronDown className="h-4 w-4" />
            </Button> */}
            {/* <span className="w-8 text-center">{servings}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setServings(servings + 1)}
            >
              <ChevronUp className="h-4 w-4" />
            </Button> */}
          </div>
          <ul className="space-y-2">
            {recipe.ingredients?.split("?").map((ingredient, index) => {
              const [name, amount, difficulty] = ingredient.split(","); // מפריד בין הנתונים אם הם במחרוזת
              return (
                <li
                  key={index}
                  className="flex items-center gap-2 pb-2 border-b last:border-b-0"
                >
                  {difficulty && (
                    <Badge variant="outline" className="w-6 text-center">
                      {difficulty.trim()}
                    </Badge>
                  )}
                  <span className="flex-grow">{name.trim()}</span>
                  {/* {amount && (
                    <span className="font-medium">
                      {adjustIngredient(amount.trim(), servings / 4)}
                    </span>
                  )} */}
                  <span>b</span>
                </li>
              );
            })}
          </ul>
        </CardContent>
      </Card>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">הוראות הכנה</h2>
        <ul className="list-disc pl-6 space-y-4">
          {recipe.steps?.split("?").map((step, index) => (
            <li key={index} className="text-lg leading-relaxed">
              {step.trim()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
