import type { ChatMessage } from "../../types/chat";

type ChatMessageBubbleProps = {
  message: ChatMessage;
};

export function ChatMessageBubble({ message }: ChatMessageBubbleProps) {
  const isUser = message.role === "user";
  const references = message.references?.slice(0, 3) ?? [];
  const hasReferences = message.role === "assistant" && references.length > 0;

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] whitespace-pre-wrap rounded-lg px-4 py-3 text-sm leading-6 sm:max-w-[75%] ${
          isUser
            ? "bg-[#0b3a6f] text-white"
            : "border border-slate-200 bg-white text-slate-800"
        }`}
      >
        {message.source ? (
          <span className="mb-2 inline-flex rounded border border-[#0b3a6f] px-2 py-0.5 text-xs font-semibold text-[#0b3a6f]">
            知识库回复
          </span>
        ) : null}

        <p>{message.content}</p>

        {hasReferences ? (
          <div className="mt-4 border-t border-slate-200 pt-3">
            <p className="text-xs font-semibold text-slate-700">参考资料：</p>
            <div className="mt-2 grid gap-2">
              {references.map((reference) => (
                <article
                  key={`${reference.title}-${reference.source_url}`}
                  className="rounded-md border border-slate-200 bg-slate-50 p-3"
                >
                  <p className="text-sm font-semibold text-slate-900">
                    {reference.title}
                  </p>
                  <p className="mt-1 text-xs text-slate-600">
                    来源机构：{reference.source_name}
                  </p>
                  <a
                    href={reference.source_url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex text-xs font-semibold text-[#0b3a6f] hover:underline"
                  >
                    查看链接
                  </a>
                </article>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
