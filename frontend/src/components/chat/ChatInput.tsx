import type { KeyboardEvent } from "react";
import { Send } from "lucide-react";

type ChatInputProps = {
  value: string;
  isLoading: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

export function ChatInput({
  value,
  isLoading,
  onChange,
  onSubmit
}: ChatInputProps) {
  const trimmedValue = value.trim();
  const isDisabled = trimmedValue.length === 0 || isLoading;

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (!isDisabled) {
        onSubmit();
      }
    }
  }

  return (
    <div className="bg-white p-4">
      <label className="sr-only" htmlFor="chat-message">
        咨询内容
      </label>
      <textarea
        id="chat-message"
        value={value}
        maxLength={1000}
        rows={4}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="请输入您的问题..."
        className="w-full resize-none rounded-md border border-slate-300 px-3 py-3 text-sm leading-6 text-slate-900 outline-none focus:border-[#0b3a6f] focus:ring-2 focus:ring-[#0b3a6f]/15"
      />

      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs text-slate-500">{value.length} / 1000</p>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            请不要输入护照号码、在留卡号码、密码等个人敏感信息。
          </p>
        </div>
        <button
          type="button"
          onClick={onSubmit}
          disabled={isDisabled}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-[#0b3a6f] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#082d58] disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          <Send size={17} aria-hidden="true" />
          {isLoading ? "发送中" : "发送"}
        </button>
      </div>
    </div>
  );
}
