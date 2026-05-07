import { PRODUCTS } from "../data/products"
const fmt = (n) => "₹" + n.toLocaleString("en-IN")

export default function WishlistPage({ wishlist, onToggleWish, onAddToCart, setPage }) {
  const items = PRODUCTS.filter(p => wishlist.includes(p.id))
  return (
    <div className="page">
      <div className="page-title">♡ My Wishlist</div>
      <div className="page-sub">{items.length} saved items</div>
      {items.length === 0 ? (
        <div style={{ textAlign:"center", padding:"60px", color:"var(--muted)" }}>
          <div style={{ fontSize:64, marginBottom:16 }}>♡</div>
          <p style={{ fontSize:16, marginBottom:20 }}>Your wishlist is empty</p>
          <button className="btn-primary" onClick={() => setPage("home")}>Browse Products</button>
        </div>
      ) : (
        <div className="wish-grid">
          {items.map(p => (
            <div className="wish-card" key={p.id}>
              <div className="wish-emoji">{p.img}</div>
              <div className="wish-info">
                <div className="wish-name">{p.name}</div>
                <div className="wish-price">{fmt(p.price)}</div>
                <div style={{ display:"flex", gap:8 }}>
                  <button className="wish-add" onClick={() => onAddToCart(p)}>Add to Cart</button>
                  <button onClick={() => onToggleWish(p.id)} style={{ background:"none", border:"none", color:"var(--accent2)", cursor:"pointer", fontSize:18 }}>✕</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
