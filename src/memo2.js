// CRUD : READ  -----------------------------------------------------------------------------------------

//
// DIFF --> Query est utilisé pour requete GET avec plusieurs critere (recomendé)
//                  -> Params est utilisé pour un seul critere (peu utilisé)
//
//NOTE = dans les exmple ci dessous, le param id est utilisé sans le underscire_8 car le "findbyId" est utilisé

// 1) PARAM : QUERY ----------------------------------------------------------------------

/* -> requete GET CLIENT (POSTMAN) : 
"http://localhost:3005/offer?id=5e9c7b4d95a8e75a404b4c8d" 
"http://localhost:3005/offer/with-count?title=tendo&priceMin=1&priceMax=1000&sort=price-asc";*/

/* -> requete GET SERVEUR (POSTMAN) :

    router.get("/offer", async (req, res) => {
const offerBDD = await Offer.findById(req.query.id).populate({ ...}   ......... }*/

/* console.log(req.query.id); // 5e9c7b4d95a8e75a404b4c8d (_id) de l'offre Saturn sur BDD */

//
//
//

// 2) PARAM : PARAMS  ----------------------------------------------------------------------

/* -> requete GET CLIENT (POSTMAN) : "http://localhost:3005/offer/5e9c7b4d95a8e75a404b4c8d" */

/* -> requete GET SERVEUR (POSTMAN) : 

router.get("/offer/:id", async (req, res) => { ... 
... const offerBDD = await Offer.findById(req.params.id).populate({ ...}   ......... }*/

/* console.log(req.params.id); // 5e9c7b4d95a8e75a404b4c8d (_id) de l'offre Saturn sur BDD */
