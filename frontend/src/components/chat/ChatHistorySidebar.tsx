import { Trash2 } from "lucide-react";
import type { ChatSession } from "../../types/chat";

type ChatHistorySidebarProps = {
  sessions: ChatSession[];
  activeSessionId: string | null;
  isLoading: boolean;
  onCreateSession: () => void;
  onSelectSession: (sessionId: string) => void;
  onDeleteSession: (sessionId: string) => void;
};

export function ChatHistorySidebar({
  sessions,
  activeSessionId,
  isLoading,
  onCreateSession,
  onSelectSession,
  onDeleteSession
}: ChatHistorySidebarProps) {
  return (
    <aside className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-base font-semibold text-slate-950">聊天历史</h2>
        <button
          type="button"
          onClick={onCreateSession}
          className="rounded-md bg-[#0b3a6f] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#082d58]"
        >
          新建咨询
        </button>
      </div>

      <div className="mt-4 grid gap-2">
        {isLoading ? (
          <p className="text-sm text-slate-500">正在加载历史...</p>
        ) : null}

        {!isLoading && sessions.length === 0 ? (
          <p className="text-sm text-slate-500">暂无聊天历史。</p>
        ) : null}

        {sessions.map((session) => {
          const isActive = activeSessionId === session.id;

          return (
            <div
              key={session.id}
              className={`flex items-center gap-2 rounded-md border p-2 ${
                isActive
                  ? "border-[#0b3a6f] bg-slate-50"
                  : "border-slate-200 bg-white"
              }`}
            >
              <button
                type="button"
                onClick={() => onSelectSession(session.id)}
                className="min-w-0 flex-1 text-left"
              >
                <p className="truncate text-sm font-semibold text-slate-900">
                  {session.title}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {new Date(session.updated_at ?? session.created_at).toLocaleString()}
                </p>
              </button>
              <button
                type="button"
                onClick={() => onDeleteSession(session.id)}
                className="flex size-8 shrink-0 items-center justify-center rounded-md text-slate-500 hover:bg-red-50 hover:text-red-700"
                aria-label="删除聊天会话"
              >
                <Trash2 size={16} aria-hidden="true" />
              </button>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
