import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Publish = ({ setUser }) => {
  //1) Gerer l'autentification

  //2) Gerer le post d'de date et img

  // l'utilisateur authentifié pourra entrersur cette page
  // La modal de connexion doit s'ouvrir si user non authentifié

  //DECLARATION VARIABLES
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState();
  const [data, setData] = useState({});

  //ENVOYER FICHIER IMG DANS UN BODY AVEC FORMDATA
  //Car on pourait pas envoyer l'obj avec {file:file}
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("price", price); // -> req.fields.price (coté serveur)
  formData.append("file", file); // -> req.files.picture3.path (back)

  /*  const token = user;
  console.log(token); */

  const token = Cookies.get("userToken");
  console.log(token);

  //FONCTION CALLBACK POUR REQUETE AXIOS
  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post(
      "https://leboncoin-api.herokuapp.com/offer/publish",
      /*    "http://localhost:3100/upload", */
      formData,
      {
        headers: {
          Authorization: "Bearer" + token,
          /*    Content-Type: "multipart/form-data" */
        },
      }
    );

    console.log(response.data);
    setData(response.data);
    alert("Annonce déposée");
  };

  return (
    <>
      <nav className="Login">
        Hello
        <div className="App">
          <form onSubmit={handleSubmit}>
            <br />

            <div>Titre de l'anonce</div>
            <input
              type="text"
              placeholder="title"
              onChange={(event) => setTitle(event.target.value)}
            />
            <br />

            <div>Texte de l'anonce</div>
            <input
              type="text"
              placeholder="Descirption"
              onChange={(event) => setDescription(event.target.value)}
            />
            <br />
            <br />

            <div>Prix *</div>
            <input
              type="text"
              placeholder="Prix"
              onChange={(event) => setPrice(event.target.value)}
            />
            <br />

            <div>Photo *</div>
            <input
              type="file"
              //   multiply={true} //=> attribu pour uploader pls img
              onChange={(event) => {
                /*         console.log(event.target.files); */
                setFile(event.target.files[0]);
                /* console.log(event.target.files) */
                /* console.log(event.target.files[0]); */
                /*  console.log(event.target.files[0].size); */ //=> 16 016 octé
                /* console.log(event.target.files[0].name) */ //=> nintendoSwith.jpeg
              }}
            />
            <button type="submit">Envoyer</button>
            {/* AFICHER IMG UPLOADER */}
          </form>
          {/*       <img src={data.url} alt="nintendo" /> */}
          {/* // réponse serveur = url : result.secure-url (url cloudinary) */}
        </div>
      </nav>
    </>
  );
};

export default Publish;
