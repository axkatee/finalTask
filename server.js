const express = require("express");
const app = express();
const TESTMODULE = require("./models/models");
const cors = require('cors');
let mongoose = require('mongoose');
const { url } = require("inspector");
const bodyParser = require("body-parser");


let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0');
let yyyy = today.getFullYear();

today = dd + '.' + mm + '.' + yyyy;

mongoose.connect('mongodb+srv://user:user@cluster.gvlln.mongodb.net/shop-database?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors({origin: 'null'}));

// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Headers', "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
// });

app.use((req,res,next) => {
    console.log("request log", req.url);
    next();
})
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.post('/add', async (req, res) => {
    try{
        const params = req.body;
        if (!params || !params.howMuchPay || !params.wherePay) {
            res.status(400).send();
        }else{
        const data = {
            shopName: params.wherePay,
            createDate: today,
            price: params.howMuchPay

        }
        await TESTMODULE.create(data);
        res.status(200).send(); }


    }catch(e){
        console.log(`error with adding new data ${e}`)
        res.status(500).send(e);
    }
    
});

app.get('/all', (req, res) => {
    try{
        
        TESTMODULE.find({}, (err, data) => {
            if(err){
                res.send(err);
            }else{
                res.send(data);
            }
        })

    }catch(e){
        res.status(500).send(e);
    }
    
});

app.post('/edit', (req, res) => {

    

});

app.delete('/delete', (req, res) => {
    try{

        TESTMODULE.findOneAndDelete({}, function (err, data){
            if(err){
                res.send(err);
            }else{
                res.send(data);
            }
        });

    }catch(e){
        res.status(404).send(e);
    }
});

console.log("server is running on 3000 port")
app.listen(3000);