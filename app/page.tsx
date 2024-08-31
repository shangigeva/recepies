import MainPage from "@/components/pages/main-page";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/db";

export default async function Home() {
  return (
    <div>
      <MainPage />
    </div>
  );
}
