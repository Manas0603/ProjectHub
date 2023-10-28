
import mongoose from "mongoose";






 const Connection = async()=>{

    const URL=`mongodb+srv://manassharma850:Manas1234@cluster0.5rd26on.mongodb.net/?retryWrites=true&w=majority`;
    try{
       await mongoose.connect(URL,{useNewUrlParser:true})
       console.log("connect properly data")
    }catch(error){
        console.log("ERROR connect properly data",error)
    }
}

export default Connection;
