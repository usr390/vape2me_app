"use client";

import { useMemo, useState } from "react";
import { products, Product } from "../data/products";

const DELIVERY_FEE = 7.5;
const MINIMUM_ORDER = 19.99;
const TAX_RATE = 0.0825;

type CartItem = Product & {
  cartKey: string;
  selectedFlavor: string;
  qty: number;
};

type Customer = {
  name: string;
  phone: string;
  address: string;
  notes: string;
};

const emptyCustomer: Customer = { name: "", phone: "", address: "", notes: "" };
const money = (value: number) =>
  value.toLocaleString("en-US", { style: "currency", currency: "USD" });

export default function Home() {
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Disposable");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customer, setCustomer] = useState<Customer>(emptyCustomer);
  const [flavorProduct, setFlavorProduct] = useState<Product | null>(null);
  const [mobileCartOpen, setMobileCartOpen] = useState(false);

  const categories = useMemo(
    () => [...new Set(products.map((product) => product.category))],
    []
  );

  const visibleProducts = useMemo(
    () => products.filter((product) => product.category === selectedCategory),
    [selectedCategory]
  );

  const brands = useMemo(
    () => [...new Set(visibleProducts.map((product) => product.brand))],
    [visibleProducts]
  );

  const totals = useMemo(() => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const tax = subtotal * TAX_RATE;
    const deliveryFee = subtotal > 0 ? DELIVERY_FEE : 0;
    return { subtotal, tax, deliveryFee, total: subtotal + tax + deliveryFee };
  }, [cart]);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  function addToCart(product: Product, flavor: string) {
    const cartKey = `${product.id}-${flavor}`;

    setCart((currentCart) => {
      const existing = currentCart.find((item) => item.cartKey === cartKey);

      if (existing) {
        return currentCart.map((item) =>
          item.cartKey === cartKey
            ? { ...item, qty: Math.min(item.qty + 1, product.stock) }
            : item
        );
      }

      return [...currentCart, { ...product, cartKey, selectedFlavor: flavor, qty: 1 }];
    });

    setFlavorProduct(null);
  }

  function changeQty(cartKey: string, amount: number) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.cartKey === cartKey
            ? { ...item, qty: Math.min(item.stock, item.qty + amount) }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  }

  function removeFromCart(cartKey: string) {
    setCart((currentCart) => currentCart.filter((item) => item.cartKey !== cartKey));
  }

  function requestOrder() {
    if (cart.length === 0) {
      alert("Add at least one product first.");
      return;
    }

    if (totals.subtotal < MINIMUM_ORDER) {
      alert(`Minimum order is ${money(MINIMUM_ORDER)} before delivery.`);
      return;
    }

    if (!customer.name.trim() || !customer.phone.trim() || !customer.address.trim()) {
      alert("Please enter your name, phone, and delivery address.");
      return;
    }

    const orderLines = cart
      .map((item) => `${item.qty}x ${item.brand} ${item.model} - ${item.selectedFlavor}`)
      .join("\n");

    alert(
      `Order request received!\n\n${orderLines}\n\nTotal: ${money(
        totals.total
      )}\n\nNext MVP step: send this to SMS, email, or a backend.`
    );

    setCart([]);
    setCustomer(emptyCustomer);
    setMobileCartOpen(false);
  }

  if (!ageConfirmed) {
    return <AgeGate onConfirm={() => setAgeConfirmed(true)} />;
  }

  return (
    <div className="app-shell">
      <Header />

      <main className="container">
        <Hero />

        <div className="layout-grid">
          <section>
            <CategoryFilters
              categories={categories}
              selectedCategory={selectedCategory}
              onSelect={setSelectedCategory}
            />

            <div className="product-grid">
              {brands.map((brand) => {
                const brandProducts = visibleProducts.filter((product) => product.brand === brand);
                return (
                  <BrandSection
                    key={brand}
                    brand={brand}
                    products={brandProducts}
                    onChooseFlavor={setFlavorProduct}
                  />
                );
              })}
            </div>
          </section>

          <aside className="desktop-cart">
            <Cart
              cart={cart}
              totals={totals}
              customer={customer}
              setCustomer={setCustomer}
              onChangeQty={changeQty}
              onRemove={removeFromCart}
              onSubmit={requestOrder}
            />
          </aside>
        </div>
      </main>

      <button className="bottom-cart-bar" onClick={() => setMobileCartOpen(true)}>
        <span>View order</span>
        <span>
          {cartCount} items · {money(totals.total)}
        </span>
      </button>

      {mobileCartOpen && (
        <div className="sheet-backdrop" onClick={() => setMobileCartOpen(false)}>
          <aside className="mobile-sheet" onClick={(event) => event.stopPropagation()}>
            <div className="sheet-header">
              <h2>Your order</h2>
              <button className="icon-btn" onClick={() => setMobileCartOpen(false)}>×</button>
            </div>
            <Cart
              cart={cart}
              totals={totals}
              customer={customer}
              setCustomer={setCustomer}
              onChangeQty={changeQty}
              onRemove={removeFromCart}
              onSubmit={requestOrder}
            />
          </aside>
        </div>
      )}

      {flavorProduct && (
        <FlavorModal
          product={flavorProduct}
          onClose={() => setFlavorProduct(null)}
          onSelectFlavor={addToCart}
        />
      )}
    </div>
  );
}

