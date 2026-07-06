import { HelpCircle } from "lucide-react";
import { faqItems } from "../../data/landingPage";

export function FaqSection() {
  return (
    <section className="bg-white py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 border-b border-slate-200 pb-5">
          <p className="text-sm font-semibold text-[#0b3a6f]">FAQ</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">
            常见问题
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {faqItems.map((item) => (
            <article
              key={item.question}
              className="rounded-lg border border-slate-200 bg-white p-5"
            >
              <div className="flex gap-3">
                <HelpCircle
                  size={20}
                  className="mt-0.5 shrink-0 text-[#0b3a6f]"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="text-base font-semibold text-slate-950">
                    {item.question}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {item.answer}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
