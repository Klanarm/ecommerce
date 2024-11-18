import { CATEGORY } from "../database/elysia/CATEGORY.model";
import { USER } from "../database/elysia/USER.model";
import user_seeder from "../seed/user.json";
import category_seeder from "../seed/category.json";
import { ITEM } from "../database/elysia/ITEM.model";
import item_seeder from "../seed/item.json";
export const createMasterData = async () => {
  try {
    await USER.bulkCreate(user_seeder);
    await CATEGORY.bulkCreate(category_seeder);
    await ITEM.bulkCreate(item_seeder);
  } catch (error) {
    console.log(error);
  }
};
