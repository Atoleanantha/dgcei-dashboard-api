import mongoose ,{model, Schema} from "mongoose";

const contactUsSchema=new Schema({
    name:{
        type:String,
        require:true,
        trim:true
    },
    email:{
        type:String,
        require:true,
        trim:true,
    },
    phone:{
        type:String,
        trim:true,
        require:true
    },
    message:{
        type:String,
        default:"None"
    }

},{
    
timestamps:true
}
)

const ContactUs = model("ContactUs", contactUsSchema);
export default ContactUs;