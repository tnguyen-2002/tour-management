import {Response, Request} from "express";
import Category from "../../models/category.model";

export const index = async (res: Response, req: Request) => {
    //* SELECT * FROM categories WHERE deleted = false AND status = "active";
    const categories = await Category.findAll({
        where: {
            deleted: false,
            status: "active"
        },
        raw: true
    });

    res.render("client/pages/categories/index", {
        pageTitle: "Tour Categories",
        categories: categories
    });
}