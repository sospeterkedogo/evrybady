import React from "react";

// Dummy articles data
const articles = [
  {
    id: 1,
    title: "Welcome to Evrybady Digital",
    date: "2026-05-30",
    content: "Discover our latest updates and strategies for your brand.",
    comments: [
      { user: "Jane", text: "Great article!" },
      { user: "John", text: "Very insightful." },
    ],
    reactions: { like: 5, love: 2 },
  },
  {
    id: 2,
    title: "How to Grow Your Brand Online",
    date: "2026-05-28",
    content: "Tips and tricks for digital growth in 2026.",
    comments: [],
    reactions: { like: 2, love: 1 },
  },
];

export default function ArticlesPage() {
  // Sort articles by latest
  const sortedArticles = [...articles].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-[#0a1e0a]">Articles</h1>
      {sortedArticles.map((article) => (
        <article key={article.id} className="mb-10 p-6 rounded-xl bg-white shadow border border-[#806500]/10">
          <h2 className="text-2xl font-semibold mb-2 text-[#806500]">{article.title}</h2>
          <div className="text-sm text-gray-500 mb-4">{article.date}</div>
          <p className="mb-4 text-[#0a1e0a]">{article.content}</p>
          <div className="flex items-center gap-4 mb-2">
            <span className="flex items-center gap-1 cursor-pointer select-none">
              👍 <span>{article.reactions.like}</span>
            </span>
            <span className="flex items-center gap-1 cursor-pointer select-none">
              ❤️ <span>{article.reactions.love}</span>
            </span>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold mb-2 text-[#0a1e0a]">Comments</h3>
            <ul className="mb-2">
              {article.comments.length === 0 && <li className="text-gray-400">No comments yet.</li>}
              {article.comments.map((c, i) => (
                <li key={i} className="mb-1 text-[#0a1e0a]"><b>{c.user}:</b> {c.text}</li>
              ))}
            </ul>
            <form className="flex gap-2">
              <input type="text" placeholder="Add a comment..." className="flex-1 border rounded px-2 py-1" disabled />
              <button type="submit" className="bg-[#806500] text-white px-4 py-1 rounded" disabled>Post</button>
            </form>
            <div className="text-xs text-gray-400 mt-1">(Demo: Comments/reactions not interactive)</div>
          </div>
        </article>
      ))}
    </div>
  );
}
