import { ChevronRight } from "lucide-react";
import { announcements } from "../../data/landingPage";

export function AnnouncementsSection() {
  return (
    <section className="border-y border-slate-200 bg-slate-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold text-[#0b3a6f]">公告</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-950">
              重要通知
            </h2>
          </div>
          <a href="#" className="text-sm font-semibold text-[#0b3a6f] hover:underline">
            查看全部
          </a>
        </div>

        <div className="divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">
          {announcements.map((announcement) => (
            <a
              key={`${announcement.date}-${announcement.title}`}
              href="#"
              className="grid gap-3 px-5 py-4 hover:bg-slate-50 sm:grid-cols-[8rem_5rem_1fr_1.5rem] sm:items-center"
            >
              <time className="text-sm font-medium text-slate-600">
                {announcement.date}
              </time>
              <span className="w-fit rounded border border-[#0b3a6f] px-2 py-1 text-xs font-semibold text-[#0b3a6f]">
                {announcement.category}
              </span>
              <span className="text-sm font-semibold text-slate-900">
                {announcement.title}
              </span>
              <ChevronRight
                size={18}
                className="hidden text-slate-400 sm:block"
                aria-hidden="true"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
