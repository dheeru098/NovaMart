import { PRODUCTS } from "../data/products"
const fmt = (n) => "₹" + n.toLocaleString("en-IN")

const ORDERS = [
  { ...PRODUCTS[0], status:"Delivered", date:"Apr 24, 2026" },
  { ...PRODUCTS[4], status:"In Transit", date:"Apr 30, 2026" },
  { ...PRODUCTS[2], status:"Delivered", date:"Apr 10, 2026" },
]
const MENU = [["📦","My Orders"],["📍","Saved Addresses"],["💳","Payment Methods"],["🔔","Notifications"],["🔒","Privacy & Security"],["🎁","Rewards & Coupons"],["❓","Help & Support"]]

export default function ProfilePage({ wishlist }) {
  return (
    <div>
      <div className="profile-header">
        <div className="avatar">👤</div>
        <div className="profile-name">Adarsh Kumar</div>
        <div className="profile-email">adarsh@apexshop.in</div>
        <div className="profile-stats">
          <div className="stat"><div className="stat-num">{ORDERS.length}</div><div className="stat-label">Orders</div></div>
          <div className="stat"><div className="stat-num">{wishlist.length}</div><div className="stat-label">Wishlist</div></div>
          <div className="stat"><div className="stat-num">2</div><div className="stat-label">Addresses</div></div>
        </div>
      </div>
      <div className="profile-section">
        <div className="section-heading">Recent Orders</div>
        {ORDERS.map((o, i) => (
          <div className="order-card" key={i}>
            <div className="order-emoji">{o.img}</div>
            <div className="order-info">
              <div className="order-name">{o.name}</div>
              <div className="order-meta">{o.date} · {fmt(o.price)}</div>
            </div>
            <span className={`order-status ${o.status==="Delivered"?"status-delivered":"status-transit"}`}>{o.status}</span>
          </div>
        ))}
      </div>
      <div className="profile-section">
        <div className="section-heading">Account</div>
        <div className="menu-list">
          {MENU.map(([icon, label]) => (
            <div className="menu-item" key={label}>
              <span><span>{icon}</span><span>{label}</span></span>
              <span style={{ color:"var(--muted)" }}>›</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
