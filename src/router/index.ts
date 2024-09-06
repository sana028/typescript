import express from 'express';
import { signUp } from '../controllers/employee.controller';
import {uploadFilesToDb} from '../controllers/uploadFiles.controller';

const router = express.Router();

//login accesss employee_accessbile return acess token, role
router.post('/signup',signUp);


//profile fetch



//update profile
router.patch('/upload-profile',uploadFilesToDb)


//add employee if user admin



//remove employee if he no longer as an employee in company, delete profile also




export default router;