'use client';

import { useEffect, useState } from 'react';

type Article = {
  id: string;
  title: string;
  date: string;
  content: string;
  comments: Array<{ user: string; text: string }>;
  reactions: { like: number; love: number };
};

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/articles')
      .then((response) => response.json())
      .then((data) => setArticles(Array.isArray(data) ? data : []))
      .catch(() => setArticles([]));
  }, []);

  async function handleCreateArticle(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('saving');
    setMessage('');

    try {
      const response = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Unable to publish article.');
      }

      setArticles((current) => [data, ...current]);
      setTitle('');
      setContent('');
      setStatus('success');
      setMessage('Article published.');
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Unable to publish article.');
    }
  }

  const sortedArticles = [...articles].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <main className="min-h-screen bg-surface text-white">
      <div className="mx-auto max-w-3xl px-6 sm:px-8">

        {/* Hero */}
        <section className="flex min-h-[50vh] items-center py-24 lg:py-32">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-brand">News & insights</p>
            <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl">Articles</h1>
          </div>
        </section>

        <section className="pb-8">
          <div className="rounded-2xl border border-white/10 bg-surface-alt p-6">
            <h2 className="text-xl font-semibold text-white">Publish an article</h2>
            <p className="mt-2 text-sm text-white/60">Share a new update with your audience.</p>
            <form onSubmit={handleCreateArticle} className="mt-6 space-y-4">
              <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Article title" className="w-full rounded-xl border border-white/10 bg-surface px-4 py-3 text-white outline-none placeholder:text-white/40" />
              <textarea value={content} onChange={(event) => setContent(event.target.value)} rows={5} placeholder="Write your article here..." className="w-full rounded-xl border border-white/10 bg-surface px-4 py-3 text-white outline-none placeholder:text-white/40" />
              <button type="submit" disabled={status === 'saving'} className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-surface disabled:opacity-70">{status === 'saving' ? 'Publishing...' : 'Publish article'}</button>
            </form>
            {message ? <p className={`mt-3 text-sm ${status === 'success' ? 'text-brand' : 'text-rose-300'}`}>{message}</p> : null}
          </div>
        </section>

        {/* Articles list */}
        <section className="pb-24 lg:pb-32 space-y-8">
          {sortedArticles.map((article) => (
            <article key={article.id} className="p-8 rounded-2xl bg-surface-alt border border-white/10 shadow-xl shadow-black/19">
              <h2 className="text-2xl font-semibold text-brand">{article.title}</h2>
              <div className="text-sm text-white/50 mt-2">{article.date}</div>
              <p className="mt-4 text-white/80 leading-7">{article.content}</p>
              <div className="flex items-center gap-4 mt-5">
                <span className="flex items-center gap-1 cursor-pointer select-none">
                  👍 <span>{article.reactions.like}</span>
                </span>
                <span className="flex items-center gap-1 cursor-pointer select-none">
                  ❤️ <span>{article.reactions.love}</span>
                </span>
              </div>
              <div className="mt-6">
                <h3 className="font-semibold text-white">Comments</h3>
                <ul className="mt-3 space-y-2">
                  {article.comments.length === 0 && <li className="text-white/40">No comments yet.</li>}
                  {article.comments.map((c, i) => (
                    <li key={i} className="text-white/70"><b className="text-white/90">{c.user}:</b> {c.text}</li>
                  ))}
                </ul>
                <form className="flex gap-3 mt-4">
                  <label htmlFor="comment-input" className="sr-only">Add a comment</label>
                  <input id="comment-input" type="text" placeholder="Add a comment..." className="flex-1 border border-white/10 bg-surface rounded-xl px-4 py-3 text-white" disabled />
                  <button type="submit" className="bg-brand text-surface px-6 py-3 rounded-xl text-sm font-semibold" disabled>Post</button>
                </form>
                <div className="text-xs text-white/40 mt-2">(Demo: Comments/reactions not interactive)</div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
