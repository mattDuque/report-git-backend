import { fn, col } from 'sequelize'
import Commit from "../models/commit.model"

export async function getCommitsByCommitterName() {
  try {
    const commits = await Commit.findAll({
      attributes: [
        "committer_name",
        [fn('SUM', col('diffs')), "totalDiffs"]
      ],
      group: ["Commit.committer_name"]
    })
    return {
      message: "Commits retrieved successfully",
      data: commits,
    }
  } catch (error: any) {
    return {
      message: "Error retrieving commits",
      error: error.message,
    }
  }
}
