import { CATEGORY } from "../database/elysia/CATEGORY.model";
import { ITEM } from "../database/elysia/ITEM.model";
import { Op } from "sequelize";

export const itemsHandler = {
  findCategory: async () => {
    const data = await CATEGORY.findAll();
    return data;
  },

  addItem: async ({ body }) => {
    try {
      const category = await CATEGORY.findOne({
        where: { category_name: body.category.trim() },
      });
      let created_data;
      if (!category) {
        const data = await CATEGORY.create({ category_name: body.category });
        created_data = data.dataValues.id;
      }

      await ITEM.create({
        item_name: body.name,
        item_picture: body.image,
        quantity: body.quantity,
        cost: body.cost,
        category_id: category ? category.get({ plain: true }) : created_data,
      });
      return {};
    } catch (error) {
      console.log(error);
    }
  },

  getItems: async (page, limit, category_id, search) => {
    const data = await ITEM.findAndCountAll({
      ...(category_id
        ? { include: [{ model: CATEGORY, where: { id: category_id } }] }
        : {}),
      ...(search ? { where: { item_name: { [Op.like]: `%${search}%` } } } : {}),
      offset: (+page - 1) * +limit,
      limit: +limit,
      order: [["created_at", "DESC"]],
    });

    return data;
  },

  purchaseItem: async (body) => {
    const data = await ITEM.findOne({ where: { id: body.id } });
    data.quantity = +data.dataValues.quantity - +body.quantity;
    data.save();
    return {};
  },
};
