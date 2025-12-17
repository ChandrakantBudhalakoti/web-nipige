'use client';

export default function NewsletterForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form className="flex flex-col sm:flex-row gap-3" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Enter your email"
        className="flex-1 input input-bordered bg-white text-neutral rounded-full px-6 placeholder-base-content/50 focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Email address for newsletter"
      />
      <button
        type="submit"
        className="btn btn-accent bg-white text-primary hover:bg-white/90 rounded-full font-semibold focus:outline-none focus:ring-2 focus:ring-white/50"
      >
        Subscribe
      </button>
    </form>
  );
}
