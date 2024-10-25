import Course from '../models/course.model.js'
import {asyncHandler } from '../utils/asyncHandler.js'
import {ApiResponse } from '../utils/ApiResponse.js'
import {ApiError } from '../utils/ApiError.js'
import {uploadOnCloudinary,deleterCloudinaryFile} from '../utils/cloudinary.js'

const addCourse=asyncHandler(async(req,res)=>{
    const {title,descrption, discountPrice ,actualPrice,discount,mode,startFrom,addmissionCloseDate}=req.body;

    if([title,descrption,mode,startFrom,addmissionCloseDate].some((field)=>field?.trim()=="")){
        throw new ApiError(400,"All fields are required")
    }

    const photoLoacalPath=req.files?.photo?.[0]?.path;

    if(!photoLoacalPath){
        throw new ApiError(400,"Photo file is required")
    }

    const photo=await uploadOnCloudinary(photoLoacalPath);

    if(!photo){
        throw new ApiError(400,"Photo file is required")
    }

    const course= await Course.create({
        banner:photo.url,
        title,
        descrption, 
        discountPrice ,
        actualPrice,
        discount,
        mode,
        startFrom,
        addmissionCloseDate
    });

    const createdCourse=await Course.findById(course._id);
    
    if(!createdCourse){
        throw new ApiError(500,"Something went wrong while adding new course");
    }

    return res.status(201).json(
        new ApiResponse(200,createdCourse,"Course ddded succesfully")
    );
});

////////////////////////////////////////////////////

const getCourses = asyncHandler(async (req, res) => {
    // Fetch all contacts from the database
    const courses = await Course.find();

    // If no contacts are found, you can throw an error or return an empty array
    if (!courses || courses.length === 0) {
        throw new ApiError(404, 'No Courses found');
    }

    return res.status(200).json(new ApiResponse(200, courses, "Data retrieved successfully"));
});

///////////////////////////////////////////////

const deleteCourse=asyncHandler(async(req,res)=>{
    const { id } = req.params;
    console.log(id);
    

    // Check if ID is provided
    if (!id) {
        throw new ApiError(400, "Course ID is required");
    }

    // Find the placement by ID
    const course = await Course.findById(id);

    // If the placement does not exist, return an error
    if (!course) {
        throw new ApiError(404, "Course not found");
    }

    await deleterCloudinaryFile(course.banner);
    // Delete the placement
    const result = await Course.deleteOne({ _id: id });

    // If no documents were deleted, return an error
    if (result.deletedCount === 0) {
        throw new ApiError(404, "Placement not found");
    }

    // Return success response
    return res.status(200).json(
        new ApiResponse(200, null, "Placement successfully deleted")
    );
});


export {addCourse, deleteCourse,getCourses}
