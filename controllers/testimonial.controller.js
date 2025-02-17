import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import Testimonial from '../models/testimonial.models.js';
import { deleterCloudinaryFile, uploadOnCloudinary } from '../utils/cloudinary.js';


const addTestimonial = asyncHandler(async (req, res) => {
    const { name, comment, userType, rating } = req.body;

    // Validate required fields
    if ([name, comment, userType].some((field) => !field?.trim())) {
        throw new ApiError(400, "Name, comment, and userType fields are required!");
    }

    const rate = parseInt(rating); // Convert rating to integer

    // Optional photo handling
    let photoLocalPath = req.files?.photo?.[0]?.path;
    console.log("local file:", photoLocalPath);

    // If no photo is uploaded, continue without photo
    let imageUrl = null;
    if (photoLocalPath) {
        // Upload the image to Cloudinary if provided
        const image = await uploadOnCloudinary(photoLocalPath);

        console.log("cloud file:", image);

        if (!image) {
            throw new ApiError(400, "Failed to upload the photo file.");
        }

        imageUrl = image.url; // Save the Cloudinary URL
    }

    // Create testimonial entry
    const testimonial = await Testimonial.create({
        name,
        comment,
        image: imageUrl || null,  // Use Cloudinary URL if photo exists, else null
        userType,
        rating: rate,
        isPublic: true,
    });

    if (!testimonial) {
        throw new ApiError(500, "Failed to submit testimonial.");
    }

    return res.status(201).json(
        new ApiResponse(201, testimonial, "Testimonial submitted successfully.")
    );
});


const getTestimonials = asyncHandler(async (req, res) => {
    const testimonials = await Testimonial.find();

    if (!testimonials.length) {
        throw new ApiError(404, 'No testimonials found');
    }

    return res.status(200).json(
        new ApiResponse(200, testimonials, "Testimonials retrieved successfully.")
    );
});


const deleteTestimonial = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const testimonial = await Testimonial.findByIdAndDelete(id);

    if (!testimonial) {
        throw new ApiError(404, 'Testimonial not found');
    }
    
    await deleterCloudinaryFile(testimonial.image);

    return res.status(200).json(
        new ApiResponse(200, null, "Testimonial deleted successfully.")
    );
});


const updateTestimonialVisibility = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // Fetch the current testimonial
    const testimonial = await Testimonial.findById(id);

    if (!testimonial) {
        throw new ApiError(404, 'Testimonial not found');
    }

    // Toggle the isPublic value
    testimonial.isPublic = !testimonial.isPublic;

    // Save the updated testimonial
    await testimonial.save();

    return res.status(200).json(
        new ApiResponse(200, testimonial, `Testimonial visibility set to ${testimonial.isPublic ? 'Public' : 'Private'}.`)
    );
});


export { addTestimonial, getTestimonials, deleteTestimonial, updateTestimonialVisibility };
