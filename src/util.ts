import {
  Commit,
  FilteredMergeRequest,
  Member,
  MembersByGroup,
  MergeRequest,
  Project,
} from "../typings"
import { axios } from "./axios"

export async function getProjects(groupIds: number[]) {
  const projects: { id: number; groupId: number }[] = []

  // Iterate through each group ID
  for (const groupId of groupIds) {
    let currentPage = 1
    let totalPages = 0
    do {
      // Make the request to the API for the current group ID and page
      await axios
        .get(`/groups/${groupId}/projects/`, {
          params: { per_page: 100, page: currentPage++ },
        })
        .then(res => {
          totalPages = parseInt(res.headers["x-total-pages"]!)
          res.data.map((project: Project) => {
            if (groupId === 3) {
              if (project.id === 78) return
              if (project.id === 18) return
            }
            projects.push({ id: project.id, groupId: groupId })
          })
        })
        .catch(err => {
          console.log(err.code)
          console.log(err.message)
          console.log(err.stack)
        })
    } while (currentPage <= totalPages)
  }

  return projects
}

export async function getProjectIssues(project: { id: number; groupId: number }, minDate: Date) {
  let totalPages = 0
  const url = `projects/${project.id}/merge_requests/`
  const filteredMergeRequests: FilteredMergeRequest[] = []

  const pushData = (mergeRequests: MergeRequest[]) => {
    mergeRequests.forEach(mergeRequest => {
      const date = new Date(mergeRequest.created_at)
      if (date > minDate) {
        filteredMergeRequests.push({
          iid: mergeRequest.iid,
          project_id: mergeRequest.project_id,
          title: mergeRequest.title,
          state: mergeRequest.state,
          created_at: mergeRequest.created_at,
          group_id: project.groupId,
          author: mergeRequest.author,
        })
      }
    })
  }

  const pagesRequest: any = []
  await axios
    .get(url, {
      params: { per_page: 100, page: 1 },
    })
    .then(async res => {
      totalPages = parseInt(res.headers["x-total-pages"]!)
      pushData(res.data)
      if (totalPages > 1) {
        let page = 2
        while (page <= totalPages) {
          pagesRequest.push(
            axios
              .get(url, {
                params: { per_page: 100, page: page },
              })
              .then(res => pushData(res.data))
          )
          page++
        }
      }
      await Promise.all(pagesRequest)
    })
    .catch(err => {
      console.log(err.code)
      console.log(err.message)
      console.log(err.stack)
    })

  return filteredMergeRequests
}

export async function getMembersList(groupIds: number[]) {
  const allMembersByGroup: MembersByGroup[] = []

  groupIds.forEach(async id => {
    await axios.get(`groups/${id}/members`).then((res: { data: Member[] }) => {
      allMembersByGroup.push({
        group_id: id,
        members: res.data,
      })
    })
  })

  return allMembersByGroup
}
