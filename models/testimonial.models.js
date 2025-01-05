import mongoose, { model, Schema } from "mongoose";

const testimonialtSchema = new Schema({
    image:{
        type:String
    },
    name: {
        type: String,
        require: true,
        trim: true
    },
    userType: {
        type: String,
        require: true,
        enum:["Client","Student"],
        default: 5
    },
    rating: {
        type: Number,
        require: true,
        default: 5
    },
    comment: {
        type: String,
        require: true,
        default: "None"
    },
    isPublic:{
        type:Boolean,
        default:false
    }
}, {
    timestamps: true
}
)

const Testimonial = model("Testimonial", testimonialtSchema);
export default Testimonial;