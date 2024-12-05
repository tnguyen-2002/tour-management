import { Request, Response } from "express";
import sequelize from "../../config/database";
import { QueryTypes } from "sequelize";
import Tour from "../../models/tours.model";
import moment from "moment";

export const index = async (req: Request, res: Response) => {
    /*
    SELECT tours.*, price * (1 - discount/100) AS price_special
    FROM tours
    JOIN tours_categories ON tours.id = tours_categories.tour_id
    JOIN categories ON tours_categories.category_id = categories.id
    WHERE
      categories.slug = 'du-lich-trong-nuoc'
      AND categories.deleted = false
      AND categories.status = 'active'
      AND tours.deleted = false
      AND tours.status = 'active';
    */

    const slugCategory = req.params.slugCategory;
    console.log(slugCategory);
    
    const tours = await sequelize.query(`
        SELECT 
            tours.*, 
            price * (1 - discount/100) AS price_special
        FROM 
            tours
        JOIN 
            tours_categories ON tours.id = tours_categories.tour_id
        JOIN 
            categories ON tours_categories.category_id = categories.id
        WHERE
            categories.slug = :slugCategory
            AND categories.deleted = false
            AND categories.status = 'active'
            AND tours.deleted = false
            AND tours.status = 'active';  
    `, {
        type: QueryTypes.SELECT,
        replacements: { slugCategory }
    });



    for (const item of tours) {
        if(item["images"]) {
          item["images"] = JSON.parse(item["images"]);
          console.log(item["images"]);
          item["image"] = item["images"][0];
          item["price_special"] = parseInt(item["price_special"]);
        }
    }

    

    res.render("client/pages/tours/index", {
        pageTitle: "Local Tours",
        tours: tours
    });
}

export const detail = async ( req: Request, res: Response   ) => {
    /*
        SELECT *
        FROM tours
        WHERE slug = ':slugTour'
            AND deleted = false
            AND status = 'active';
    */

    const slugTour = req.params.slugTour;
    console.log(slugTour);

    const tourDetail = await Tour.findOne({
        where: {
            slug: slugTour,
            deleted: false,
            status: "active"
        },
        raw: true
    })

    if(tourDetail["images"]) {
        tourDetail["images"] = JSON.parse(tourDetail["images"]);
    }

    tourDetail["price_special"] = (1 - tourDetail["discount"]/100) * tourDetail["price"];
    
    tourDetail["timeStart"] = moment(tourDetail["timeStart"]).format("YYYY-MM-DD HH:mm:ss");
    console.log(tourDetail);

    res.render("client/pages/tours/detail", {
        pageTitle: "Tour Detail",
        tourDetail: tourDetail
    });
}