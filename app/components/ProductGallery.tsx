interface Product {
  id: number;
  title: string;
  image: string;
  category: string;
}

const products: Product[] = [
  {
    id: 1,
    title: 'Multi-Merchant Market',
    image: 'https://images.unsplash.com/photo-1460925895917-aeb19be489c7?w=400&h=300&fit=crop',
    category: 'Marketplace',
  },
  {
    id: 2,
    title: 'Omni Channel Integration',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
    category: 'Integration',
  },
  {
    id: 3,
    title: 'Tailor Made Workflow',
    image: 'https://images.unsplash.com/photo-1460925895917-aeb19be489c7?w=400&h=300&fit=crop',
    category: 'Customization',
  },
  {
    id: 4,
    title: 'Progressive Web App',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop',
    category: 'Technology',
  },
  {
    id: 5,
    title: 'Round The Clock Support',
    image: 'https://images.unsplash.com/photo-1553721032-f6b0eb3786c7?w=400&h=300&fit=crop',
    category: 'Support',
  },
  {
    id: 6,
    title: 'Advanced Analytics',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    category: 'Analytics',
  },
];

export default function ProductGallery() {
  return (
    <section className="section-padding bg-base-100" aria-label="Products and solutions gallery">
      <div className="container-max">
        <h2 className="text-center mb-12">Our Solutions & Services</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group cursor-pointer overflow-hidden rounded-lg border border-base-300 hover:shadow-xl transition-all duration-300 bg-white">
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300" />
      </div>
      <div className="p-4">
        <span className="text-xs font-semibold text-primary uppercase">{product.category}</span>
        <h3 className="font-bold text-neutral mt-2">{product.title}</h3>
        <div className="mt-4">
          <button className="btn btn-primary btn-sm btn-outline rounded-full w-full">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}
