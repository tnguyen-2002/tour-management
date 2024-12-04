import express from "express";
const router = express.Router();

import * as controller from "../../controllers/client/tours.controller";

router.get ("/", controller.index);

export const toursRoute = router;