import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-8">
          <p className="text-sm font-semibold text-[#0b3a6f]">404</p>
          <h1 className="mt-3 text-3xl font-bold text-slate-950">
            页面不存在
          </h1>
          <Link
            to="/"
            className="mt-8 inline-flex rounded-md bg-[#0b3a6f] px-5 py-2 text-sm font-semibold text-white hover:bg-[#082d58]"
          >
            返回首页
          </Link>
        </div>
      </div>
    </section>
  );
}
