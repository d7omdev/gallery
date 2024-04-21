import "~/styles/globals.css";
import "@uploadthing/react/styles.css";
import { Inter } from "next/font/google";

import { ClerkProvider } from "@clerk/nextjs";
import { CSPostHogProvider } from "~/app/_analytics/provider";
import TopNav from "../components/topnav";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import { Toaster } from "~/components/ui/sonner";
import { SideNav } from "~/components/sidenav";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "Gallery",
  description: "A gallery of images",
  icons: [{ rel: "icon", url: "/gallery.svg" }],
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <CSPostHogProvider>
        <html lang="en">
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
          <body className={`${inter.className} dark`}>
            <div className="flex h-screen flex-col">
              <TopNav />
              <main className=" flex ">
                <SideNav className="w-1/5 " />

                {children}
              </main>
            </div>
            {modal}
            <div id="modal-root" />
            <Toaster />
          </body>
        </html>
      </CSPostHogProvider>
    </ClerkProvider>
  );
}
