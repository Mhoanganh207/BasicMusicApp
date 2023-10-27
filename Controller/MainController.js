const Track = require('../Model/Track');
const {json} = require("express");
class MainController{


     async index(req,res,next){
         try{
             let tracks = await Track.find({});
             tracks = tracks.map(track => track.toObject());
             res.render('home',{
                 tracks : tracks
             })
         }
         catch (error){
             next(error);
         }
     }





 }

 module.exports = new MainController;