function AgeGate({ onConfirm }: { onConfirm: () => void }) {
  return (
    <main className="age-screen">
      <section className="age-panel">
        <div className="checkmark">✓</div>
        <h1 className="logo display">Vape2Me</h1>
        <p className="muted">This demo is intended only for adults 21+. Please confirm your age to continue.</p>
        <button className="btn-accent full" onClick={onConfirm}>I am 21 or older</button>
        <p className="small-note">Real launch requires legal review, licensing, ID verification, and local compliance checks.</p>
      </section>
    </main>
  );
}

function Header() {
  return (
    <header className="topbar">
      <div className="container header-inner">
        <div>
          <div className="logo brand-logo">Vape2Me</div>
          <div className="small muted">Local 21+ delivery MVP</div>
        </div>
        <div className="age-badge">21+ only</div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero">
      <p className="eyebrow">Fast local delivery | Mercedes · Weslaco · Donna</p>
      <h1>Browse. Verify. Get delivery.</h1>
      <p className="lead muted">A lean MVP for local vape delivery requests with products, cart totals, customer info, and ID-verification notes.</p>
    </section>
  );
}

function CategoryFilters({ categories, selectedCategory, onSelect }: { categories: string[]; selectedCategory: string; onSelect: (category: string) => void; }) {
  return (
    <div className="category-filters">
      {categories.map((category) => (
        <button key={category} className={`btn-soft ${category === selectedCategory ? "active" : ""}`} onClick={() => onSelect(category)}>
          {category}s
        </button>
      ))}
    </div>
  );
}

function BrandSection({ brand, products, onChooseFlavor }: { brand: string; products: Product[]; onChooseFlavor: (product: Product) => void; }) {
  function scroll(direction: number) {
    document.getElementById(`carousel-${brand}`)?.scrollBy({ left: direction * 320, behavior: "smooth" });
  }

  return (
    <section className="brand-section">
      <div className="brand-header">
        <h2>{brand}</h2>
        <div className="arrow-group">
          <button className="carousel-arrow" onClick={() => scroll(-1)}>‹</button>
          <button className="carousel-arrow" onClick={() => scroll(1)}>›</button>
        </div>
      </div>
      <div className="brand-carousel" id={`carousel-${brand}`}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onChooseFlavor={onChooseFlavor} />
        ))}
      </div>
    </section>
  );
}

function ProductCard({ product, onChooseFlavor }: { product: Product; onChooseFlavor: (product: Product) => void; }) {
  return (
    <article className="product-card carousel-card">
      <div className="product-img">
        <img src={product.image} alt={`${product.brand} ${product.model}`} onError={(event) => { event.currentTarget.style.display = "none"; }} />
        <span className="image-fallback">{product.symbol}</span>
      </div>

      <div className="product-heading">
        <h3>{product.model}</h3>
        <div className="price">{money(product.price)}</div>
      </div>

      <p className="small-note">Nicotine: {product.nicotine} · {product.puffs} puffs · Multiple flavors</p>
      <button className="btn-accent full" onClick={() => onChooseFlavor(product)}>Add to order</button>
    </article>
  );
}

