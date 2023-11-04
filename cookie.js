const express = require("express");
const cors = require("cors");
const cookieParser=require("cookie-parser");
const app = express();
app.use(express.json());
app.use(cookieParser("abcedef-3477819"));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin");
  res.header(
    "Access-Control-Methods",
    "GET,POST,OPTIONS,PUT,PATCH,DELETE,HEAD"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  next();
});
app.use(cors());
app.get("/", (req, res) => {
  res.send("Backend is working fine");
});
app.get("/viewPage",function (req,res){
  let name=req.cookies.name;
  console.log(name);
  let counter =req.cookies.counter;
  if(!name){
    res.cookie("name","Guest",{maxAge:60*1000,signed:true});
    res.cookie("counter",1,{maxAge:60*1000,signed:true});
    res.send("Cookie set");

  }
  else {
    res.cookie("counter",+counter+1);
    res.send(`Cookie recd for name:${name} counter:${counter}`);
  }
});
app.post ("/viewPage",function (req,res){
  let {name}=req.body;
  
  res.cookie("name",name,{maxAge:150000,signed:true});
  res.cookie("counter",1,{maxAge:150000,signed:true});
  res.send(`Cookie set with name=${name}`);
});
app.delete("/viewPage",function (req,res){
res.clearCookie("name");
res.send("Cookie deleted");
});
const port= 2410;
app.listen(port,()=>console.log(`Node app listening on port ${port}`));
