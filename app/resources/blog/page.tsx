import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import NewsletterForm from '@/app/components/NewsletterForm';
import Link from 'next/link';
import { blogPosts } from '@/app/lib/blog-data';

export const metadata = {
  title: 'Blog | Nipige - Digital Commerce Insights',
  description: 'Explore articles, guides, and insights on digital commerce, e-enablement, and business growth strategies.',
};

const categories = ['All', 'Trends', 'Development', 'Strategy', 'Technical', 'Growth', 'Analytics'];

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="bg-white">
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-b from-primary/10 to-white">
          <div className="container-max">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="mb-6">Resources & Insights</h1>
              <p className="text-lg text-base-content/80 leading-relaxed">
                Stay informed with our latest articles, guides, and best practices for digital commerce success.
              </p>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="section-padding border-b border-base-300">
          <div className="container-max">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                    category === 'All'
                      ? 'bg-primary text-white'
                      : 'bg-base-200 text-neutral hover:bg-primary hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Post */}
        <section className="section-padding">
          <div className="container-max">
            <article className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl border border-base-300 overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="flex items-center justify-center p-8 sm:p-12 bg-gradient-to-br from-primary/10 to-accent/10">
                  <div className="text-8xl">{blogPosts[0].image}</div>
                </div>
                <div className="p-8 sm:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="badge badge-primary">{blogPosts[0].category}</span>
                    <span className="text-sm text-base-content/60">{blogPosts[0].readTime}</span>
                  </div>
                  <h2 className="mb-4">{blogPosts[0].title}</h2>
                  <p className="text-base-content/80 leading-relaxed mb-6">{blogPosts[0].excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-base-content/60">
                      <p className="font-medium text-base-content">{blogPosts[0].author}</p>
                      <p>{blogPosts[0].date}</p>
                    </div>
                    <Link
                      href={`/resources/blog/${blogPosts[0].id}`}
                      className="btn btn-primary rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      Read Article
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="section-padding bg-base-100">
          <div className="container-max">
            <h2 className="mb-12">Latest Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.slice(1).map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-lg border border-base-300 overflow-hidden hover:shadow-lg hover:border-primary transition-all duration-300 flex flex-col focus-within:ring-2 focus-within:ring-primary"
                >
                  <div className="h-48 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center border-b border-base-300">
                    <div className="text-6xl">{post.image}</div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-3">
                      <span className="badge badge-outline text-xs">{post.category}</span>
                      <span className="text-xs text-base-content/60">{post.readTime}</span>
                    </div>
                    <h3 className="font-bold text-neutral mb-3 line-clamp-2">{post.title}</h3>
                    <p className="text-base-content/70 text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="pt-4 border-t border-base-300 flex items-center justify-between">
                      <div className="text-xs text-base-content/60">
                        <p className="font-medium text-base-content/80">{post.author}</p>
                        <p>{post.date}</p>
                      </div>
                    </div>
                    <Link
                      href={`/resources/blog/${post.id}`}
                      className="mt-4 text-primary font-semibold hover:text-primary-focus transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:rounded"
                    >
                      Read More →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="section-padding bg-gradient-to-r from-primary to-accent text-white">
          <div className="container-max max-w-2xl mx-auto text-center">
            <h2 className="text-white mb-4">Stay Updated</h2>
            <p className="text-white/90 text-lg mb-8">
              Subscribe to our newsletter for the latest insights and best practices in digital commerce.
            </p>
            <NewsletterForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
