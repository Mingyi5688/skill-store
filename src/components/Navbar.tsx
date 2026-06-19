import Link from "next/link";
import { Activity, BookOpen, Building2, Info, Store } from "lucide-react";

const navItems = [
  { href: "/skills", label: "Skill 商店", icon: Store },
  { href: "/creator", label: "创作者入驻", icon: Building2 },
  { href: "/about", label: "关于", icon: Info },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-white">
          <span className="grid h-8 w-8 place-items-center rounded-md border border-signal/40 bg-signal/10">
            <Activity className="h-4 w-4 text-signal" aria-hidden="true" />
          </span>
          <span>Invest Skill Store</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex h-9 items-center gap-2 rounded-md px-3 text-sm text-zinc-300 transition hover:bg-white/5 hover:text-white"
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/skills"
          className="inline-flex h-9 items-center gap-2 rounded-md bg-white px-3 text-sm font-medium text-ink transition hover:bg-zinc-200"
        >
          <BookOpen className="h-4 w-4" aria-hidden="true" />
          开始研究
        </Link>
      </div>
    </header>
  );
}
