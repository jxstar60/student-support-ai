import type { ChatMessage } from "../../types/chat";

type ChatMessageBubbleProps = {
  message: ChatMessage;
  feedbackStatus?: string;
  onFeedback?: (messageId: string, rating: "up" | "down") => void;
};

export function ChatMessageBubble({
  message,
  feedbackStatus,
  onFeedback
}: ChatMessageBubbleProps) {
  const isUser = message.role === "user";
  const references = message.references?.slice(0, 3) ?? [];
  const hasReferences = message.role === "assistant" && references.length > 0;
  const canSubmitFeedback = message.role === "assistant" && Boolean(message.source);

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

        {canSubmitFeedback ? (
          <div className="mt-4 border-t border-slate-200 pt-3">
            {feedbackStatus ? (
              <p className="text-xs font-semibold text-emerald-700">
                感谢您的反馈。
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => onFeedback?.(message.id, "up")}
                  className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-[#0b3a6f] hover:text-[#0b3a6f]"
                >
                  👍 有帮助
                </button>
                <button
                  type="button"
                  onClick={() => onFeedback?.(message.id, "down")}
                  className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-[#0b3a6f] hover:text-[#0b3a6f]"
                >
                  👎 无帮助
                </button>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
