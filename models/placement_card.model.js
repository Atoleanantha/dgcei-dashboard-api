import mongoose,{model, Schema} from "mongoose";

const placementCardSchema= new Schema(
    {
        photo:{
            type:String
        },
        stu_name:{
            type:String,
            require:true,
            trim:true,
        },
        position:{
            type:String,
            require:true,
            trim:true,
        },
        pkg:{
            type:String,
            require:true,
            trim:true,
        },
        comp_name:{
            type:String,
            require:true,
            trim:true,
        },
    },{
        timestamps:true
    }
)

const PlacementCard=model("PlacementCard",placementCardSchema);

export default  PlacementCard;