function FlavorModal({ product, onClose, onSelectFlavor }: { product: Product; onClose: () => void; onSelectFlavor: (product: Product, flavor: string) => void; }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <section className="modal-panel" onClick={(event) => event.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2>{product.brand} {product.model}</h2>
            <p className="small-note">{money(product.price)} · Nicotine: {product.nicotine}</p>
          </div>
          <button className="icon-btn" onClick={onClose}>×</button>
        </div>
        <div className="flavor-options">
          {product.flavors.map((flavor) => (
            <button key={flavor} className="btn-soft flavor-btn" onClick={() => onSelectFlavor(product, flavor)}>{flavor}</button>
          ))}
        </div>
      </section>
    </div>
  );
}

function Cart({ cart, totals, customer, setCustomer, onChangeQty, onRemove, onSubmit }: { cart: CartItem[]; totals: { subtotal: number; tax: number; deliveryFee: number; total: number; }; customer: Customer; setCustomer: React.Dispatch<React.SetStateAction<Customer>>; onChangeQty: (cartKey: string, amount: number) => void; onRemove: (cartKey: string) => void; onSubmit: () => void; }) {
  return (
    <section className="cart-panel">
      <div className="cart-items">
        {cart.length === 0 ? (
          <div className="cart-item muted">Cart is empty.</div>
        ) : (
          cart.map((item) => (
            <div className="cart-item" key={item.cartKey}>
              <div className="cart-item-top">
                <div>
                  <strong>{item.brand} {item.model}</strong>
                  <div className="small muted">{item.selectedFlavor}</div>
                </div>
                <button className="icon-btn" onClick={() => onRemove(item.cartKey)}>×</button>
              </div>
              <div className="cart-item-bottom">
                <div className="qty-controls">
                  <button className="qty-btn" onClick={() => onChangeQty(item.cartKey, -1)}>−</button>
                  <strong>{item.qty}</strong>
                  <button className="qty-btn" onClick={() => onChangeQty(item.cartKey, 1)}>+</button>
                </div>
                <strong>{money(item.price * item.qty)}</strong>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="totals">
        <Row label="Subtotal" value={money(totals.subtotal)} />
        <Row label="Tax" value={money(totals.tax)} />
        <Row label="Delivery fee" value={money(totals.deliveryFee)} />
        <Row label="Total" value={money(totals.total)} large />
        {totals.subtotal > 0 && totals.subtotal < MINIMUM_ORDER && <p className="small-note">Minimum order is {money(MINIMUM_ORDER)} before delivery.</p>}
      </div>

      <div className="delivery-estimate-card">
        <div className="small-note">Estimated delivery time for Mercedes, Weslaco, Donna</div>
        <strong>45–60 minutes</strong>
      </div>

      <form className="order-form" onSubmit={(event) => { event.preventDefault(); onSubmit(); }}>
        <h3>Delivery info</h3>
        <input value={customer.name} onChange={(event) => setCustomer((current) => ({ ...current, name: event.target.value }))} placeholder="Full name" />
        <input value={customer.phone} onChange={(event) => setCustomer((current) => ({ ...current, phone: event.target.value }))} placeholder="Phone number" />
        <input value={customer.address} onChange={(event) => setCustomer((current) => ({ ...current, address: event.target.value }))} placeholder="Delivery address" />
        <textarea value={customer.notes} onChange={(event) => setCustomer((current) => ({ ...current, notes: event.target.value }))} placeholder="Delivery notes" rows={3} />
        <button className="btn-accent full" type="submit">Request order</button>
      </form>

      <p className="small-note">ID must be checked before handoff. Do not fulfill orders for intoxicated, aggressive, underage, or unverifiable customers.</p>
    </section>
  );
}

function Row({ label, value, large = false }: { label: string; value: string; large?: boolean }) {
  return (
    <div className={`row-line ${large ? "large" : ""}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
