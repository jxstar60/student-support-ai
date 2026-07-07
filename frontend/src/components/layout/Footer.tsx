import { Link } from "react-router-dom";

const footerLinks = [
  { label: "隐私政策", href: "#" },
  { label: "联系我们", href: "#" },
  { label: "使用说明", href: "#" },
  { label: "网站地图", href: "#" }
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-[#0b2442] text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
          <p className="text-base font-bold">Student Support AI</p>
          <p className="mt-2 text-sm text-slate-300">
            © 2026 Student Support AI. All rights reserved.
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-200">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-white hover:underline"
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/admin/knowledge"
            className="font-semibold text-white hover:underline"
          >
            知识库管理
          </Link>
          <Link
            to="/admin/dashboard"
            className="font-semibold text-white hover:underline"
          >
            数据统计
          </Link>
        </nav>
      </div>
    </footer>
  );
}
