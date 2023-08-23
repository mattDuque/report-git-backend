import {
  Table,
  Model,
  Column,
  DataType,
  BelongsTo,
  HasMany,
  ForeignKey,
} from "sequelize-typescript"
import Author from "./author.model"
import Commit from "./commit.model"

@Table({
  timestamps: false,
  tableName: "mergeRequests",
})
export default class MergeRequest extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare iid: number

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare project_id: number

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare state: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare created_at: string

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare group_id: number

  @ForeignKey(() => Author)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare author_id: number

  @BelongsTo(() => Author)
  author: Author

  @HasMany(() => Commit)
  commits: Commit[]
}
