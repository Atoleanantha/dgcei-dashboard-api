import mongoose,{model, Schema} from "mongoose";

const courseSchema=new Schema({
    banner:{
        type:String,
        require:true
    },
    title:{
        type:String,
        require:true,
        trim:true
    },
    descrption:{
        type:String,
        require:true
    },
    discountPrice:{
        type:String,
         default:"Not disclosed"
    },
    actualPrice:{
        type:String,
        default:"Not disclosed"
    },
    discount:{
        type:String,
         default:"Not disclosed"
    },
    mode:{
        type:String
    },
    startFrom:{
        type:Date
    },
    addmissionCloseDate:{
        type:Date
    }
},
{
    timestamps:true
})
const Course=model("Course",courseSchema);
export default Course;