import { Express } from "express";
import { toursRoute } from "./tour.route";
import { categoryRoute } from "./category.route";

export const routesClient = (app: Express) => {
    
    app.use("/tours", toursRoute);

    app.use ("/categories", categoryRoute);

}