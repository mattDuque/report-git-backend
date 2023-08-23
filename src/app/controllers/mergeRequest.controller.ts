import MergeRequest from "../models/mergeRequest.model"
import Author from "../models/author.model"
import Commit from "../models/commit.model"
import { FilteredMergeRequest } from "../../../typings"
import { Op } from "sequelize"

export async function createMergeRequest({
  iid,
  project_id,
  state,
  created_at,
  group_id,
  author,
  commits,
}: FilteredMergeRequest) {
  try {
    // Check if author with the same ID already exists in the database
    const existingAuthor = await Author.findByPk(author.id)

    let newMergeRequest

    if (existingAuthor) {
      // If author exists, use the setAuthor method to include it in the newMergeRequest object
      newMergeRequest = await MergeRequest.create(
        {
          iid: iid,
          project_id: project_id,
          state: state,
          created_at: created_at,
          group_id: group_id,
          author_id: existingAuthor.id,
          commits: commits,
        },
        {
          include: [Commit],
        }
      )
      existingAuthor.set({
        commit_count: (existingAuthor.commit_count += commits!.length),
        project_count: (existingAuthor.project_count += 1),
        group_id: group_id,
      })
      await existingAuthor.save()
    } else {
      // If author does not exist, create a new one
      newMergeRequest = await MergeRequest.create(
        {
          iid: iid,
          project_id: project_id,
          state: state,
          created_at: created_at,
          author: author,
          commits: commits,
          group_id: group_id
        },
        {
          include: [Commit, Author],
        }
      ).then(async () => {
        const newAuthor = await Author.findByPk(author.id)
        newAuthor!.set({
          commit_count: commits!.length,
          project_count: 1,
          group_id: group_id,
        })
        await newAuthor!.save()
      })
    }
    return {
      message: "Merge request created successfully",
      data: newMergeRequest,
    }
  } catch (error: any) {
    return {
      message: "Error creating merge request",
      error: error.message,
    }
  }
}

export async function getMergeRequestsByAuthor(authorId: number, date1?: string, date2?: string) {
  const startDate = date1 ? new Date(date1) : new Date(-8640000000000000)
  const endDate = date2 ? new Date(date2) : new Date(8640000000000000)

  try {
    // Find all merge requests created by the specified author within the given date range
    const mergeRequests = await MergeRequest.findAll({
      where: {
        author_id: authorId,
        created_at: {
          [Op.between]: [startDate, endDate],
        },
      },
      include: [Commit],
    })
    return {
      message: "Merge requests retrieved successfully",
      data: mergeRequests,
    }
  } catch (error: any) {
    return {
      message: "Error retrieving merge requests",
      error: error.message,
    }
  }
}

export async function getLatestMergeRequestDate() {
  try {
    // Find the latest merge request by created_at date
    const latestMergeRequest = await MergeRequest.findOne({
      order: [["created_at", "DESC"]],
    })

    // Return the created_at date of the latest merge request
    return {
      message: "Latest merge request date retrieved successfully",
      data: latestMergeRequest!.created_at,
    }
  } catch (error: any) {
    return {
      message: "Error retrieving latest merge request date",
      error: error.message,
    }
  }
}
