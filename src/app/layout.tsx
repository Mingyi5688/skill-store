import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { DisclaimerBox } from "@/components/DisclaimerBox";

export const metadata: Metadata = {
  title: "Invest Skill Store",
  description: "投资研究 Skill 应用商店 MVP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        <Navbar />
        <main>{children}</main>
        <DisclaimerBox compact />
        <footer className="border-t border-line bg-ink">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-sm text-zinc-500 sm:px-6 lg:px-8">
            <p>Invest Skill Store MVP · Public Skill research workflow</p>
            <p>不接真实交易，不接真实支付，不承诺收益。</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
