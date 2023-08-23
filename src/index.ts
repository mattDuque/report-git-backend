import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors"
import sequelize from "./app/sequelize"
import cron from "node-cron"
import { axios } from "./axios"
import {
  createMergeRequest,
  getLatestMergeRequestDate,
  getMergeRequestsByAuthor,
} from "./app/controllers/mergeRequest.controller"
import { getAuthors } from "./app/controllers/author.controller"
import { getProjectIssues, getProjects } from "./util"
import { Commit, FilteredMergeRequest } from "../typings"
import message from "./message.json"
import fs from "fs"
import { getCommitsByCommitterName } from "./app/controllers/commit.controller"

const app = express()

const PORT = process.env.PORT || 8089

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Synced db.")
  })
  .catch((err: { message: string }) => {
    console.log("Failed to sync db: " + err.message)
  })

app.use(express.json())
app.use(cors({ origin: true }))
app.use(express.urlencoded({ extended: true }))

app.get("/dbsync", async (request, response) => {
  //@ts-ignore
  const data: FilteredMergeRequest[] = message
  data.forEach((mr, index) => {
    setTimeout(() => {
      createMergeRequest(mr)
      console.log(index)
    }, 50 * index)
  })
})


app.get("/getAuthors", async (request, response) => {
  const { data } = await getAuthors(parseInt(request.query.group_id as string))
  response.send(data)
})

app.get("/getCommitsByCommitterName", async (request, response) => {
  const { data } = await getCommitsByCommitterName()
  response.send(data)
})

app.get("/getMergeRequestsByAuthor", async (request, response) => {
  const { data } = await getMergeRequestsByAuthor(parseInt(request.query.author_id as string))
  response.send(data)
})

app.get("/test", async (request, response) => {
  const  data  = null

  const minDate = data ? new Date(data) : new Date(-8640000000000000)

  const filteredMergeRequests: FilteredMergeRequest[] = []

  getProjects([3,17,78,193]).then(projects => {
    const promises: Promise<FilteredMergeRequest[]>[] = []

    projects.forEach(project => {
      promises.push(getProjectIssues(project, minDate))
    })

    Promise.all(promises)
      .then(async res => {
        console.log(res.flat().length)
        filteredMergeRequests.push(...res.flat())

        const requests = filteredMergeRequests.map((mr, index) => {
          console.log(index)
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              axios
                .get(`/projects/${mr.project_id}/merge_requests/${mr.iid}/commits`)
                .then(commitResponse => {
                  mr.commits = commitResponse.data.map((commit: Commit) => {
                    return {
                      short_id: commit.short_id,
                      created_at: commit.created_at,
                      title: commit.title,
                      message: commit.message,
                      committer_email: commit.committer_email,
                      committed_date: commit.committed_date,
                      web_url: commit.web_url,
                    }
                  })

                  const diffRequests = mr.commits!.map(async commit => {
                    try {
                      const diffResponse = await axios.get(
                        `/projects/${mr.project_id}/repository/commits/${commit.short_id}`
                      )
                      commit.diffs = diffResponse.data.stats.additions
                    } catch (err: any) {
                      console.error(
                        `Error getting diff for commit ${commit.short_id}: ${err.message}`
                      )
                    }
                  })

                  return Promise.all(diffRequests)
                })
                .then(resolve)
                .catch(reject)
            }, 150 * index)
          })
        })

        Promise.all(requests)
          .then(() => {
            fs.writeFileSync("message.json", JSON.stringify(filteredMergeRequests, null, 2))
            response.send('ok')
            // filteredMergeRequests.forEach((mr, index) => {
            //   setTimeout(() => {
            //     createMergeRequest(mr)
            //     console.log(index)
            //   }, 50 * index)
            // })
          })
          .catch(err => {
            console.error(`Error in Promise.all: ${err.message}`)
          })
      })
      .catch(err => {
        console.error(`Error in Promise.all: ${err.message}`)
      })
  })
})

cron.schedule("0 0 0 * * *", async () => {
  const { data } = await getLatestMergeRequestDate()

  const minDate = data ? new Date(data) : new Date(-8640000000000000)

  const filteredMergeRequests: FilteredMergeRequest[] = []

  getProjects([3,17,78,193]).then(projects => {
    const promises: Promise<FilteredMergeRequest[]>[] = []

    projects.forEach(project => {
      promises.push(getProjectIssues(project, minDate))
    })

    Promise.all(promises)
      .then(async res => {
        console.log(res.flat().length)
        filteredMergeRequests.push(...res.flat())

        const requests = filteredMergeRequests.map((mr, index) => {
          console.log(index)
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              axios
                .get(`/projects/${mr.project_id}/merge_requests/${mr.iid}/commits`)
                .then(commitResponse => {
                  mr.commits = commitResponse.data.map((commit: Commit) => {
                    return {
                      short_id: commit.short_id,
                      created_at: commit.created_at,
                      title: commit.title,
                      message: commit.message,
                      committer_name: commit.committer_name,
                      committed_date: commit.committed_date,
                      web_url: commit.web_url,
                    }
                  })

                  const diffRequests = mr.commits!.map(async commit => {
                    try {
                      const diffResponse = await axios.get(
                        `/projects/${mr.project_id}/repository/commits/${commit.short_id}`
                      )
                      commit.diffs = diffResponse.data.stats.additions
                    } catch (err: any) {
                      console.error(
                        `Error getting diff for commit ${commit.short_id}: ${err.message}`
                      )
                    }
                  })

                  return Promise.all(diffRequests)
                })
                .then(resolve)
                .catch(reject)
            }, 150 * index)
          })
        })

        Promise.all(requests)
          .then(() => {
            filteredMergeRequests.forEach((mr, index) => {
              setTimeout(() => {
                createMergeRequest(mr)
                console.log(index)
              }, 50 * index)
            })
          })
          .catch(err => {
            console.error(`Error in Promise.all: ${err.message}`)
          })
      })
      .catch(err => {
        console.error(`Error in Promise.all: ${err.message}`)
      })
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
