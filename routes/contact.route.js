import { Router } from "express";

import {addContact,getContacts} from "../controllers/contact.controller.js";

const router=Router();

router.post('/add-contact', addContact); 
router.get('/get-contact', getContacts); 

export default router;