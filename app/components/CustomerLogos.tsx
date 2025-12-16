interface Customer {
  id: number;
  name: string;
  logo: string;
}

const customers: Customer[] = [
  {
    id: 1,
    name: 'Seybazor',
    logo: 'https://via.placeholder.com/150x80?text=Seybazor',
  },
  {
    id: 2,
    name: 'Musika',
    logo: 'https://via.placeholder.com/150x80?text=Musika',
  },
  {
    id: 3,
    name: 'LIRS',
    logo: 'https://via.placeholder.com/150x80?text=LIRS',
  },
  {
    id: 4,
    name: 'DP World Lions',
    logo: 'https://via.placeholder.com/150x80?text=DP+World',
  },
  {
    id: 5,
    name: 'Kupasa',
    logo: 'https://via.placeholder.com/150x80?text=Kupasa',
  },
  {
    id: 6,
    name: 'Global Partners',
    logo: 'https://via.placeholder.com/150x80?text=Partners',
  },
];

export default function CustomerLogos() {
  return (
    <section className="section-padding bg-base-200" aria-label="Customer logos gallery">
      <div className="container-max">
        <h2 className="text-center mb-12">Our Esteemed Customers</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center justify-items-center" role="list">
          {customers.map((customer) => (
            <div
              key={customer.id}
              className="w-full h-20 bg-white rounded-lg border border-base-300 flex items-center justify-center p-4 hover:shadow-md transition-shadow duration-300 focus-within:ring-2 focus-within:ring-primary"
              role="listitem"
            >
              <img
                src={customer.logo}
                alt={`${customer.name} company logo`}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
