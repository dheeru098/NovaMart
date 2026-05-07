const formatCurrency = (value) => {
  return `₹${value.toLocaleString("en-IN")}`
}

export default function ShoppingSidebar({
  cartItems,
  closeSidebar,
  updateQuantity,
  removeProduct,
  handleCheckout
}) {

  const itemCount = cartItems.reduce((sum, product) => {
    return sum + product.qty
  }, 0)

  const subtotalAmount = cartItems.reduce((sum, product) => {
    return sum + (product.price * product.qty)
  }, 0)

  const totalDiscount = cartItems.reduce((sum, product) => {
    return sum + ((product.mrp - product.price) * product.qty)
  }, 0)

  const estimatedTax = Math.round(subtotalAmount * 0.05)

  const finalAmount = subtotalAmount + estimatedTax

  return (
    <>
      <div className="sidebar-backdrop" onClick={closeSidebar}></div>

      <aside className="shopping-sidebar">

        <div className="sidebar-top">
          <div>
            <h2 className="sidebar-heading">Shopping Basket</h2>
            <p className="sidebar-subtitle">
              {itemCount} item{itemCount !== 1 ? "s" : ""} selected
            </p>
          </div>

          <button
            className="sidebar-close-btn"
            onClick={closeSidebar}
          >
            ✕
          </button>
        </div>

        <div className="sidebar-content">

          {cartItems.length === 0 ? (

            <div className="basket-empty-state">
              <div className="empty-icon">🛍️</div>

              <h3>No Products Added</h3>

              <p>
                Explore products and add them to your basket.
              </p>

              <button
                className="continue-shopping-btn"
                onClick={closeSidebar}
              >
                Continue Shopping
              </button>
            </div>

          ) : (

            cartItems.map((product) => (

              <div
                className="basket-card"
                key={product.id}
              >

                <div className="basket-image">
                  {product.img}
                </div>

                <div className="basket-details">

                  <div className="basket-info-top">
                    <h4 className="basket-product-name">
                      {product.name}
                    </h4>

                    <button
                      className="delete-product-btn"
                      onClick={() => removeProduct(product.id)}
                    >
                      Remove
                    </button>
                  </div>

                  <div className="basket-price-row">
                    <span className="current-price">
                      {formatCurrency(product.price)}
                    </span>

                    <span className="old-price">
                      {formatCurrency(product.mrp)}
                    </span>
                  </div>

                  <div className="quantity-controller">

                    <button
                      className="quantity-btn"
                      onClick={() => updateQuantity(product.id, -1)}
                    >
                      −
                    </button>

                    <span className="quantity-value">
                      {product.qty}
                    </span>

                    <button
                      className="quantity-btn"
                      onClick={() => updateQuantity(product.id, 1)}
                    >
                      +
                    </button>

                  </div>

                </div>

              </div>

            ))

          )}

        </div>

        {cartItems.length > 0 && (

          <div className="payment-summary">

            <div className="summary-line">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotalAmount)}</span>
            </div>

            <div className="summary-line">
              <span>Discount</span>
              <span className="discount-text">
                -{formatCurrency(totalDiscount)}
              </span>
            </div>

            <div className="summary-line">
              <span>Estimated Tax</span>
              <span>{formatCurrency(estimatedTax)}</span>
            </div>

            <div className="summary-line">
              <span>Delivery Charges</span>
              <span className="free-delivery">
                FREE
              </span>
            </div>

            <div className="final-total">
              <span>Final Amount</span>
              <span>{formatCurrency(finalAmount)}</span>
            </div>

            <button
              className="place-order-btn"
              onClick={handleCheckout}
            >
              Place Order →
            </button>

          </div>

        )}

      </aside>
    </>
  )
}