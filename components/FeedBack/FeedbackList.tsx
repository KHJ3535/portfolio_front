"use client";

import React, { useState } from "react";

interface Feedback {
  id: number;
  author: string;
  content: string;
  createdAT: string;
}

interface FeedbackListProps {
  feedbacks?: Feedback[];
}

const FeedbackList: React.FC<FeedbackListProps> = ({ feedbacks = [] }) => {
  const [expandedReplies, setExpandedReplies] = useState<number[]>([]);

  const toggleReplies = (id: number) => {
    setExpandedReplies((prev) =>
      prev.includes(id)
        ? prev.filter((entryId) => entryId !== id)
        : [...prev, id]
    );
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = date.getHours();
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const ampm = hours < 12 ? "오전" : "오후";
      const hour12 = hours % 12 || 12;

      return `${year}.${month}.${day} ${ampm} ${hour12}:${minutes}`;
    } catch (error) {
      return "날짜 정보 없음";
    }
  };

  const renderEntry = (entry: Feedback, isReply = false) => {
    if (!entry || !entry.id) return null;

    return (
      <div
        key={`feedback-${entry.id}`}
        className={`border-b border-gray-700/50 last:border-b-0 ${
          isReply ? "bg-gray-700/30" : ""
        }`}
      >
        <div className="grid grid-cols-12 gap-2 sm:gap-4 p-2 sm:p-4 items-center text-sm sm:text-base">
          <div className="col-span-1 text-center text-gray-400">{entry.id}</div>
          <div className="col-span-3 sm:col-span-2 text-center text-white">
            {entry.author}
          </div>
          <div className="col-span-5">
            <p className="text-gray-300 line-clamp-2 sm:line-clamp-none">
              {entry.content}
            </p>
          </div>
          <div className="col-span-4 text-center text-gray-400 whitespace-nowrap">
            {formatDate(entry.createdAT)}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="divide-y divide-gray-700/50">
      {feedbacks.length > 0 ? (
        feedbacks.map((feedback) => renderEntry(feedback))
      ) : (
        <div className="p-4 text-center text-gray-400 text-sm sm:text-base">
          등록된 피드백이 없습니다.
        </div>
      )}
    </div>
  );
};

export default FeedbackList;
