import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./components/ui/Theme";
import { Route, Switch } from "react-router-dom";
// import Login from './components/Login/Login.jsx'
import Home from "./components/Home/Home.jsx";
import Error from "./components/Error/Error.jsx";
import NavBar from "./components/NavBar/NavBar.js";
import Categories from "./components/categories/categories.jsx";
import FilterCategory from "./components/categories/filtercategory.jsx";
import All from "./components/categories/all.jsx";
import Create from "./components/create/create.jsx";
import Profile from "./components/profile/profile.jsx";
import Configuration from "./components/profile/configuration.jsx";
import Contact from "./components/contact/contact.jsx";
import About from "./components/about/about.jsx";
import Favorites from "./components/Favorites/Favorites";
import NftDetail from "./components/NftDetail/NftDetail";
import NavBarShoppingCart from "./components/NavBarShoppingCart/shoppingcart.jsx";
import "./App.css";
import LoginSection from "./components/LoginSection/LoginSection";
import PrivateRoute from "./components/PrivateRoute";
import HomeAdmin from "./components/Admin/HomeAdmin";
import AdminUser from "./components/Admin/AdminUser";
import AdminNfts from "./components/Admin/AdminNfts";
import AdminCategories from "./components/Admin/AdminCategories";
import ShoppingHistory from "./components/profile/ShoppingHistory/ShoppingHistory.jsx";

function App() {
  return (
    <ThemeProvider className="App" theme={theme}>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/nft/:id" component={NftDetail} />
        <Route path="/categories/nft/:id" component={NftDetail} />
        <Route exact path="/categories" component={Categories}></Route>
        <Route exact path="/categories/all" component={All}></Route>
        <Route path="/categories/:id" component={FilterCategory}></Route>
        {/* <Route exact path='/admin'component={AdminProfile}></Route> */}
        <Route exact path="/profile" component={Profile}></Route>
        <Route path="/profile/history" component={ShoppingHistory}></Route>
        <Route path="/profile/reviews" component={Profile}></Route>
        <Route path="/profile/createNFT" component={Create}></Route>
        <Route path="/profile/configuration" component={Configuration}></Route>
        <Route exact path="/contact" component={Contact}></Route>
        <Route exact path="/about" component={About}></Route>
        <Route exact path="/favorites" component={Favorites}></Route>
        <Route
          exact
          path="/shoppingcart"
          component={NavBarShoppingCart}
        ></Route>
        <Route exact path="/login" component={LoginSection}></Route>
        <PrivateRoute exact path="/admin" component={HomeAdmin}></PrivateRoute>
        <PrivateRoute
          exact
          path="/admin/users"
          component={AdminUser}
        ></PrivateRoute>
        <PrivateRoute
          exact
          path="/admin/nfts"
          component={AdminNfts}
        ></PrivateRoute>
        <PrivateRoute
          exact
          path="/admin/categories"
          component={AdminCategories}
        ></PrivateRoute>

        <Route path="/*" component={Error}></Route>
      </Switch>
    </ThemeProvider>
  );
}

export default App;
