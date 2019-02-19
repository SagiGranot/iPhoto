const express   = require('express');
const ctrl      = require('./controllers/controller');
const ctrl_fb   = require('./controllers/feedback.ctrl');
const ctrl_us   = require('./controllers/user.ctrl')

const app  = express();
const port = process.env.PORT || 8080;

app.set('port',port);
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(
    (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.set("Content-Type", "application/json");
        next();
 });
/*** All routes ***/
app.get('/photo',               ctrl.fetchAllphotos);
app.post('/photo',              ctrl.addPhoto);
app.delete('/photo/remove/:id', ctrl.deletePhoto);
app.put('/photo/edit/:id',      ctrl.editPhoto);
app.get('/photo/sortbylikes',   ctrl_fb.sortByLikes);
app.get('/photo/sortbyrate',    ctrl_fb.sortByRates);
app.put('/addlike/:id/:user',   ctrl_fb.addLike);
app.put('/addrate/:id/:num/:user',ctrl_fb.addRate);
app.post('/login',              ctrl_us.login);
app.post('/user',               ctrl_us.addUser);
app.get('/user/:id',            ctrl_us.getProfile);
//Documentation
app.get("/apidoc",				ctrl.getDocumentation)
//FALLBACK
app.all("*",					ctrl.fallback)

app.listen(port,
     () => console.log(`listening on port ${port}`));