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
import { signOut, useSession } from "next-auth/react";
import Link from "next-intl/link";
import { useTranslations } from "next-intl";

const ProfileButton = () => {
    const t = useTranslations("ProfileButton");
    const { data, status } = useSession();

    if (status === "loading") return null;
    return (
        <DropdownMenu>
            <div className="flex items-center gap-3">
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                        <Settings2 className="sm:hidden" />
                        <span className="hidden sm:block">
                            {data?.user.name}
                        </span>
                    </Button>
                </DropdownMenuTrigger>
            </div>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>{t("my-account")}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <Link href="/profile">
                        <DropdownMenuItem>
                            <User className="mr-2 h-4 w-4" />
                            <span>{t("profile")}</span>
                        </DropdownMenuItem>
                    </Link>
                    <Link href="/profile/settings">
                        <DropdownMenuItem>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>{t("settings")}</span>
                        </DropdownMenuItem>
                    </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    {data?.user.isAdmin && (
                        <Link href="/admin">
                            <DropdownMenuItem>
                                <Users className="mr-2 h-4 w-4" />
                                <span>{t("admin")}</span>
                            </DropdownMenuItem>
                        </Link>
                    )}
                    <Link href="/review/new">
                        <DropdownMenuItem>
                            <Plus className="mr-2 h-4 w-4" />
                            <span>{t("new-review")}</span>
                        </DropdownMenuItem>
                    </Link>
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
