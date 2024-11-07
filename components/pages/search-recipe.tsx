"use client";

import * as React from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Recipe } from "@prisma/client";
export default function Autocomplete({ recipes }: { recipes: Recipe[] }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [filteredRecipes, setFilteredRecipes] =
    React.useState<Recipe[]>(recipes);

  React.useEffect(() => {
    if (value === "") {
      setFilteredRecipes(recipes);
    } else {
      setFilteredRecipes(
        recipes.filter((recipe) =>
          recipe.name.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  }, [value, recipes]);

  return (
    <div className="bg-slate-500">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput
              placeholder="חפש מתכון ..."
              value={value}
              onValueChange={setValue} // פונקציה מעדכנת את value
            />
            <CommandEmpty>לא נמצא מתכון</CommandEmpty>
            <CommandGroup>
              {filteredRecipes.length > 0 ? (
                filteredRecipes.map((recipe) => (
                  <CommandItem
                    key={recipe.id}
                    onSelect={() => {
                      setValue(recipe.name);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === recipe.name ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {recipe.name}
                  </CommandItem>
                ))
              ) : (
                <CommandEmpty>לא נמצא מתכון</CommandEmpty>
              )}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
