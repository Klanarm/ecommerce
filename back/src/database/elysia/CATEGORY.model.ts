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

@DefaultScope(() => ({
  attributes: {
    exclude: ["created_at", "updated_at"],
  },
}))
@Table({
  timestamps: true,
  tableName: "CATEGORY",
  modelName: "CATEGORY",
})
export class CATEGORY extends Model {
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
  declare category_name: string;

  @CreatedAt
  declare created_at: Date;

  @UpdatedAt
  declare updated_at: Date;
}
