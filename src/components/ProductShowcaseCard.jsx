const formatPrice = (amount) => {
  return `₹${amount.toLocaleString("en-IN")}`
}

const calculateDiscountPercent = (salePrice, originalPrice) => {
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100)
}

const generateRatingStars = (value) => {
  const fullStars = "★".repeat(Math.floor(value))
  const halfStar = value % 1 ? "☆" : ""
  return fullStars + halfStar
}

export default function ProductShowcaseCard({
  itemData,
  alreadyInCart,
  savedInWishlist,
  addItemToCart,
  toggleWishlistItem
}) {

  const {
    id,
    name,
    price,
    mrp,
    category,
    rating,
    reviews,
    img,
    badge
  } = itemData

  const discountPercent = calculateDiscountPercent(price, mrp)

  return (

    <article className="showcase-card">

      <div className="showcase-image-section">

        <div className="product-emoji">
          {img}
        </div>

        {badge && (
          <div className={`product-tag ${badge.toLowerCase()}`}>
            {badge}
          </div>
        )}

        <button
          className={`wishlist-toggle-btn ${savedInWishlist ? "selected" : ""}`}
          onClick={(event) => {
            event.stopPropagation()
            toggleWishlistItem(id)
          }}
        >
          {savedInWishlist ? "❤" : "♡"}
        </button>

      </div>

      <div className="showcase-content">

        <p className="product-category-label">
          {category}
        </p>

        <h3 className="product-title">
          {name}
        </h3>

        <div className="rating-review-row">

          <span className="rating-stars">
            {generateRatingStars(rating)}
          </span>

          <span className="review-count">
            {rating} • {reviews.toLocaleString()} reviews
          </span>

        </div>

        <div className="pricing-container">

          <span className="sale-price">
            {formatPrice(price)}
          </span>

          <span className="original-price">
            {formatPrice(mrp)}
          </span>

          <span className="discount-badge">
            Save {discountPercent}%
          </span>

        </div>

        <div className="delivery-info">
          Free delivery available
        </div>

        <button
          className={`cart-action-btn ${alreadyInCart ? "item-added" : ""}`}
          onClick={() => addItemToCart(itemData)}
        >
          {alreadyInCart
            ? "✔ Added Successfully"
            : "Add Item to Basket"}
        </button>

      </div>

    </article>
  )
}