
// import dotenv from 'dotenv'
// import app from './app.js';
// import connectDB from './db/index.js'
// dotenv.config({
//     path:'./.env'
// })

// connectDB().then(()=>{
//     app.on("error",(error)=>{
//         console.log("ERROR: ",error);
//         throw error
//     })
//     app.listen(process.env.PORT || 8000,()=>{
//         console.log(`Server is running at PORT: ${process.env.PORT}`);
//     })
// })
// .catch((error)=>{
//     console.log("MongoDB connection failed!!",error);
// });




import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './db/index.js';

// Configure dotenv (not needed if variables are set directly in Vercel)
dotenv.config();

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.error("Server Error: ", error);
      throw error;
    });
    const port = process.env.PORT || 8000;
    app.listen(port, () => {
      console.log(`Server is running on PORT: ${port}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed!", error);
  });
