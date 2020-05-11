import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <nav>
      <h2>Home</h2>
      {/* En React, on n'utilise une balise a SEULEMENT s'il faut rediriger vers une site externe */}
      <a href="http://www.google.fr">Go to Google</a>
      <br />
      <Link to="/products/89894389483989">
        <div>Mon produit</div>
      </Link>
      <br />
      <br />
      <Link to="/offers/">
        <div>Mes offres</div>
      </Link>
      <br />
      <Link to="/offers/filter/">
        <div>Mes offres filtré</div>
      </Link>
      <br />
      <br />
      <Link to="/user/log_in/">
        <div>Me connecter</div>
      </Link>
      <br />
      <Link to="user/sign_up">
        <div>M'inscrire</div>
      </Link>
      <br />
      <Link to="user/sign_up2">
        <div>M'inscrire 2</div>
        <br />
        <br />
        <Link to="user/publish">
          <div>Publier</div>
        </Link>
      </Link>
    </nav>
  );
};

export default Home;
