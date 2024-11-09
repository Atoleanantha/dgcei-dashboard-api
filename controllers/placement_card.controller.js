import PlacementCard from '../models/placement_card.model.js'
import {asyncHandler } from '../utils/asyncHandler.js'
import {ApiResponse } from '../utils/ApiResponse.js'
import {ApiError } from '../utils/ApiError.js'
import {uploadOnCloudinary,deleterCloudinaryFile} from '../utils/cloudinary.js'

const addPlacemant = asyncHandler(async(req,res)=>{
    const {stu_name,position, pkg ,comp_name}=req.body;

    if([stu_name,position, pkg ,comp_name].some((field)=>field?.trim()=="")){
        throw new ApiError(400,"All fields are required")
    }

    const photoLoacalPath=req.files?.photo?.[0]?.path;

    console.log("local file:",photoLoacalPath);
    
    if(!photoLoacalPath){
        throw new ApiError(400,"Photo file is required")
    }

    const photo=await uploadOnCloudinary(photoLoacalPath);
    console.log("cloud file:",photo)
    if(!photo){
        throw new ApiError(400,"Photo file is required  (add placement)")
    }

    const candidate= await PlacementCard.create({
        photo:photo.url,
        stu_name,
        pkg,
        position,
        comp_name,
    });

    const createdCandidate=await PlacementCard.findById(candidate._id);
    console.log("mongo res:",createdCandidate)
    if(!createdCandidate){
        throw new ApiError(500,"Something went wrong while registring the user");
    }

    return res.status(201).json(
        new ApiResponse(200,createdCandidate,"Placement Candidate succesfully")
    );

});

/////////////////////////////////////////////////////////////////////

const getPlacement = asyncHandler(async (req, res) => {
    // Fetch all contacts from the database
    const placement = await PlacementCard.find();

    // If no contacts are found, you can throw an error or return an empty array
    if (!placement || placement.length === 0) {
        throw new ApiError(404, 'No Placements found');
    }

    return res.status(200).json(new ApiResponse(200, placement, "Data retrieved successfully"));
});

/////////////////////////////////////////////////////////////////

const deletePlacement = asyncHandler(async (req, res) => {
    const { id } = req.params;
    console.log(id);
    

    // Check if ID is provided
    if (!id) {
        throw new ApiError(400, "Placement ID is required");
    }

    // Find the placement by ID
    const placement = await PlacementCard.findById(id);

    // If the placement does not exist, return an error
    if (!placement) {
        throw new ApiError(404, "Placement not found");
    }

    await deleterCloudinaryFile(placement.photo);
    // Delete the placement
    const result = await PlacementCard.deleteOne({ _id: id });

    // If no documents were deleted, return an error
    if (result.deletedCount === 0) {
        throw new ApiError(404, "Placement not found");
    }

    // Return success response
    return res.status(200).json(
        new ApiResponse(200, null, "Placement successfully deleted")
    );
});


export {addPlacemant,getPlacement,deletePlacement}