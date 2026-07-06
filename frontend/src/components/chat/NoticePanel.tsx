const notices = [
  "本系统提供的信息仅供参考",
  "重要手续请以官方机构发布的信息为准",
  "请不要输入个人敏感信息",
  "紧急情况请联系学校或相关公共机构"
];

const officialLinks = [
  { label: "出入国在留管理厅", href: "https://www.moj.go.jp/isa/" },
  { label: "JASSO", href: "https://www.jasso.go.jp/" },
  { label: "厚生劳动省", href: "https://www.mhlw.go.jp/" },
  { label: "法务省", href: "https://www.moj.go.jp/" }
];

export function NoticePanel() {
  return (
    <aside className="space-y-4">
      <section className="rounded-lg border border-slate-200 bg-white p-4">
        <h2 className="text-base font-semibold text-slate-950">
          使用前请确认
        </h2>
        <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
          {notices.map((notice) => (
            <li key={notice} className="border-l-2 border-[#0b3a6f] pl-3">
              {notice}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-4">
        <h2 className="text-base font-semibold text-slate-950">
          常用官方链接
        </h2>
        <div className="mt-4 grid gap-2">
          {officialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-[#0b3a6f] hover:border-[#0b3a6f] hover:bg-slate-50"
            >
              {link.label}
            </a>
          ))}
        </div>
      </section>
    </aside>
  );
}
