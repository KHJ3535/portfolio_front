"use client";

import { useState, useEffect } from "react";
import { Feedback, createFeedback, getFeedbacks } from "../../utils/feedback";
import { FaPen } from "react-icons/fa";
import FeedbackList from "./components/FeedbackList";
import FeedbackForm from "./components/FeedbackForm";

export default function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    loadFeedbacks();
  }, []);

  const loadFeedbacks = async () => {
    try {
      const data = await getFeedbacks();
      setFeedbacks(data);
    } catch (error) {
      console.error("Failed to load feedbacks:", error);
    }
  };

  // 현재 페이지의 피드백만 반환하는 함수
  const getCurrentPageFeedbacks = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return feedbacks.slice(startIndex, endIndex);
  };

  // 총 페이지 수 계산
  const totalPages = Math.ceil(feedbacks.length / ITEMS_PER_PAGE);

  const handleSubmit = async (data: { name: string; content: string }) => {
    setIsLoading(true);
    try {
      const newFeedback = await createFeedback(data);
      if (newFeedback) {
        await loadFeedbacks();
        setShowForm(false);
        setCurrentPage(1); // 새 글 작성 후 첫 페이지로 이동
      }
    } catch (error) {
      console.error("Failed to create feedback:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#2a2a2a] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-6xl font-bold text-center mb-16 text-white mt-16">
          피드백
        </h1>

        <div>
          {/* 게시판 헤더 */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-t-2xl p-4 border border-gray-700/50">
            <div className="grid grid-cols-12 gap-4 text-gray-300 font-medium">
              <div className="col-span-1 text-center">번호</div>
              <div className="col-span-2 text-center">작성자</div>
              <div className="col-span-5 text-center">내용</div>
              <div className="col-span-4 text-center">작성일</div>
            </div>
          </div>

          {/* 게시판 본문 */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-b-2xl border border-gray-700/50 border-t-0">
            <FeedbackList feedbacks={getCurrentPageFeedbacks()} />
          </div>

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <div className="mt-6 flex justify-center">
              <div className="flex gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === 1
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  } text-white transition-colors`}
                >
                  이전
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-4 py-2 rounded-lg ${
                        currentPage === page
                          ? "bg-indigo-600"
                          : "bg-gray-700 hover:bg-gray-600"
                      } text-white transition-colors`}
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === totalPages
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  } text-white transition-colors`}
                >
                  다음
                </button>
              </div>
            </div>
          )}

          {/* 작성 버튼 */}
          <div className="flex justify-end mt-6">
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-lg shadow-lg hover:from-indigo-700 hover:to-indigo-600 transition-all duration-300"
            >
              <FaPen className="w-5 h-5" />
              <span>{showForm ? "닫기" : "글쓰기"}</span>
            </button>
          </div>
        </div>

        {/* 작성 폼 모달 */}
        {showForm && (
          <div className="fixed inset-0 z-50">
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowForm(false)}
            />
            <div className="relative min-h-screen flex items-center justify-center p-4">
              <div className="bg-gray-800/90 rounded-2xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-white mb-6">
                  피드백 작성
                </h2>
                <FeedbackForm
                  onSubmit={handleSubmit}
                  onClose={() => setShowForm(false)}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
