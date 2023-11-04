var express = require("express");
var app = express();
app.use(express.json());
var cors=require("cors");
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );  
  res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT,OPTIONS");
  next();
});
app.use(cors());
app.use(sayHello);
app.use(ShowUrlMethod);
app.use("/orders",showBody);
app.use(insertUser);

app.use(sayBye);
const port= 2410;
app.listen(port,()=>console.log(`Node app listening on port ${port}`));

function sayHello(req,res,next){
  console.log("Hello new request received");
next();
}
function sayBye(req,res,next){
  console.log("Bye : Middleware is over");
next();
}
function ShowUrlMethod(req,res,next){
  console.log(`URL :${req.url} Method: ${req.method}`);
next();
}

function showBody(req,res,next){
  console.log(`Body:${JSON.stringify(req.body)}`)
  next();
}
function insertUser(req,res,next){

  req.user={name:"Temp",role:"Guest"};
  console.log(`Inserted in req.user:${JSON.stringify(req.user)}`)
}

app.get("/products",function (req,res){
console.log("In the route :GET /products");
res.send({route:"/products"});

});

app.post("/orders",function (req,res){
  console.log("In the route :GET /orders");
  res.send({route:"/orders",data:req.body});
});

