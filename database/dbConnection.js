import { connect } from "mongoose";
import dotenv from "dotenv"
dotenv.config()
const dbConnection = connect(process.env.DB_URL_ONLINE).then(()=>{
    console.log("database connected successfully");
}).catch(()=>{
    console.log("database connected failed");
})
export default dbConnection