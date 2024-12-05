import express from "express";
const router = express.Router();

import * as controller from "../../controllers/client/tours.controller";

router.get("/:slugCategory", controller.index);

router.get("/detail/:slugTour", controller.detail);

export const toursRoute = router;