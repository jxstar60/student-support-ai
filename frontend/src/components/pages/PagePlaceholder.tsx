import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

type PagePlaceholderProps = {
  title: string;
  description: string;
};

export function PagePlaceholder({ title, description }: PagePlaceholderProps) {
  return (
    <section className="bg-white py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-l-4 border-[#0b3a6f] bg-slate-50 p-6 sm:p-8">
          <p className="text-sm font-semibold text-[#0b3a6f]">
            Student Support AI
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-normal text-slate-950 sm:text-4xl">
            {title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-700">
            {description}
          </p>
          <div className="mt-6 rounded-md border border-slate-200 bg-white p-4 text-sm font-medium text-slate-700">
            该功能正在开发中
          </div>
          <Link
            to="/"
            className="mt-8 inline-flex items-center gap-2 rounded-md border border-[#0b3a6f] px-4 py-2 text-sm font-semibold text-[#0b3a6f] hover:bg-white"
          >
            <ArrowLeft size={18} aria-hidden="true" />
            返回首页
          </Link>
        </div>
      </div>
    </section>
  );
}
