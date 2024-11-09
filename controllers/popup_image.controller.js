import PopUpImage from '../models/popup_image.model.js';
import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiError} from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponse.js';
import { uploadOnCloudinary,deleterCloudinaryFile } from '../utils/cloudinary.js';

const addPopupImage =asyncHandler(async(req,res)=>{
    const photoLoacalPath=req.files?.photo?.[0]?.path;

    if(!photoLoacalPath){
        throw new ApiError(400,"Photo file is required")
    }

    const photo=await uploadOnCloudinary(photoLoacalPath);
    console.log("photo:"+photo);
    
    if(!photo){
        throw new ApiError(400,"Photo file is required")
    }
    const course= await PopUpImage.create({
        photo:photo.url
    });

    const result=await PopUpImage.findById(course._id);
    
    if(!result){
        throw new ApiError(500,"Something went wrong while adding new course");
    }


    return res.status(201).json(
        new ApiResponse(200,photo.url,"Image added succesfully")
    );

});

//////////////////////////////////////////////////////////

const deletePoupImage=asyncHandler(async(req,res)=>{
    const { id } = req.params;
    
    console.log(id);
    
    // Check if ID is provided
    if (!id) {
        throw new ApiError(400, "ID is required");
    }

    // Find by ID
    const img = await PopUpImage.findById(id);

    // If the img does not exist, return an error
    if (!img) {
        throw new ApiError(404, "popup not found");
    }

    await deleterCloudinaryFile(img.photo);
    // Delete the img
    const result = await PopUpImage.deleteOne({ _id: id });

    // If no documents were deleted, return an error
    if (result.deletedCount === 0) {
        throw new ApiError(404, "Placement not found");
    }

    // Return success response
    return res.status(200).json(
        new ApiResponse(200, null, "Placement successfully deleted")
    );

});





///////////////////////////////////////////////


const getPopups = asyncHandler(async (req, res) => {
    // Fetch all contacts from the database
    const popup = await PopUpImage.find();

    // If no contacts are found, you can throw an error or return an empty array
    if (!popup || popup.length === 0) {
        throw new ApiError(404, 'No Courses found');
    }

    return res.status(200).json(new ApiResponse(200, popup, "Data retrieved successfully"));
});


export {addPopupImage,deletePoupImage,getPopups}