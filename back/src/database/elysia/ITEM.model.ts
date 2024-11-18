import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  HasOne,
  HasMany,
  BelongsTo,
  DefaultScope,
} from "sequelize-typescript";
import { CATEGORY } from "./CATEGORY.model";

@DefaultScope(() => ({
  attributes: {
    exclude: ["created_at", "updated_at"],
  },
}))
@Table({
  timestamps: true,
  tableName: "ITEM",
  modelName: "ITEM",
})
export class ITEM extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare item_name: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  declare item_picture: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare quantity: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  declare cost: number;

  @BelongsTo(() => CATEGORY, {
    targetKey: "id",
    foreignKey: {
      name: "category_id",
      allowNull: true,
    },
    as: "category_data",
  })
  declare category_id: string;

  @CreatedAt
  declare created_at: Date;

  @UpdatedAt
  declare updated_at: Date;
}
