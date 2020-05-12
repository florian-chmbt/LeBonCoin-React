import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

const Publish = ({ user }) => {
  const history = useHistory();
  //1) Gerer l'autentification

  // a) avec props passé (user et SetUser)
  const token1 = { user };
  /*   console.log(token1); */
  // b) sans props
  const token = Cookies.get("userToken");
  /*  console.log(token); */

  //2) Gerer le post d'de date et img

  //DECLARATION VARIABLES
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState();

  //ENVOYER FICHIER IMG DANS UN BODY AVEC FORMDATA
  //Car on pourait pas envoyer l'obj avec {file:file}
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("price", price); // -> req.fields.price (coté serveur) // -> req.files.picture3.path (back)

  //Pour serveur local
  /*   formData.append("Picture3", file); */

  //Pour serveur HEROKU
  formData.append("file", file); // -> req.files.file.path (back)

  //FONCTION CALLBACK POUR REQUETE AXIOS
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://leboncoin-api.herokuapp.com/offer/publish",
        /*  "http://localhost:3100/upload", */
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      /*  console.log(response.data); */
      // {_id: "5eba5c11a7409f0017a7f71b", title: "test", description: "test", price: 56, picture: {…}, …}
      setData(response.data);
      console.log(data);
      alert("Annonce déposée");
      /* setIsLoading(false); */
      // refiriger l'utilisateur vers la page de l'annonce créee
      /*      history.push("/offer/" + response.data._id); */
    } catch (e) {
      console.log(e.message);
    }
  };

  return token ? (
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
                setFile(event.target.files[0]); //=> 16 016 octé //=> nintendoSwith.jpeg
                /* console.log(event.target.files) */
                /* console.log(event.target.files[0]); */
                /*  console.log(event.target.files[0].size); */ /* console.log(event.target.files[0].name) */ console.log(
                  data
                );
              }}
            />
            <button type="submit">Envoyer</button>
            {/* AFICHER IMG UPLOADER */}
          </form>
          {/*       <img src="https://res.cloudinary.com/dumhw0yr9/image/upload/v1589291749/xiukw4bhm3texscyitp5.jpg" /> */}
          <img src={data.url} alt="nintendo" />
          {/* // réponse serveur = url : result.secure-url (url cloudinary) */}
        </div>
      </nav>
    </>
  ) : (
    <div>NO</div>
  );
};

export default Publish;
