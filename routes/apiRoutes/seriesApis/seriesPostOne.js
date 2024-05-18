var express = require('express');
var router = express.Router();
const Serie = require("../../../models/Serie.js");
const Temporada = require("../../../models/Temporada.js");

router.post('/api/series', async (req, res) => {
    let {_id, nom, estat, imatge, descripcio, idioma, temporadas, enllac} = req.body

    try {
        await Serie.create({_id, nom, estat, imatge, descripcio, idioma, temporadas, enllac});
        for (let i = 0; i < temporadas.length; i++) {
            let _id = temporadas[i]._id
            let temporada = temporadas[i].temporada
            let estat = temporadas[i].estat
            let imatge = temporadas[i].imatge
            let descripcio = temporadas[i].descripcio
            let enllac = temporadas[i].enllac
            let episodis = temporadas[i].episodis
            let valoracio = temporadas[i].valoracio
            const temporadaToFind = await Temporada.findOne({_id: temporadas[i]._id})
            if (temporadaToFind === null) {
                await Temporada.create(
                    {
                        _id,
                        temporada,
                        estat,
                        imatge,
                        descripcio,
                        enllac,
                        episodis,
                        valoracio
                    }
                )
            } else {
                break;
            }
        }
        res.send({success: true, message: "S'ha afagit nova informacio a la taula series"})
    } catch (e) {
        console.log(e)
        res.send({success: false, message: 'ERROR!' + e.message})
    }
})

module.exports = router;