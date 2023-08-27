"use client";
import { LogOut, Plus, Settings, User, Users, Settings2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useMain } from "@/app/mainContext";
import { signOut } from "next-auth/react";
import Link from "next-intl/link";
import { useTranslations } from "next-intl";

const ProfileButton = () => {
  const { user } = useMain();
  const t = useTranslations("ProfileButton");

  if (!user || user.isBlocked) return null;
  return (
    <DropdownMenu>
      <div className="flex items-center gap-3">
        {/* <Avatar className="rounded-lg">
          <AvatarImage src={user?.image} alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar> */}
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Settings2 className="sm:hidden" />
            <span className="hidden sm:block">{user?.name}</span>
          </Button>
        </DropdownMenuTrigger>
      </div>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{t("my-account")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>{t("profile")}</span>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>{t("settings")}</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {user?.isAdmin && (
            <Link href="/admin">
              <DropdownMenuItem>
                <Users className="mr-2 h-4 w-4" />
                <span>{t("admin")}</span>
              </DropdownMenuItem>
            </Link>
          )}
          <DropdownMenuItem>
            <Plus className="mr-2 h-4 w-4" />
            <span>{t("new-review")}</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>{t("logout")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileButton;
