export interface Project {
  id: number
  description: string
  name: string
  name_with_namespace: string
  path: string
  path_with_namespace: string
  created_at: string
  default_branch: string
  tag_list: any[]
  topics: any[]
  ssh_url_to_repo: string
  http_url_to_repo: string
  web_url: string
  readme_url: string
  avatar_url: string
  forks_count: number
  star_count: number
  last_activity_at: string
  namespace: Namespace
  _links: Links
  packages_enabled: any
  empty_repo: boolean
  archived: boolean
  visibility: string
  resolve_outdated_diff_discussions: boolean
  issues_enabled: boolean
  merge_requests_enabled: boolean
  wiki_enabled: boolean
  jobs_enabled: boolean
  snippets_enabled: boolean
  container_registry_enabled: boolean
  service_desk_enabled: boolean
  service_desk_address: any
  can_create_merge_request_in: boolean
  issues_access_level: string
  repository_access_level: string
  merge_requests_access_level: string
  forking_access_level: string
  wiki_access_level: string
  builds_access_level: string
  snippets_access_level: string
  pages_access_level: string
  operations_access_level: string
  analytics_access_level: string
  container_registry_access_level: string
  security_and_compliance_access_level: string
  emails_disabled: any
  shared_runners_enabled: boolean
  lfs_enabled: boolean
  creator_id: number
  import_status: string
  open_issues_count: number
  ci_default_git_depth: any
  ci_forward_deployment_enabled: any
  ci_job_token_scope_enabled: boolean
  ci_separated_caches: boolean
  ci_opt_in_jwt: boolean
  ci_allow_fork_pipelines_to_run_in_parent_project: boolean
  public_jobs: boolean
  build_timeout: number
  auto_cancel_pending_pipelines: string
  ci_config_path: any
  shared_with_groups: SharedWithGroup[]
  only_allow_merge_if_pipeline_succeeds: boolean
  allow_merge_on_skipped_pipeline: boolean
  restrict_user_defined_variables: boolean
  request_access_enabled: boolean
  only_allow_merge_if_all_discussions_are_resolved: boolean
  remove_source_branch_after_merge: boolean
  printing_merge_request_link_enabled: boolean
  merge_method: string
  squash_option: string
  enforce_auth_checks_on_uploads: boolean
  suggestion_commit_message: string
  merge_commit_template: any
  squash_commit_template: any
  auto_devops_enabled: boolean
  auto_devops_deploy_strategy: string
  autoclose_referenced_issues: boolean
  keep_latest_artifact: boolean
  runner_token_expiration_interval: any
}

export interface Namespace {
  id: number
  name: string
  path: string
  kind: string
  full_path: string
  parent_id: any
  avatar_url: any
  web_url: string
}

export interface Links {
  self: string
  issues: string
  merge_requests: string
  repo_branches: string
  labels: string
  events: string
  members: string
  cluster_agents: string
}

export interface SharedWithGroup {
  group_id: number
  group_name: string
  group_full_path: string
  group_access_level: number
  expires_at: any
}

export interface FilteredIssue {
  IS: string
  project_id: number
  Status: string
  "Data Inicial": string
  "Data Fim": string
}

export interface Issue {
  id: number
  iid: number
  project_id: number
  title: string
  description: string
  state: string
  created_at: string
  updated_at: string
  closed_at: any
  closed_by: any
  labels: string[]
  milestone: any
  assignees: Assignee[]
  author: Author
  type: string
  assignee: Assignee
  user_notes_count: number
  merge_requests_count: number
  upvotes: number
  downvotes: number
  due_date: any
  confidential: boolean
  discussion_locked: any
  issue_type: string
  web_url: string
  time_stats: TimeStats
  task_completion_status: TaskCompletionStatus
  has_tasks: boolean
  _links: Links
  references: References
  severity: string
  moved_to_id: any
  service_desk_reply_to: any
}

export interface Commit {
  id: string
  short_id: string
  created_at: string
  parent_ids: string[]
  title: string
  message: string
  author_email: string
  authored_date: string
  committer_name: string
  committer_email: string
  committed_date: string
  trailers: any
  web_url: string
}

export interface FilteredCommit {
  [x: string]: any
  short_id: string
  created_at: string
  title: string
  message: string
  committer_email: string 
  committed_date: string
  web_url: string
  diffs?: number
}

export interface FilteredMergeRequest {
  iid: number
  project_id: number
  title: string
  state: string
  created_at: string
  group_id: number
  author: Author
  commits?: FilteredCommit[]
}

export interface MergeRequest {
  id: number
  iid: number
  project_id: number
  title: string
  description: string
  state: string
  created_at: string
  updated_at: string
  merged_by: any
  merge_user: any
  merged_at: any
  closed_by: any
  closed_at: any
  target_branch: string
  source_branch: string
  user_notes_count: number
  upvotes: number
  downvotes: number
  author: Author
  assignees: Assignee[]
  assignee: Assignee
  reviewers: Reviewer[]
  source_project_id: number
  target_project_id: number
  labels: string[]
  draft: boolean
  work_in_progress: boolean
  milestone: any
  merge_when_pipeline_succeeds: boolean
  merge_status: string
  sha: string
  merge_commit_sha: any
  squash_commit_sha: any
  discussion_locked: any
  should_remove_source_branch: any
  force_remove_source_branch: boolean
  reference: string
  references: References
  web_url: string
  time_stats: TimeStats
  squash: boolean
  task_completion_status: TaskCompletionStatus
  has_conflicts: boolean
  blocking_discussions_resolved: boolean
}

export interface Author {
  id: number
  username: string
  name: string
  state: string
  avatar_url: string | null
  web_url: string
  commit_count_range?: number
  project_count_range?: number
}

export interface Assignee {
  id: number
  username: string
  name: string
  state: string
  avatar_url: string
  web_url: string
}

export interface Reviewer {
  id: number
  username: string
  name: string
  state: string
  avatar_url: string
  web_url: string
}

export interface References {
  short: string
  relative: string
  full: string
}

export interface TimeStats {
  time_estimate: number
  total_time_spent: number
  human_time_estimate: any
  human_total_time_spent: any
}

export interface TaskCompletionStatus {
  count: number
  completed_count: number
}

export interface MembersByGroup { 
  group_id: number
  members: Member[]
}

export interface Member {
  id: number
  username: string
  name: string
  state: string
  avatar_url?: string
  web_url: string
  access_level: number
  created_at: string
  expires_at: any
  created_by?: CreatedBy
}

export interface CreatedBy {
  id: number
  username: string
  name: string
  state: string
  avatar_url: any
  web_url: string
}