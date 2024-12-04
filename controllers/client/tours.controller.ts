import { Request, Response } from "express";
import Tour from "../../models/tours.model";

export const index = async (req: Request, res: Response) => {
    //* SELECT * FROM tours WHERE deleted = flase AND status = "active";
    const tours = await Tour.findAll({
        where: {
          deleted: false,
          status: "active"
        },
        raw: true
    });

    res.render("client/pages/tours/index", {
        pageTitle: "All tours",
        tours: tours
    });
}