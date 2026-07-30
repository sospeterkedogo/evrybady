import { NextResponse } from 'next/server';

const articles = [
  {
    id: '1',
    title: 'Welcome to Evrybady Digital',
    date: '2026-05-30',
    content: 'Discover our latest updates and strategies for your brand.',
    comments: [{ user: 'Jane', text: 'Great article!' }],
    reactions: { like: 5, love: 2 },
  },
  {
    id: '2',
    title: 'How to Grow Your Brand Online',
    date: '2026-05-28',
    content: 'Tips and tricks for digital growth in 2026.',
    comments: [],
    reactions: { like: 2, love: 1 },
  },
];

export async function GET() {
  return NextResponse.json(articles);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const title = typeof body?.title === 'string' ? body.title.trim() : '';
    const content = typeof body?.content === 'string' ? body.content.trim() : '';

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required.' }, { status: 400 });
    }

    const article = {
      id: `${Date.now()}`,
      title,
      date: new Date().toISOString().slice(0, 10),
      content,
      comments: [],
      reactions: { like: 0, love: 0 },
    };

    articles.unshift(article);
    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    console.error('Article create error', error);
    return NextResponse.json({ error: 'Unable to create article.' }, { status: 500 });
  }
}
