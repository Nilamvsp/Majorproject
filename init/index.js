const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../models/listing");

main()
    .then(()=>{
        console.log("connected to mongoose succesfully");        
    })
    .catch((err)=>{
        console.log(err);
        
    })

async function main(){
   await mongoose.connect('mongodb://127.0.0.1:27017/Wanderlust');
}

const initDB = async ()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj, owner:"69fa04a5e236c61603124a53"}));
    await Listing.insertMany(initData.data);
    console.log("Data was initialized Successfully!!");
    
}

initDB();