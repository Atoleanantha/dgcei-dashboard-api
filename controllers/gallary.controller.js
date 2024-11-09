import GallaryImage from '../models/gallary.model.js';
import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiError} from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponse.js';
import { uploadOnCloudinary,deleterCloudinaryFile } from '../utils/cloudinary.js';

const addGallaryImage = asyncHandler(async (req, res) => {
    const files = req.files;

    if (!files || files.length === 0) {
        throw new ApiError(400, "At least one photo file is required");
    }

    // Upload files to Cloudinary
    const uploadPromises = files.map(file => uploadOnCloudinary(file.path));
    const uploadResults = await Promise.all(uploadPromises);

    // Filter successful uploads
    const successfulUploads = uploadResults.filter(result => result?.url);

    if (successfulUploads.length === 0) {
        throw new ApiError(400, "No images were uploaded successfully");
    }

    // Map the results to create documents for MongoDB
    const imageDocs = successfulUploads.map(photo => ({
        photo: photo.url,
    }));

    // Insert documents into MongoDB
    const savedImages = await GallaryImage.insertMany(imageDocs);
    if(!savedImages){
                throw new ApiError(500,"Something went wrong while adding new course");
        }

    return res.status(201).json(
        new ApiResponse(200, savedImages, "Images uploaded successfully")
    );
});

// const addGallaryImage =asyncHandler(async(req,res)=>{
//     const photoLoacalPath=req.files?.photo?.[0]?.path;

//     if(!photoLoacalPath){
//         throw new ApiError(400,"Photo file is required")
//     }

//     const photo=await uploadOnCloudinary(photoLoacalPath);

//     if(!photo){
//         throw new ApiError(400,"Photo file is required")
//     }
//     const course= await GallaryImage.create({
//         photo:photo.url
//     });

//     const result=await GallaryImage.findById(course._id);
    
//     if(!result){
//         throw new ApiError(500,"Something went wrong while adding new course");
//     }


//     return res.status(201).json(
//         new ApiResponse(200,photo.url,"Image added succesfully")
//     );

// });

//////////////////////////////////////////////////////////

const deleteGallaryImage=asyncHandler(async(req,res)=>{
    const { id } = req.params;
    
    console.log(id);
    
    // Check if ID is provided
    if (!id) {
        throw new ApiError(400, "ID is required");
    }

    // Find by ID
    const img = await GallaryImage.findById(id);

    // If the img does not exist, return an error
    if (!img) {
        throw new ApiError(404, "Resourse not found");
    }

    await deleterCloudinaryFile(img.photo);
    // Delete the img
    const result = await GallaryImage.deleteOne({ _id: id });

    // If no documents were deleted, return an error
    if (result.deletedCount === 0) {
        throw new ApiError(404, "Resource not found");
    }

    // Return success response
    return res.status(200).json(
        new ApiResponse(200, null, "Resource successfully deleted")
    );

});





///////////////////////////////////////////////


const getGallaryImages = asyncHandler(async (req, res) => {
    // Fetch all contacts from the database
    const images = await GallaryImage.find();

    // If no contacts are found, you can throw an error or return an empty array
    if (!images || images.length === 0) {
        throw new ApiError(404, 'No images found');
    }

    return res.status(200).json(new ApiResponse(200, images, "Data retrieved successfully"));
});


export {addGallaryImage,deleteGallaryImage,getGallaryImages}