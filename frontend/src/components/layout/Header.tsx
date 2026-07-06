import { Menu } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { languages, navItems } from "../../data/landingPage";

const navLinkClassName = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? "text-[#0b3a6f] underline decoration-2 underline-offset-8"
    : "hover:text-[#0b3a6f]";

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-3"
          aria-label="Student Support AI 首页"
        >
          <span className="flex size-10 items-center justify-center rounded-md bg-[#0b3a6f] text-sm font-bold text-white">
            SS
          </span>
          <span className="text-lg font-bold text-slate-950">
            Student Support AI
          </span>
        </Link>

        <nav
          className="hidden items-center gap-5 text-sm font-medium text-slate-700 lg:flex"
          aria-label="主导航"
        >
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={navLinkClassName}
              end={item.href === "/"}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <div className="flex rounded-md border border-slate-300 bg-white p-1 text-xs font-medium text-slate-700">
            {languages.map((language, index) => (
              <button
                key={language}
                type="button"
                className={`rounded px-2.5 py-1.5 ${
                  index === 0 ? "bg-[#0b3a6f] text-white" : "hover:bg-slate-100"
                }`}
              >
                {language}
              </button>
            ))}
          </div>
          <Link
            to="/chat"
            className="rounded-md bg-[#0b3a6f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#082d58]"
          >
            开始咨询
          </Link>
        </div>

        <button
          type="button"
          className="flex size-10 items-center justify-center rounded-md border border-slate-300 text-slate-700 lg:hidden"
          aria-label="打开导航菜单"
        >
          <Menu size={20} aria-hidden="true" />
        </button>
      </div>

      <div className="border-t border-slate-100 px-4 py-3 lg:hidden">
        <nav
          className="flex gap-4 overflow-x-auto text-sm font-medium text-slate-700"
          aria-label="移动端导航"
        >
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                `shrink-0 ${navLinkClassName({ isActive })}`
              }
              end={item.href === "/"}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
