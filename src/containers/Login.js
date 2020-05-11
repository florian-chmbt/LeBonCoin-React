import React, { useState } from "react";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = ({ setUser }) => {
  const history = useHistory();

  const [email, setEmail] = useState("farid@lereacteur.io");
  const [password1, setPassword1] = useState("azerty");

  /*  console.log(Cookies.get("userToken")); */

  const handleSubmit = async (event) => {
    // empêche la redirection automatique et donc le rafraîchissement de la page
    event.preventDefault();
    // requête vers le serveur
    try {
      const response = await axios.post(
        "https://leboncoin-api.herokuapp.com/user/log_in",
        {
          // "email": "farid@lereacteur.io",
          // "password": "azerty"
          email: email,
          password: password1,
        }
      );
      // objet posté au serveur
      console.log(response.data);
      // retournera un token
      console.log(response.data.token); // =>NA3ELeHiTKGysZWUxwSnvgFCnL2lWXcjjTiBFJEr1X47NcO07TVa9zjh80d4lZQ8
      console.log(response.data._id); // => 5eb44c9fb04cf2001788db15
      console.log(response.data.message);

      // Créer un cookie avec pour valeur le token reçu dans la réponse
      Cookies.set("userToken", response.data.token, { expires: 2000 });

      // changer l'affichage "se connecter" ===> "se déconnecter"
      // forcer le rafraichissement de la page via la props passé du composant parent AP
      setUser(response.data.token);
      /* const token = Cookies.get("userToken"); // console.log(token); */
      /* setUser({ token: token }); */

      // // rediriger l'utilisateur vers la page offers
      history.push("/");
    } catch (error) {
      alert("le login ou le mot de passe est incorrecte");
    }
  };

  return (
    <>
      <nav className="Login">
        <form className="form" onSubmit={handleSubmit}>
          <input type="submit" value="Se connecter" />

          <br />
          <article>
            <div>Test></div>
            <div
              style={{
                height: "40px",
                width: "400px",
                backgroundColor: "beige",
                marginBottom: "5px",
              }}
              type="text"
            />

            {/* CHAMP EMAIL -------------------- */}
            <div>Email</div>
            <div></div>
            <input
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <br />

            {/* CHAMP PASSWORD 1 -------------------- */}
            <br />
            <div>Password</div>
            <input
              type="password"
              value={password1}
              onChange={(event) => {
                setPassword1(event.target.value);
              }}
            />
            <div>
              <br />
              <div>vous n'avaez pas de compte ?</div>
              <br />
              <Link to="/user/sign_up">Creer un compte</Link>
            </div>
          </article>
        </form>
      </nav>
    </>
  );
};

export default Login;
