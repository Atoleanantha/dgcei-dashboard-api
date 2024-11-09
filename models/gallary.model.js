import mongoose,{model, Schema} from "mongoose";

const gallaryImageSchema=new Schema(
   {
    photo:{
        type:String,
        required:true,
        unique:true
    },
   
   },{ timesStamps:true}
)

const GallaryImage=model("GallaryImage",gallaryImageSchema);
export default GallaryImage;