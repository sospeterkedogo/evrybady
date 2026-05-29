import * as React from 'react';
import { submitContact } from '../../services/contact';
import { Heading, Body } from '../../design-system/typography';

export default function ContactPage() {
  const [form, setForm] = React.useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await submitContact(form);
      setSuccess(true);
      setForm({ name: '', email: '', message: '' });
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-16 px-4">
      <Heading level={1} className="mb-8 text-[--color-primary]">Contact Us</Heading>
      <Body className="mb-6 text-white">Fill out the form below and our team will get back to you soon.</Body>
      <form onSubmit={handleSubmit} className="space-y-6 bg-[--color-surface] p-6 rounded-lg border border-[--color-border]">
        <div>
          <label className="block text-[--color-secondary] mb-1 font-semibold">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded border border-[--color-border] bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-[--color-primary]"
          />
        </div>
        <div>
          <label className="block text-[--color-secondary] mb-1 font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded border border-[--color-border] bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-[--color-primary]"
          />
        </div>
        <div>
          <label className="block text-[--color-secondary] mb-1 font-semibold">Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-3 py-2 rounded border border-[--color-border] bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-[--color-primary]"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 rounded bg-[--color-primary] text-white font-bold hover:bg-[--color-secondary] transition-colors disabled:opacity-60"
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>
        {success && <div className="text-green-500 font-semibold">Thank you! We have received your message.</div>}
        {error && <div className="text-red-500 font-semibold">{error}</div>}
      </form>
    </div>
  );
}