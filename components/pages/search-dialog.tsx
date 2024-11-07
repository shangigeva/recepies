"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  BriefcaseMedical,
  IdCard,
  Magnet,
  Search,
  User2Icon,
} from "lucide-react";
import { Recipe } from "@prisma/client";

// Mock data for search results
// const searchResults = [
//   { id: 1, title: "Home", href: "/main" },
//   { id: 2, title: "About", href: "/main/deposit" },
//   { id: 3, title: "Contact", href: "/contact" },
//   { id: 4, title: "Blog", href: "/blog" },
//   { id: 5, title: "Products", href: "/products" },
// ];
export const headerLinks = [
  {
    title: "ראשי",
    icon: IdCard,
    href: "/main",
    section: 1,
  },
  {
    title: "ישויות בסיס",
    icon: IdCard,
    section: 1,
    items: [
      {
        title: "ניהול מעסיק",
        icon: BriefcaseMedical,
        href: "/main/entity/employers",
        subItem: null,
        isReady: true,
      },
      {
        title: "ניהול עמית",
        icon: User2Icon,
        href: "/main/entity/member-details",
        subItem: null,
      },
      {
        title: "גורמים קשורים",
        icon: Magnet,
        href: "/main/entity/connected-sources",
        subItem: null,
      },
      {
        title: "שאילתה לעמית",
        icon: Magnet,
        href: "/main/entity/member-query",
        subItem: null,
      },
    ],
    href: "/main/entity",
  },
  {
    title: "גבייה",
    icon: IdCard,
    section: 1,
    items: [
      {
        title: "איתור תקבולים",
        icon: Magnet,
        href: "/main/payment/receipt",
        subItem: null,
      },
      {
        title: "הפקדות חסרות",
        icon: Magnet,
        href: "/main/employers3",
        subItem: null,
      },
    ],
    href: "/main/gvia",
  },
  {
    title: "רשימות הפקדה",
    icon: IdCard,
    section: 2,
    items: [
      {
        title: "רשימות הפקדה",
        icon: Magnet,
        href: "/main/deposit/list",
        subItem: null,
      },
      {
        title: "הצג שיוכים לקבלות",
        icon: Magnet,
        href: "/main/employers5",
        subItem: null,
      },
    ],
    href: "/main/deposit",
  },
  {
    title: "ממשקים",
    icon: IdCard,
    section: 2,
    items: [
      {
        title: "קליטת ממשק משרד הפנים",
        icon: Magnet,
        href: "/main/employers6",
        subItem: null,
      },
      {
        title: "קליטת ממשק רשימות הפקדה",
        icon: Magnet,
        href: "/main/employers7",
        subItem: null,
      },
    ],
    href: "/main/interfaces",
  },
  {
    title: "דוחות",
    icon: IdCard,
    section: 2,
    items: [
      {
        title: "יתרות פיצויים למעסיק",
        icon: Magnet,
        href: "/main/employers8",
        subItem: null,
      },
    ],
    href: "/main/reports",
  },
  {
    title: "תהליכים",
    icon: IdCard,
    section: 2,
    items: [
      {
        title: "ניהול מכתבים והפצה",
        icon: Magnet,
        href: "/main/employers9",
        subItem: null,
      },
      {
        title: "ניהול תהליכים",
        icon: Magnet,
        href: "/main/employers10",
        subItem: null,
      },
    ],
    href: "/main/process",
  },
];

export default function SearchDialog({ recipes }: { recipes: Recipe[] }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const onSelect = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <>
      <Button
        variant="outline"
        className="w-full justify-start text-sm text-muted-foreground"
        onClick={() => setOpen(true)}
      >
        חיפוש...
        <Search className="ml-auto h-4 w-4" />
        <kbd className="pointer-events-none mr-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0">
          <Command>
            <CommandInput placeholder="חפש עמוד..." />
            <CommandList>
              <CommandEmpty>לא נמצאו תוצאות</CommandEmpty>

              <CommandGroup heading="מתכונים">
                {recipes?.map((recipe) => (
                  <CommandItem
                    key={recipe.id}
                    onSelect={() => onSelect(`/recipeId/${recipe.id}`)}
                  >
                    {recipe.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
}
