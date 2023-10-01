import React, { useEffect, useState } from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useBoardStore } from "@/store/BoardStore";
import fetchSuggestion from "@/lib/fetchSuggestion";

function TaskSummary() {
  const [board] = useBoardStore((state) => [state.board]);

  const [loading, setLoading] = useState<boolean>(false);
  const [suggestion, setSuggestion] = useState<string>("");

  useEffect(() => {
    if (board.columns.size === 0) return;
    setLoading(true);

    const fetchSuggestionFunc = async () => {
      const suggestion = await fetchSuggestion(board);
      setSuggestion(suggestion);
      setLoading(false);
    };
    fetchSuggestionFunc();
  }, [board]);

  return (
    <div className="flex items-center justify-center px-4 py-2 md:py-4">
      <p className="flex items-center text-sm font-light py-3 px-5 rounded-lg shadow-xl bg-white italic text-[#0055D1]">
        <UserCircleIcon
          className={`inline-block h-10 w-10 text-[#0055D1] mr-1
      ${loading && "animate-spin"}`}
        />
        {suggestion && !loading
          ? suggestion
          : "GPT is summarising your tasks for the day..."}
      </p>
    </div>
  );
}

export default TaskSummary;
