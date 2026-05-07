export default function TopNavigationBar({
  currentSection,
  changeSection,
  basketItemCount,
  savedItemsCount,
  searchKeyword,
  updateSearchKeyword,
  openBasketSidebar
}) {

  const clearSearchInput = () => {
    updateSearchKeyword("")
  }

  const handleSearchChange = (event) => {
    updateSearchKeyword(event.target.value)
    changeSection("home")
  }

  return (

    <header className="top-navigation">

      <div
        className="brand-logo"
        onClick={() => changeSection("home")}
      >
        nova<span>mart</span>
      </div>

      <div className="search-container">

        <span className="search-icon">
          🔎
        </span>

        <input
          type="text"
          className="search-input-field"
          placeholder="Search for items, categories..."
          value={searchKeyword}
          onChange={handleSearchChange}
        />

        {searchKeyword && (

          <button
            className="clear-search-btn"
            onClick={clearSearchInput}
          >
            ✕
          </button>

        )}

      </div>

      <div className="navigation-actions">

        <button
          className={`navigation-btn ${
            currentSection === "wishlist" ? "selected-nav" : ""
          }`}
          onClick={() => changeSection("wishlist")}
        >
          ❤ Wishlist

          {savedItemsCount > 0 && (
            <span className="nav-counter">
              {savedItemsCount}
            </span>
          )}

        </button>

        <button
          className={`navigation-btn ${
            currentSection === "profile" ? "selected-nav" : ""
          }`}
          onClick={() => changeSection("profile")}
        >
          👤 Account
        </button>

        <button
          className="navigation-btn basket-btn"
          onClick={() => openBasketSidebar(true)}
        >
          🛍 Basket

          {basketItemCount > 0 && (
            <span className="basket-counter">
              {basketItemCount}
            </span>
          )}

        </button>

      </div>

    </header>
  )
}