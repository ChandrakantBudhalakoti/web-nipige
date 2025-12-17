import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Link from 'next/link';
import { blogPosts, getBlogPost } from '@/app/lib/blog-data';
import { notFound } from 'next/navigation';

interface BlogPostPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    id: post.id,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { id } = await params;
  const post = getBlogPost(id);

  if (!post) {
    return {
      title: 'Post Not Found | Nipige',
    };
  }

  return {
    title: `${post.title} | Nipige Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = await params;
  const post = getBlogPost(id);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts.filter((p) => p.id !== id).slice(0, 3);

  return (
    <>
      <Header />
      <main className="bg-white">
        {/* Breadcrumb */}
        <section className="border-b border-base-300">
          <div className="container-max py-4">
            <nav className="flex items-center gap-2 text-sm" aria-label="Breadcrumb">
              <Link href="/resources/blog" className="text-primary hover:text-primary-focus transition-colors">
                Blog
              </Link>
              <span className="text-base-content/50">/</span>
              <span className="text-base-content/70">{post.title}</span>
            </nav>
          </div>
        </section>

        {/* Article Header */}
        <section className="section-padding bg-gradient-to-b from-primary/5 to-transparent">
          <div className="container-max max-w-3xl mx-auto">
            <div className="mb-6 flex items-center gap-3">
              <span className="badge badge-primary">{post.category}</span>
              <span className="text-sm text-base-content/60">{post.readTime}</span>
            </div>
            <h1 className="mb-6">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-6 text-sm text-base-content/70 border-t border-base-300 pt-6">
              <div>
                <p className="font-medium text-base-content mb-1">{post.author}</p>
                <p>{post.date}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="section-padding">
          <div className="container-max max-w-3xl mx-auto">
            <div className="w-full h-64 sm:h-96 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center border border-base-300">
              <div className="text-9xl">{post.image}</div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="section-padding">
          <div className="container-max max-w-3xl mx-auto">
            <article className="prose prose-invert max-w-none text-base-content leading-relaxed space-y-6">
              {post.content.split('\n\n').map((paragraph, index) => {
                if (paragraph.startsWith('##')) {
                  return (
                    <h2 key={index} className="text-2xl sm:text-3xl font-bold text-neutral mt-8 mb-4">
                      {paragraph.replace('## ', '')}
                    </h2>
                  );
                }
                if (paragraph.startsWith('###')) {
                  return (
                    <h3 key={index} className="text-xl font-bold text-neutral mt-6 mb-3">
                      {paragraph.replace('### ', '')}
                    </h3>
                  );
                }
                if (paragraph.startsWith('-')) {
                  return (
                    <ul key={index} className="list-disc list-inside space-y-2 text-base-content/80">
                      {paragraph.split('\n').map((item, itemIndex) => (
                        <li key={itemIndex}>{item.replace('- ', '')}</li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p key={index} className="text-base-content/80 leading-relaxed">
                    {paragraph}
                  </p>
                );
              })}
            </article>

            {/* Article Footer */}
            <div className="mt-12 pt-8 border-t border-base-300">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <p className="text-sm text-base-content/60 mb-2">About the Author</p>
                  <p className="font-medium text-neutral">{post.author}</p>
                </div>
                <div className="flex gap-2">
                  <button className="btn btn-outline btn-sm rounded-full focus:outline-none focus:ring-2 focus:ring-primary">
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section className="section-padding bg-base-100">
            <div className="container-max">
              <h2 className="mb-12">Related Articles</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <article
                    key={relatedPost.id}
                    className="bg-white rounded-lg border border-base-300 overflow-hidden hover:shadow-lg hover:border-primary transition-all duration-300"
                  >
                    <div className="h-40 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center border-b border-base-300">
                      <div className="text-5xl">{relatedPost.image}</div>
                    </div>
                    <div className="p-6 flex flex-col">
                      <span className="badge badge-outline text-xs mb-3">{relatedPost.category}</span>
                      <h3 className="font-bold text-neutral mb-2 line-clamp-2">{relatedPost.title}</h3>
                      <p className="text-base-content/70 text-sm leading-relaxed mb-4 flex-grow line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                      <Link
                        href={`/resources/blog/${relatedPost.id}`}
                        className="text-primary font-semibold hover:text-primary-focus transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:rounded"
                      >
                        Read More →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Back to Blog CTA */}
        <section className="section-padding text-center border-t border-base-300">
          <div className="container-max">
            <h2 className="mb-6">Explore More Articles</h2>
            <p className="text-base-content/80 mb-8 max-w-2xl mx-auto">
              Discover more insights and best practices from our blog.
            </p>
            <Link
              href="/resources/blog"
              className="btn btn-primary rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Back to Blog
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
