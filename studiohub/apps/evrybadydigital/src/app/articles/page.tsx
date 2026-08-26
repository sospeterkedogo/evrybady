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
    <main className="min-h-screen bg-white text-ink">
      <div className="mx-auto max-w-3xl px-6 sm:px-8">

        {/* Hero */}
        <section className="flex min-h-[50vh] items-center py-24 lg:py-32">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-brand">News & insights</p>
            <h1 className="mt-5 text-4xl font-bold text-ink sm:text-5xl">Articles</h1>
          </div>
        </section>

        <section className="pb-8">
          <div className="rounded-3xl border border-gray-200 bg-surface-alt p-8">
            <h2 className="text-xl font-semibold text-ink">Publish an article</h2>
            <p className="mt-2 text-sm text-ink-muted">Share a new update with your audience.</p>
            <form onSubmit={handleCreateArticle} className="mt-7 space-y-5">
              <div>
                <label htmlFor="article-title" className="sr-only">Article title</label>
                <input id="article-title" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Article title" className="w-full rounded-xl border border-gray-300 bg-white px-5 py-3.5 text-ink outline-none placeholder:text-ink-faint focus:border-brand" />
              </div>
              <div>
                <label htmlFor="article-content" className="sr-only">Article content</label>
                <textarea id="article-content" value={content} onChange={(event) => setContent(event.target.value)} rows={5} placeholder="Write your article here..." className="w-full rounded-xl border border-gray-300 bg-white px-5 py-3.5 text-ink outline-none placeholder:text-ink-faint focus:border-brand" />
              </div>
              <button type="submit" disabled={status === 'saving'} className="rounded-full bg-brand px-7 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark disabled:opacity-60">{status === 'saving' ? 'Publishing...' : 'Publish article'}</button>
            </form>
            {message ? <p role="status" className={`mt-4 text-sm font-medium ${status === 'success' ? 'text-emerald-700' : 'text-rose-700'}`}>{message}</p> : null}
          </div>
        </section>

        {/* Articles list */}
        <section className="pb-24 lg:pb-32 space-y-8">
          {sortedArticles.map((article) => (
            <article key={article.id} className="p-8 rounded-3xl bg-surface-alt border border-gray-200 shadow-sm">
              <h2 className="text-2xl font-semibold text-ink">{article.title}</h2>
              <div className="text-sm text-ink-faint mt-2.5">{article.date}</div>
              <p className="mt-4 text-ink-muted leading-7">{article.content}</p>
              <div className="flex items-center gap-5 mt-6">
                <span className="flex items-center gap-1.5 text-ink-muted" aria-label={`${article.reactions.like} likes`}>
                  <span aria-hidden="true">👍</span> <span>{article.reactions.like}</span>
                </span>
                <span className="flex items-center gap-1.5 text-ink-muted" aria-label={`${article.reactions.love} loves`}>
                  <span aria-hidden="true">❤️</span> <span>{article.reactions.love}</span>
                </span>
              </div>
              <div className="mt-7">
                <h3 className="font-semibold text-ink">Comments</h3>
                <ul className="mt-3 space-y-2">
                  {article.comments.length === 0 && <li className="text-ink-faint">No comments yet.</li>}
                  {article.comments.map((c, i) => (
                    <li key={i} className="text-ink-muted"><b className="text-ink">{c.user}:</b> {c.text}</li>
                  ))}
                </ul>
                <form className="flex gap-3 mt-5">
                  <label htmlFor="comment-input" className="sr-only">Add a comment</label>
                  <input id="comment-input" type="text" placeholder="Add a comment..." className="flex-1 border border-gray-300 bg-white rounded-xl px-4 py-3 text-ink placeholder:text-ink-faint" disabled />
                  <button type="submit" className="bg-brand text-white px-6 py-3 rounded-xl text-sm font-semibold" disabled>Post</button>
                </form>
                <div className="text-xs text-ink-faint mt-2.5">(Demo: Comments/reactions not interactive)</div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
