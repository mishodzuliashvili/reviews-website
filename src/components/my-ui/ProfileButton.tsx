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

const ProfileButton = () => {
  const { user } = useMain();
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
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {user?.isAdmin && (
            <Link href="/admin">
              <DropdownMenuItem>
                <Users className="mr-2 h-4 w-4" />
                <span>Admin</span>
              </DropdownMenuItem>
            </Link>
          )}
          <DropdownMenuItem>
            <Plus className="mr-2 h-4 w-4" />
            <span>New Review</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileButton;
