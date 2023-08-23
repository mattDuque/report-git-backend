import { Table, Model, Column, DataType, HasMany } from "sequelize-typescript"
import MergeRequest from "./mergeRequest.model"
import Commit from "./commit.model"

@Table({
  timestamps: true,
  tableName: "authors",
})
export default class Author extends Model {
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare id: number

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare username: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare state: string

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare avatar_url: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare web_url: string

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  declare group_id: number

  @HasMany(() => MergeRequest)
  merge_resquests: MergeRequest[]

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  declare commit_count: number

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  declare project_count: number
}
