// IMPORT DES PACKAGES
import React, { useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  /*   Link,
  Redirect, */
} from "react-router-dom";
import Cookies from "js-cookie";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// IMPORT DES ROUTES (containers) ET COMPOSANTS (components)
import Home from "./containers/Home";
import Products from "./containers/Products";
import Offers from "./containers/Offers";
/* import OffersFilter from "./containers/OffersFilter"; */
import Offer from "./containers/Offer";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Signup2 from "./containers/Signup2";
import Header from "./components/Header";
import Publish from "./containers/Publish";
import CheckoutForm from "./components/CheckoutForm";

const stripePromise = loadStripe("pk_test_xrkbJESGzd3ioohK81jth6mb00IFT519pp");

function App() {
  const tokenFromCookie = Cookies.get("userToken");
  const [user, setUser] = useState(tokenFromCookie || null);
  // console.log(tokenFromCookie);
  // console.log(user);

  return (
    <Router>
      <div className="container">
        <Header user={user} setUser={setUser} />
        {/*  <header>
        {user === null && <Redirect to="/" />}
        {user ? (
          <button
            onClick={() => {
              Cookies.remove("userToken");
              setUser(null);
            }}
          >
            Se déconnecter
          </button>
        ) : (
          <Link to="/user/log_in">Se connecter</Link>
        )}
      </header> */}

        <main>
          <Switch>
            {/* ROUTE OFFER (DETAIL) Param = PARAMS -----------------------------*/}
            <Route path="/offer/:idToto/">
              <Offer />
            </Route>
            {/* ROUTE OFFERS (LIST) Pram = QUERY ------------------------------------- */}
            {/*   <Route path="/offers/">
              <OffersFilter />
            </Route> */}
            {/* ROUTE PAIMENNT (STRIPE) ------------------------------------------------- */}
            <Route path="/payment/">
              <Elements stripe={stripePromise}>
                <CheckoutForm />
                {/*  tous les enfants de elements oauront acces à stripe */}
              </Elements>
            </Route>
            {/* ROUTE OFFERS (LIST) ------------------------------------------------- */}
            <Route path="/offers/">
              <Offers />
            </Route>
            {/* ROUTE LOG-IN (Connexion) ------------------------------------------------- */}
            <Route path="/user/log_in/">
              {/* On passe la props setuser à la route User afin de rafraichir la page pour que le bouton du header passe de "se connecter" à "se deconnecter" automatiquement sans besoin de rafraichiseement manuel */}
              <Login setUser={setUser} />
            </Route>
            {/* ROUTE SIGN-UP (Inscription) ------------------------------------------------- */}
            <Route path="/user/sign_up/">
              <Signup setUser={setUser} />
            </Route>
            {/* ROUTE SIGN-UP2 (Inscription) ------------------------------------------------- */}
            <Route path="/user/sign_up2/">
              <Signup2 />
            </Route>
            {/* ROUTE PUBLISH (CREATE) ------------------------------------------------- */}
            <Route path="/user/publish/">
              <Publish user={user} setUser={setUser} />
            </Route>
            {/* ROUTE PRODUCT ------------------------------------------------- */}
            <Route path="/products/:id/">
              <Products />
            </Route>
            {/* ROUTE HOME ------------------------------------------------- */}
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;

// Créer un cookie (nom, valeurn, delais)
// Cookies.set("nomDuCookie", "valeurDuCookie");

// Faire expirer un cookie
// const token = "fSFBIbI3XtZyF79i";
// Cookies.set("token", token, { expires: 7 });

// Lire un cookie
// Cookies.get("token"); // Renverra "fSFBIbI3XtZyF79i"

// Supprimer un cookie
// Cookies.remove("token");
// // Si on fait un Cookies.get("token"), cela renverra undefined car il n'existera plus.

// UseHistory() nous donne accès à l'objet history permettant de naviguer entre les différentes URL.
// history.push("/")

// import { useHistory } from "react-router-dom";
// export const Component = () => {
//     let history = useHistory();
//     return (
//         <div>
//             <button onClick={() => history.push("/")}>Home</button>
//             <p>Component page</p>
//         </div>
//     );
// };

// URL : https://leboncoin-api.herokuapp.com/offer/with-count
// Méthode HTTP : GET
// Paramètres Query :
// title : String
// priceMin : Number
// priceMax : Number
// sort : Valeurs possibles "price-desc", "price-asc", "date-desc", "date-asc"
// skip : Number
// limit : Number

// https://leboncoin-api.herokuapp.com/offer/with-count?title=ordinateur
// Pour chercher le titre ordinateur :

// _id: "5eb19adf63295b0017512529";
// https://leboncoin-api.herokuapp.com/offer/with-count?_id=5eb19adf63295b0017512529

// Pour chercher le titre ordinateur et un prix max de 200 :
// https://leboncoin-api.herokuapp.com/offer/with-count?title=ordinateur&priceMax=200

// Pour chercher un prix compris entre 40 et 200 :
// https://leboncoin-api.herokuapp.com/offer/with-count?priceMin=40&priceMax=200

// Pour trier par prix décroissant :
// https://leboncoin-api.herokuapp.com/offer/with-count?sort=price-desc

// Pour trier par prix croissant :
// https://leboncoin-api.herokuapp.com/api/offer/with-count?sort=price-asc

// Pour chercher vespa et trier par prix croissant en même temps :
// https://leboncoin-api.herokuapp.com/offer/with-count?sort=price-asc&title=vespa

// Voir les annonces récentes en premier :
// https://leboncoin-api.herokuapp.com/offer/with-count?sort=date-desc

// Voir les annonces anciennes en premier :
// https://leboncoin-api.herokuapp.com/offer/with-count?sort=date-asc
