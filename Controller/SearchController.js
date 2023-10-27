const Track = require('../Model/Track')

class SearchController{
    async index(req, res){
        const query = {
            $or: [
                {name: { $regex:req.query.q}},
                {author: { $regex:req.query.q}}
            ]
        };
        let tracks = await Track.find(query);
        tracks = tracks.map(track => track.toObject());
        res.render('search',{
            tracks: tracks
        });
    }
    async findByIndex(req,res,next){
        const index = req.params.id;

        Track.findOne({index: index})
            .then(track => {
                res.json(track);
            })
            .catch(next);
    }

}

module.exports = new SearchController;