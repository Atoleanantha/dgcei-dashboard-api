import { Router } from "express";

import {addContact,getContacts,deleteContact} from "../controllers/contact.controller.js";

const router=Router();

router.post('/add-contact', addContact); 
router.get('/get-contact', getContacts); 
router.route('/delete-contact/:id').delete(deleteContact);

export default router;