const RESTAURANTS = [
  {
    img: "/images/solutions/food/pizza.webp",
    name: "Tony's Pizzeria",
    meta: "⭐ 4.8 · 25-30 min",
    grad: "#EA580C",
  },
  {
    img: "/images/solutions/food/burger.jpg",
    name: "Burger Junction",
    meta: "⭐ 4.6 · 15-20 min",
    grad: "#D97706",
  },
  {
    img: "/images/solutions/food/sushi.webp",
    name: "Sakura Sushi",
    meta: "⭐ 4.9 · 30-35 min",
    grad: "#059669",
  },
];

/** Illustrated food-delivery app UI - stands in for a product screenshot without needing a real photo. */
export function FoodAppMockup() {
  return (
    <div className="app-mock">
      <div className="app-mock-bar">
        <span className="app-mock-dot" style={{ background: "#EF4444" }} />
        <span className="app-mock-dot" style={{ background: "#F59E0B" }} />
        <span className="app-mock-dot" style={{ background: "#22C55E" }} />
        <span className="app-mock-favicon" aria-hidden="true">
          <span className="app-mock-favicon-topping" />
          <span className="app-mock-favicon-topping" />
          <span className="app-mock-favicon-topping" />
        </span>
        <span className="app-mock-url">/restaurant</span>
      </div>
      <div className="app-mock-body">
        <div className="app-mock-header">
          <span className="app-mock-logo">🍕 Nipige Eats</span>
          <span className="app-mock-search">🔍 Search restaurants…</span>
        </div>
        <div className="app-mock-restaurants">
          {RESTAURANTS.map((r) => (
            <div key={r.name} className="app-mock-card">
              <div className="app-mock-card-img" style={{ background: r.grad }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={r.img} alt={r.name} loading="lazy" width={200} height={200} />
              </div>
              <div className="app-mock-card-name">{r.name}</div>
              <div className="app-mock-card-meta">{r.meta}</div>
            </div>
          ))}
        </div>
        <div className="app-mock-cart">
          <span className="app-mock-cart-items">🛒 3 items · $34.50</span>
          <span className="app-mock-cart-btn">Checkout →</span>
        </div>
      </div>
    </div>
  );
}
