import Link from "next/link";
import Image from "next/image";

import { getWixServerClient } from "@/lib/wix-client.server";
import { getCart } from "@/wix-api/cart";
import { getLoggedInMember } from "@/wix-api/members";
import UserButton from "@/components/UserButton";
import logo from "@/assets/logo.png";
import ShoppingCartButton from "./ShoppingCartButton";

export default async function Navbar() {
  const wixClient = getWixServerClient();

  const [cart, loggedInMember] = await Promise.all([
    getCart(wixClient),
    getLoggedInMember(wixClient),
  ]);

  return (
    <header className="bg-background shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 p-5">
        <Link href="/" className="flex items-center gap-4">
          <Image src={logo} alt="Mish Pets logo" width={40} height={40} />
          <span className="text-xl font-bold">Mish Pets</span>
        </Link>
        <div className="flex items-center justify-center gap-5">
          <UserButton loggedInMember={loggedInMember} />
          <ShoppingCartButton initialData={cart} />
        </div>
      </div>
    </header>
  );
}
