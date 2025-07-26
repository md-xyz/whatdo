"use client";

import { dark } from "@clerk/themes";
import { UserButton, useUser } from "@clerk/nextjs";

import { useCurrentTheme } from "@/hooks/use-current-theme";

interface Props {
    showName?: boolean;
};

export const UserControl = ({ showName }: Props) => {
    const currentTheme = useCurrentTheme();
    const { user } = useUser();
    const username = user?.username;

    return (
        <div className="flex items-center gap-2">
            {username && (
                <span className="text-sm font-medium">
                    {username}
                </span>
            )}
            <UserButton
                showName={username ? false : showName}
                appearance={{
                    elements: {
                        userButtonBox: "rounded-full!",
                        userButtonAvatarBox: "rounded-full! size-8!",
                        userButtonTrigger: "rounded-full!"
                    },
                    baseTheme: currentTheme === "dark" ? dark : undefined,
                }}
            />
        </div>
    );
};