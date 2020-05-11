import React from "react";
import axios from "axios";

const Signup2 = () => {
  return (
    <>
      {/* METHODE 1 ------------------------------------------- */}
      <div>
        <button
          onClick={async () => {
            const response = await axios.post(
              " https://leboncoin-api.herokuapp.com/user/sign_up",
              {
                email: "floriann@lereacteur.io",
                username: "floriann",
                password: "azerty",
              }
            );
            console.log("Res. 1 " + response.data);
            console.log(response.data);
          }}
        >
          Créer mon compte Personnel 1
        </button>
      </div>

      {/* METHODE 2 ------------------------------------------- */}
      <div>
        <form
          className="form"
          onSubmit={async (event) => {
            event.preventDefault();
            const response = await axios.post(
              " https://leboncoin-api.herokuapp.com/user/sign_up",
              {
                email: "floriannn@lereacteur.io",
                username: "floriannn",
                password: "azerty",
              }
            );
            console.log("Res. 2 " + response.data);
            console.log(response.data);
          }}
        >
          <input type="submit" value="Créer mon compte Personnel 2" />
        </form>
      </div>
    </>
  );
};

export default Signup2;
