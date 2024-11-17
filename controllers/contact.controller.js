import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import ContactUs from '../models/contact.model.js';



const addContact = asyncHandler(async (req, res) => {
    // steps:
    // 1)get data
    // 2)check data
    // 3)Store data
    // 4)return response

    const { name, email, phone, message } = req.body;
    if ([name, email, phone].some((field) => field.trim() == "")) {
        throw new ApiError(400, "All fields are required!");
    }

    const contact = await ContactUs.create({
        name,
        email,
        phone,
        message
    });
    console.log(contact);
    
    if (!contact) {
        throw new ApiError(500, "Something went wrong while submitting");
    }

    return res.status(201).json(
        new ApiResponse(200, contact, "Submitted succesfully")
    );
});


const getContacts = asyncHandler(async (req, res) => {
    // Fetch all contacts from the database
    const contacts = await ContactUs.find();

    // If no contacts are found, you can throw an error or return an empty array
    if (!contacts || contacts.length === 0) {
        throw new ApiError(404, 'No contacts found');
    }

    // Return the list of contacts with a 200 status
    return res.status(200).json(new ApiResponse(200, contacts, "Contacts retrieved successfully"));
});


const deleteContact = asyncHandler(async (req, res) => {
    const { id } = req.params; // Extract the contact ID from request parameters

    // Find the contact by ID and delete it
    const contact = await ContactUs.findByIdAndDelete(id);

    // If the contact is not found, throw an error
    if (!contact) {
        throw new ApiError(404, 'Contact not found');
    }

    // Return a success message with a 200 status
    return res.status(200).json(new ApiResponse(200, null, "Contact deleted successfully"));
});


export { addContact ,getContacts,deleteContact}

