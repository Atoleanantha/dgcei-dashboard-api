import mongoose,{model, Schema} from "mongoose";

const popupImageSchema=new Schema(
   {
    photo:{
        type:String,
        required:true,
        unique:true
    },
   
   },{ timesStamps:true}
)

const PopUpImage=model("PopUpImage",popupImageSchema);
export default PopUpImage;