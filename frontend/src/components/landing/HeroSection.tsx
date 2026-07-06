import { ArrowRight, Landmark, SearchCheck } from "lucide-react";

export function HeroSection() {
  return (
    <section className="border-b border-slate-200 bg-white" id="consult">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-20">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-[#0b3a6f]">
            Official Information Navigation / AI Support
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-normal text-slate-950 sm:text-5xl lg:text-6xl">
            AI 留学生生活支援平台
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
            为在日外国留学生提供官方信息查询与 AI 咨询服务。
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#consult"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-[#0b3a6f] px-5 py-3 text-sm font-semibold text-white hover:bg-[#082d58]"
            >
              开始咨询
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a
              href="#guides"
              className="inline-flex items-center justify-center rounded-md border border-[#0b3a6f] px-5 py-3 text-sm font-semibold text-[#0b3a6f] hover:bg-slate-50"
            >
              浏览生活指南
            </a>
          </div>
        </div>

        <div className="grid content-start gap-4 border-l-4 border-[#0b3a6f] bg-slate-50 p-6">
          <div className="flex items-start gap-4">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-md bg-white text-[#0b3a6f] ring-1 ring-slate-200">
              <Landmark size={22} aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-950">
                信息来源导向
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                以手续、生活、学习和工作场景组织信息，帮助留学生更快找到需要确认的事项。
              </p>
            </div>
          </div>
          <div className="h-px bg-slate-200" />
          <div className="flex items-start gap-4">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-md bg-white text-[#0b3a6f] ring-1 ring-slate-200">
              <SearchCheck size={22} aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-950">
                面向多语言使用者
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                页面结构预留中文、日本語、English 三语切换入口，适合后续扩展多语言内容。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
