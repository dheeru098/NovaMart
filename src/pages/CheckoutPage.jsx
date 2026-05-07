import { useState } from "react"
const fmt = (n) => "₹" + n.toLocaleString("en-IN")
const PAY = [["upi","📱","UPI / GPay / PhonePe"],["card","💳","Credit / Debit Card"],["cod","💵","Cash on Delivery"],["emi","📅","EMI (No Cost)"]]

export default function CheckoutPage({ cart, onPlaceOrder, setPage }) {
  const [payment, setPayment] = useState("upi")
  const [ordered, setOrdered] = useState(false)
  const total = cart.reduce((a,i) => a + i.price * i.qty, 0)
  const savings = cart.reduce((a,i) => a + (i.mrp - i.price) * i.qty, 0)

  if (ordered) return (
    <div className="success-page">
      <div className="success-icon">🎉</div>
      <div className="tag">✓ Order Confirmed!</div>
      <h2>Thank You!</h2>
      <p>Your order has been placed successfully.<br />Expected delivery in 2–4 business days.</p>
      <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
        <button className="btn-primary" onClick={() => setPage("profile")}>Track Order</button>
        <button className="btn-ghost" onClick={() => setPage("home")}>Continue Shopping</button>
      </div>
    </div>
  )

  return (
    <div className="checkout-grid">
      <div>
        <h2 style={{ fontFamily:"Syne,sans-serif", fontSize:28, fontWeight:800, marginBottom:24 }}>Checkout</h2>
        <div className="checkout-section">
          <h3><span className="step-num">1</span> Delivery Address</h3>
          <div className="form-row">
            <div className="form-group"><label>FIRST NAME</label><input className="form-input" defaultValue="Adarsh" /></div>
            <div className="form-group"><label>LAST NAME</label><input className="form-input" defaultValue="Kumar" /></div>
          </div>
          <div className="form-group"><label>ADDRESS LINE 1</label><input className="form-input" placeholder="Street, Building, Area" /></div>
          <div className="form-group"><label>ADDRESS LINE 2</label><input className="form-input" placeholder="Landmark (optional)" /></div>
          <div className="form-row">
            <div className="form-group"><label>CITY</label><input className="form-input" placeholder="Delhi" /></div>
            <div className="form-group"><label>PIN CODE</label><input className="form-input" placeholder="110001" /></div>
          </div>
          <div className="form-group"><label>PHONE</label><input className="form-input" placeholder="+91 98765 43210" /></div>
        </div>
        <div className="checkout-section">
          <h3><span className="step-num">2</span> Payment Method</h3>
          {PAY.map(([id, icon, label]) => (
            <div key={id} className={`payment-option ${payment===id?"selected":""}`} onClick={() => setPayment(id)}>
              <div className={`radio ${payment===id?"checked":""}`} />
              <span>{icon}</span>
              <span style={{ fontWeight:600, fontSize:14 }}>{label}</span>
            </div>
          ))}
          {payment === "upi" && <input className="form-input" placeholder="Enter UPI ID (e.g. name@upi)" style={{ marginTop:12 }} />}
          {payment === "card" && (
            <div style={{ marginTop:12 }}>
              <div className="form-group"><label>CARD NUMBER</label><input className="form-input" placeholder="1234 5678 9012 3456" /></div>
              <div className="form-row">
                <div className="form-group"><label>EXPIRY</label><input className="form-input" placeholder="MM/YY" /></div>
                <div className="form-group"><label>CVV</label><input className="form-input" placeholder="•••" /></div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="order-summary">
        <h3>Order Summary</h3>
        {cart.map(item => (
          <div className="oi" key={item.id}>
            <div className="oi-emoji">{item.img}</div>
            <div className="oi-name">{item.name} × {item.qty}</div>
            <div className="oi-price">{fmt(item.price * item.qty)}</div>
          </div>
        ))}
        <hr className="divider" />
        <div className="summary-row"><span>Items Total</span><span>{fmt(total)}</span></div>
        <div className="summary-row"><span>Delivery</span><span style={{ color:"var(--green)" }}>FREE</span></div>
        <div className="summary-row"><span>You Save</span><span style={{ color:"var(--green)" }}>−{fmt(savings)}</span></div>
        <hr className="divider" />
        <div className="summary-total"><span>Pay Now</span><span style={{ color:"var(--accent)" }}>{fmt(total)}</span></div>
        <button className="checkout-btn" onClick={() => { setOrdered(true); onPlaceOrder() }}>Place Order 🎉</button>
        <p style={{ fontSize:11, color:"var(--muted)", textAlign:"center", marginTop:12 }}>🔒 Secured by 256-bit SSL encryption</p>
      </div>
    </div>
  )
}
