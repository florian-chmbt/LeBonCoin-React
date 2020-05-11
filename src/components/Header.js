import React from "react";
import { useHistory, Link } from "react-router-dom";
import Cookies from "js-cookie";
import Logo from "../assets/leboncoin-logo.png";

const Header = ({ user, setUser }) => {
  /*  const history = useHistory(); */
  return (
    <header>
      {/* LOGO -------------------- */}
      <section>
        <img
          alt="Logo"
          src={Logo}
          style={{
            height: "26px",
            width: "140px",
            borderRadius: "5px",
            objectFit: "cover",
          }}
        />
      </section>

      {/* BOUTON HOME-------------------- */}
      <section>
        <div className="Linkdiv">
          <Link className="Link" style={{ textDecoration: "none" }} to="/">
            Page d'accueil
          </Link>
        </div>
      </section>

      {/* BOUTON PUBLISH-------------------- */}
      <section>
        <div className="Linkdiv">
          <Link
            className="Link"
            style={{ textDecoration: "none" }}
            to="/user/publish"
          >
            Déposer une annonce
          </Link>
        </div>
      </section>

      {/* {user === null && <Redirect to="/" />} */}

      {/* BOUTON LOG-IN /LOG-OUT-------------------- */}
      <section>
        {user ? (
          <button
            onClick={() => {
              // supprimer le cookie
              Cookies.remove("userToken");
              setUser(null);
              /*   history.push("/"); */
            }}
          >
            Se déconnecter
          </button>
        ) : (
          <div className="Linkdiv">
            <Link
              className="Link"
              style={{ textDecoration: "none" }}
              to="/user/log_in"
            >
              Se connecter
            </Link>
          </div>
        )}
      </section>
    </header>
  );
};

export default Header;
