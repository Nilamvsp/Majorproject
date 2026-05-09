const express = require("express")
const app = express();
const session = require("express-session");
const flash =require("connect-flash")

const port = 8000;





app.use(session({
  secret: 'Nilam',
  resave: false,
  saveUninitialized: true,
  
}))

app.use(flash());


app.get("/register",(req,res)=>{
    let { name="anonymous" } = req.query;
    req.session.name = name;
    // console.log(req.session.name);
    
    // console.log(req.session);   
    
    res.redirect("/hello")
})




app.get("/hello",(req,res)=>{
    console.log(req.session.name);
    
    res.send(`Hello ,${req.session.name}`)
})

app.listen(port,(req,res)=>{
    console.log("server is listening on port : ",port);
    
})