"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";
import type { ComponentProps } from "react";

type ToasterProps = ComponentProps<typeof Sonner>;

function Toaster(props: ToasterProps): JSX.Element {
  const { theme } = useTheme();

  const safeTheme: ToasterProps["theme"] =
    theme === "light" || theme === "dark" || theme === "system" ? theme : "system";

  return (
    <Sonner
      {...props}
      theme={safeTheme}
      className="toaster group"
      toastOptions={{
        classNames: {
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          description: "group-[.toast]:text-muted-foreground",
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
        },
      }}
    />
  );
}

export { Toaster };
