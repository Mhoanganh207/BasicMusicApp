const searchRouter = require('../Routes/search');
const mainRouter = require('../Routes/main');

function route(app){

    app.use('/search', searchRouter);
    app.use('/', mainRouter);

}

module.exports = route;