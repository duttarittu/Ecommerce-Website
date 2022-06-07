import './App.css';
import Header from "./component/layout/Header/Header.js";
import {BrowserRouter as Router, Route} from "react-router-dom";
import WebFont from "webfontloader";
import React from 'react';
import Footer from "./component/layout/Footer/Footer.js"
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import LoginSignUp from './component/User/LoginSignUp';
import NewProduct from "./component/PostAd/NewProduct";
import About from './component/layout/About/About';
import Contact from "./component/layout/Contact/Contact";

function App() {
  React.useEffect( ()=> {
    WebFont.load({
      google: {
        families:["Roboto", "Droid Sans", "Chilanka"]
      }
    })
  },[]);

  return (
    <Router>
      <Header />

      <Route exact path="/" component={Home} />
      <Route exact path="/product/:id" component={ProductDetails} />
      <Route exact path="/login" component={LoginSignUp} />
      <Route exact path="/createproduct" component={NewProduct} />
      <Route exact path="/about" component={About} />
      <Route exact path="/contact" component={Contact} />
      
      <Footer />
    </Router>
  )
}
export default App;
