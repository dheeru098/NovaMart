import { useState } from "react"
import "./styles/globals.css"

import TopNavigationBar from "./components/TopNavigationBar"
import ShoppingSidebar from "./components/ShoppingSidebar"

import HomePage from "./pages/HomePage"
import WishlistPage from "./pages/WishlistPage"
import ProfilePage from "./pages/ProfilePage"
import CheckoutPage from "./pages/CheckoutPage"

export default function App() {

  const [currentSection, setCurrentSection] = useState("home")

  const [basketItems, setBasketItems] = useState([])

  const [savedWishlist, setSavedWishlist] = useState([])

  const [basketSidebarOpen, setBasketSidebarOpen] = useState(false)

  const [searchKeyword, setSearchKeyword] = useState("")

  const [selectedCategory, setSelectedCategory] = useState("All")

  const [sortingOption, setSortingOption] = useState("Relevance")

  const [priceLimit, setPriceLimit] = useState("")

  const totalBasketCount = basketItems.reduce((sum, item) => {
    return sum + item.qty
  }, 0)

  const addItemToBasket = (product) => {

    setBasketItems((previousItems) => {

      const existingItem = previousItems.find(
        (item) => item.id === product.id
      )

      if (existingItem) {

        return previousItems.map((item) =>

          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      }

      return [
        ...previousItems,
        { ...product, qty: 1 }
      ]
    })
  }

  const removeBasketItem = (id) => {

    setBasketItems((previousItems) =>

      previousItems.filter((item) => item.id !== id)
    )
  }

  const updateBasketQuantity = (id, changeValue) => {

    setBasketItems((previousItems) =>

      previousItems.map((item) =>

        item.id === id
          ? {
              ...item,
              qty: Math.max(1, item.qty + changeValue)
            }
          : item
      )
    )
  }

  const toggleWishlistItem = (id) => {

    setSavedWishlist((previousWishlist) =>

      previousWishlist.includes(id)
        ? previousWishlist.filter((itemId) => itemId !== id)
        : [...previousWishlist, id]
    )
  }

  const changeSection = (sectionName) => {

    setCurrentSection(sectionName)

    setSearchKeyword("")
  }

  return (
    <>

      <TopNavigationBar
        currentSection={currentSection}
        changeSection={changeSection}

        basketItemCount={totalBasketCount}

        savedItemsCount={savedWishlist.length}

        searchKeyword={searchKeyword}

        updateSearchKeyword={setSearchKeyword}

        openBasketSidebar={setBasketSidebarOpen}
      />

      {basketSidebarOpen && (

        <ShoppingSidebar

          cartItems={basketItems}

          closeSidebar={() => setBasketSidebarOpen(false)}

          updateQuantity={updateBasketQuantity}

          removeProduct={removeBasketItem}

          handleCheckout={() => {

            setBasketSidebarOpen(false)

            changeSection("checkout")
          }}
        />

      )}

      {currentSection === "home" && (

        <HomePage

          search={searchKeyword}
          setSearch={setSearchKeyword}

          category={selectedCategory}
          setCategory={setSelectedCategory}

          sort={sortingOption}
          setSort={setSortingOption}

          maxPrice={priceLimit}
          setMaxPrice={setPriceLimit}

          cart={basketItems}

          wishlist={savedWishlist}

          onAddToCart={addItemToBasket}

          onToggleWish={toggleWishlistItem}
        />

      )}

      {currentSection === "wishlist" && (

        <WishlistPage

          wishlist={savedWishlist}

          onToggleWish={toggleWishlistItem}

          onAddToCart={addItemToBasket}

          setPage={changeSection}
        />

      )}

      {currentSection === "profile" && (

        <ProfilePage
          wishlist={savedWishlist}
        />

      )}

      {currentSection === "checkout" && (

        <CheckoutPage

          cart={basketItems}

          onPlaceOrder={() => setBasketItems([])}

          setPage={changeSection}
        />

      )}

      <footer className="footer">

        Built with ❤️ ·
        <strong> NovaMart </strong> ·
        © 2026 ·
        Smart Shopping Experience

      </footer>

    </>
  )
}