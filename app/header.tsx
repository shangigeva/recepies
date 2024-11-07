import { InstagramLogoIcon } from "@radix-ui/react-icons";
import {
  Facebook,
  FacebookIcon,
  HouseIcon,
  Instagram,
  Utensils,
} from "lucide-react";
import Link from "next/link";
import React from "react";

const HeaderComponent = () => {
  return (
    <div>
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <Utensils className="h-6 w-6" />
          <span className="sr-only">Tasty Recipes</span>
        </Link>
        <nav className="flex gap-4 sm:gap-6 justify-center w-full">
          {" "}
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            ראשי
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            מתכוני בישול
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            מתכוני אפייה
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            אודות
          </Link>
        </nav>
        <nav className="flex gap-4 sm:gap-6 w-auto">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            <FacebookIcon />
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            <Instagram />
          </Link>
        </nav>
      </header>
    </div>
  );
};

export default HeaderComponent;
