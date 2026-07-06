const footerLinks = ["隐私政策", "联系我们", "使用说明", "网站地图"];

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
            <a key={link} href="#" className="hover:text-white hover:underline">
              {link}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
