import express from 'express'
import { AddItem } from '../controllers/ItemsControllers.js'
import { upload } from '../middlewares/Multer.js'



const ItemsRoutes=express.Router()

ItemsRoutes.post(
  '/additem',
  upload.fields([
    { name: 'item_image', maxCount: 1 },
    { name: 'item_file', maxCount: 1 },
  ]),
  AddItem
);


export default ItemsRoutes