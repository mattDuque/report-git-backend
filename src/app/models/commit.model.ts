import { Table, Model, Column, DataType, HasOne, ForeignKey } from "sequelize-typescript"

import MergeRequest from "./mergeRequest.model"
import Author from "./author.model"

@Table({
  timestamps: true,
  tableName: "commits",
})
export default class Commit extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare short_id: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare created_at: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare title: string

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare message: string

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare committer_name: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare committer_email: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare committed_date: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare web_url: string

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare diffs: number

  @ForeignKey(() => MergeRequest)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: MergeRequest,
      key: "id",
    },
  })
  declare mergeRequestId: number
}
