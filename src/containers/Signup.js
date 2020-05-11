/* IMPORT DES PACKAGES */
import React, { useState } from "react";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Signup = ({ setUser }) => {
  const history = useHistory();

  const [name, setName] = useState("jean-michel");
  const [email, setEmail] = useState("jean-michel@lereacteur.io");
  const [password1, setPassword1] = useState("azerty");
  const [password2, setPassword2] = useState("azerty");
  const [checkbox, setCheckbox] = useState("false");

  const [result, setResult] = useState(false);

  return (
    <>
      <div>
        <form
          className="form"
          onSubmit={async (event) => {
            // empêche la redirection automatique et donc le rafraîchissement de la page
            event.preventDefault();
            // requête vers le serveur
            const response = await axios.post(
              " https://leboncoin-api.herokuapp.com/user/sign_up",
              {
                // email: "jean-robert@lereacteur.io",
                // username: "jean-robert",
                // password: "azerty",
                email: email,
                username: name,
                password: password1,
              }
            );

            console.log(response.data);
            console.log(response.data.token);
            console.log(response.data._id); // => 5eb44c9fb04cf2001788db15
            console.log(response.data.message);

            /*   if (password1 && password2 && password1 !== password2) {
              alert("Vos deux mots de passe de sont pas identiques");
              setResult(false);
            } else if (!name || !email || !password1 || !password2) {
              alert("Veuillez saisir tous les champs");
              setResult(false);
            } else {
              alert("Submitted !");
              setResult(true);
              console.log("Submitted !");*/
            // Créer un cookie avec pour valeur le token reçu dans la réponse
            if (!response.data.token) {
              alert(response.data.message);
            } else {
              Cookies.set("userToken", response.data.token, {
                expires: 2000,
              });
              // changer l'affichage "se connecter" ===> "se déconnecter"
              const token = Cookies.get("userToken");
              console.log(token);
              // forcer le rafraichissement de la page via la props passé du composant parent AP
              setUser({ token: token });
              // rediriger l'utilisateur vers la page offers
              history.push("/");
            }
          }}
          /* } */
        >
          <input
            /*   onClick={() => { */
            type="submit"
            value="Créer mon compte Personnel"
          />

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
              value={name}
            ></div>

            {/* CHAMP USERNAME -------------------- */}
            <div>Username</div>
            <input
              placeholder="Username"
              type="text"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            ></input>

            {/* CHAMP EMAIL -------------------- */}
            <div>Email</div>
            <div></div>
            <input
              placeholder="email"
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            ></input>

            {/* CHAMP PASSWORD 1 -------------------- */}
            <div>Password 1</div>
            <input
              placeholder="password"
              type="password"
              value={password1}
              onChange={(event) => {
                setPassword1(event.target.value);
              }}
            ></input>
            {/* CHAMP PASSWORD 2 -------------------- */}
            <div>Password 2</div>
            <input
              type="password"
              value={password2}
              onChange={(event) => {
                setPassword2(event.target.value);
              }}
            ></input>
            {/* CHECK BOX -------------------- */}
            <div>J'accepte les conditions</div>
            <input
              type="checkbox"
              onChange={(event) => {
                setCheckbox(!checkbox);
              }}
            ></input>
          </article>
        </form>
      </div>
    </>
  );
};

export default Signup;
