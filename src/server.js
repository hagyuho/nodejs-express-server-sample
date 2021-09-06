const express = require('express');

const bodyParser = require('body-parser');

const cors = require('cors');

const multer = require('multer');
//const upload = multer({dest:'/upload'})

const app= express();

const PORT = process.env.PORT || 8080;

global.__basedir = __dirname + "/..";


app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));

app.use('/', require('./app/server/route/route.js'));

const db = require('./app/server/model/index.js');
    db.sequelizeConfig.sync();

    app.get('/', (req, res)=>{
        res.json({ message: `Server is running on port ${PORT}`})
    })

    app.listen(PORT, () =>{
        console.log(`Server is running on port ${PORT}`);
    })

