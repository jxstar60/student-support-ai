import {
  BadgeJapaneseYen,
  BriefcaseBusiness,
  FileText,
  HeartPulse,
  Home,
  Landmark
} from "lucide-react";
import { Link } from "react-router-dom";
import { featureItems } from "../../data/landingPage";

const icons = [
  FileText,
  Home,
  BriefcaseBusiness,
  Landmark,
  HeartPulse,
  BadgeJapaneseYen
];

export function FeatureGrid() {
  return (
    <section className="bg-white py-14 sm:py-16" id="guides">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 border-b border-slate-200 pb-5">
          <p className="text-sm font-semibold text-[#0b3a6f]">服务入口</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">
            留学生常用信息分类
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featureItems.map((item, index) => {
            const Icon = icons[index];

            return (
              <Link
                key={item.title}
                to={item.href}
                className="group rounded-lg border border-slate-200 bg-white p-5 shadow-sm hover:border-[#0b3a6f] hover:shadow-md"
              >
                <div className="flex items-start gap-4">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-md bg-slate-100 text-[#0b3a6f] group-hover:bg-[#0b3a6f] group-hover:text-white">
                    <Icon size={22} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-950">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
