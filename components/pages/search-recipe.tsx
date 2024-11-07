"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

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
  const [recipe, setRecipe] = React.useState<Recipe[]>(recipes);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  console.log(recipes);

  //   React.useEffect(() => {
  //     const fetchUsers = async () => {
  //       try {
  //         const response = await fetch(
  //           "https://jsonplaceholder.typicode.com/users"
  //         );
  //         if (!response.ok) {
  //           throw new Error("Failed to fetch users");
  //         }
  //         const data = await response.json();
  //         setRecipe(data);
  //         setLoading(false);
  //       } catch (err) {
  //         setError("Error fetching users. Please try again later.");
  //         setLoading(false);
  //       }
  //     };

  //     fetchUsers();
  //   }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Button>{value || "Select a recipe"}</Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search recipes..." />
          <CommandEmpty>No recipe found.</CommandEmpty>
          <CommandGroup>
            {recipes.map((recipe) => (
              <CommandItem
                key={recipe.id}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
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
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
