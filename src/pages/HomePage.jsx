import { useMemo } from "react"

import ProductShowcaseCard from "../components/ProductShowcaseCard"

import {
  PRODUCTS,
  CATEGORIES,
  SORT_OPTIONS,
  CATEGORY_ICONS
} from "../data/products"

export default function HomePage({

  search,
  setSearch,

  category,
  setCategory,

  sort,
  setSort,

  maxPrice,
  setMaxPrice,

  cart,
  wishlist,

  onAddToCart,
  onToggleWish

}) {

  const filteredProducts = useMemo(() => {

    let updatedProducts = [...PRODUCTS]

    if (search) {

      updatedProducts = updatedProducts.filter((product) =>

        product.name.toLowerCase().includes(search.toLowerCase()) ||

        product.desc.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (category !== "All") {

      updatedProducts = updatedProducts.filter(
        (product) => product.category === category
      )
    }

    if (maxPrice) {

      updatedProducts = updatedProducts.filter(
        (product) => product.price <= Number(maxPrice)
      )
    }

    if (sort === "Price: Low to High") {

      updatedProducts.sort((a, b) => a.price - b.price)

    } else if (sort === "Price: High to Low") {

      updatedProducts.sort((a, b) => b.price - a.price)

    } else if (sort === "Top Rated") {

      updatedProducts.sort((a, b) => b.rating - a.rating)

    } else if (sort === "Most Reviewed") {

      updatedProducts.sort((a, b) => b.reviews - a.reviews)
    }

    return updatedProducts

  }, [search, category, sort, maxPrice])

  return (
    <>

      {!search && (

        <section className="hero-section">

          <div className="hero-badge">
            🔥 Smart Shopping Festival
          </div>

          <h1 className="hero-title">
            Discover Modern
            <em> Lifestyle Essentials</em>
          </h1>

          <p className="hero-description">

            Explore premium gadgets, fashion and smart home products
            at exclusive online prices.

          </p>

          <div className="hero-actions">

            <button className="btn-primary">
              Explore Products →
            </button>

            <button className="btn-secondary">
              Browse Categories
            </button>

          </div>

        </section>

      )}

      <div className="category-strip">

        {CATEGORIES.map((categoryItem) => (

          <div
            key={categoryItem}
            className={`category-chip ${
              category === categoryItem ? "active" : ""
            }`}
            onClick={() => setCategory(categoryItem)}
          >

            {CATEGORY_ICONS[categoryItem]} {categoryItem}

          </div>

        ))}

      </div>

      <div className="filter-toolbar">

        <span className="toolbar-title">
          Sort Products:
        </span>

        <select
          className="sort-dropdown"
          value={sort}
          onChange={(event) => setSort(event.target.value)}
        >

          {SORT_OPTIONS.map((option) => (

            <option key={option}>
              {option}
            </option>

          ))}

        </select>

        <div className="price-limit-box">

          <span className="price-label">
            Max ₹
          </span>

          <input
            type="number"
            placeholder="50000"
            value={maxPrice}
            onChange={(event) => setMaxPrice(event.target.value)}
          />

        </div>

        <span className="products-count">

          {filteredProducts.length} items available

        </span>

      </div>

      <div className="products-grid">

        {filteredProducts.map((product) => (

          <ProductShowcaseCard

            key={product.id}

            itemData={product}

            alreadyInCart={cart.some(
              (item) => item.id === product.id
            )}

            savedInWishlist={wishlist.includes(product.id)}

            addItemToCart={onAddToCart}

            toggleWishlistItem={onToggleWish}

          />

        ))}

      </div>

      {filteredProducts.length === 0 && (

        <div className="empty-search-state">

          <div className="empty-search-icon">
            🔍
          </div>

          <p className="empty-search-title">
            No matching products found
          </p>

          <p className="empty-search-subtitle">
            Try changing your filters or search keywords.
          </p>

        </div>

      )}

    </>
  )
}