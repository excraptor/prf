const router = require('express').Router()
const mongoose = require('mongoose')


// const aruModel = mongoose.model('aru')

// router.route('/arukereso/:id?').get((req, res) => {
//     if(!req.params.id) {
//         aruModel.find((err, aruk) => {
//             if(err) return res.status(500).send('DB hiba ' + err)
//             return res.status(200).send(aruk)
//         })
//     } else {
//         aruModel.findOne({nev: req.params.id}, (err, aru) => {
//             if(err) return res.status(500).send('DB hiba ' + err)
//             if(!aru) return res.status(400).send('Nincs ilyen aru!')
//             return res.status(200).send(aru)
//         })
//     }
// }).post((req, res) => {
//     if(!req.params.id || !req.body.ar || !req.body.darab) {
//         return res.status(400).send("Hiányos input!")
//     } else {
//         // a teljesség kedvéért itt megírom ezt a kódot
//         // de felesleges mert a sémában már definiáltuk, hogy két doksi
//         // nem kaphatja ugyanazt a nevet
//         aruModel.findOne({nev: req.params.id}, (err, aru) => {
//             if(err) return res.status(500).send('DB hiba ' + err)
//             if(aru) return res.status(400).send('mar van ilyen')
//             const nAru = new aruModel({nev: req.params.id, darab: req.body.darab,
//             ar: req.body.ar})
//             nAru.save((error) => {
//                 if(error) return res.status(500).send('DB hiba a betöltés során ' + error)
//                 return res.status(200).send(req.body)
//             })
//         })
//     }
// }).put((req, res) => {
//     if(!req.params.id || (!req.body.ar && !req.body.darab)) {
//         return res.status(400).send("Hiányos input!")
//     } else {
//         aruModel.findOne({nev: req.params.id}, (err, aru) => {
//             if(err) return res.status(500).send('DB hiba ' + err)
//             if(!aru) return res.status(400).send('Még nincs ilyen áru')
//             if(req.body.ar) aru.ar = req.body.ar
//             if(req.body.darab) aru.darab = req.body.darab
//             aru.save((error) => {
//                 if(error) return res.status(500).send('DB hiba a betöltés során ' + error)
//                 return res.status(200).send(aru)
//             })
//         })
//     }
// }).delete((req, res) => {
//     if(!req.params.id) {
//         aruModel.deleteMany((err) => {
//             if(err) return res.status(500).send('DB hiba ' + err)
//             return res.status(200).send('Törölve minden')
//         })
//     } else {
//         /* alternatív ha szeretném ellenőrizni hogy bent volt-e az adat
//             aruModel.findOne({nev: req.params.id}, (err, aru) => {
//                 if(err) return res.status(500).send('DB hiba ' + err)
//                 if(!aru) return res.status(400).send('Nincs ilyen aru!')
//                 aru.delete((error) => {...})
//             })
//          */
//         aruModel.deleteOne({nev: req.params.id}, (err) => {
//             if(err) return res.status(500).send('DB hiba ' + err)
//             return res.status(200).send('Aru torolve (feltéve ha volt)')
//         })
//     }
// })

router.route('/register')
    .get((req, res) => {

    })
    .post((req, res) => {
        const body = req.body
        if(!body.username) {
            return res.status(400).send("Username is missing")
        } else if (!body.password || !body.repassword) {
            return res.status(400).send("Password or password confirmation is missing")
        }
        if(body.password != body.repassword) {
            return res.status(400).send("Passwords are different")
        }


    })

router.route('/users').get((req, res) => {
    return res.status(200).send(getUsers(db))
})

module.exports = router