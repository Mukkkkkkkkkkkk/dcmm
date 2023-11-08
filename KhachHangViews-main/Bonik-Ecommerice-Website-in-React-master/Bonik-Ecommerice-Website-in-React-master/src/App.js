import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./common/header/Header";
import Pages from "./pages/Pages";
import Cart from "./common/Cart/Cart";
import Footer from "./common/footer/Footer";
import { CartProvider } from "./CartContext"; // Import the CartProvider from the CartContext file

function App() {
  return (
    // Step 4: Wrap the entire app with CartProvider to provide CartItem and addToCart to all components
    <CartProvider>
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact>
            {/* Step 3: Pass productItems and shopItems to Pages component */}
            <Pages productItems={productItems} shopItems={shopItems} />
          </Route>
          <Route path="/cart" exact>
            <Cart />
          </Route>
          {/* Other routes */}
        </Switch>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;
