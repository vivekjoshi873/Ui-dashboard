export const PRIORITY_OPTIONS = ['Low', 'Medium', 'High']
export const STATUS_OPTIONS = ['Pending', 'In Progress', 'Completed']

export const NAV_ITEMS = [
  { id: 'all', label: 'All Tasks', status: 'all' },
  { id: 'pending', label: 'Pending Tasks', status: 'Pending' },
  { id: 'in-progress', label: 'In Progress', status: 'In Progress' },
  { id: 'completed', label: 'Completed Tasks', status: 'Completed' },
]

export function formatDate(dateString) {
  if (!dateString) {
    return 'No due date'
  }

  const date = new Date(dateString)

  if (Number.isNaN(date.getTime())) {
    return 'Invalid date'
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

export function normalizeTask(task) {
  const title = typeof task?.title === 'string' ? task.title.trim() : ''
  const description = typeof task?.description === 'string' ? task.description.trim() : ''

  const priority = PRIORITY_OPTIONS.includes(task?.priority) ? task.priority : 'Medium'
  const status = STATUS_OPTIONS.includes(task?.status) ? task.status : 'Pending'
  const dueDate = typeof task?.dueDate === 'string' ? task.dueDate : ''

  const sanitizedId =
    typeof task?.id === 'string' && task.id
      ? task.id
      : `task-${Date.now()}-${Math.random().toString(16).slice(2)}`

  return {
    id: sanitizedId,
    title,
    description,
    priority,
    status,
    dueDate,
  }
}

export function validateTaskData(task) {
  const normalized = normalizeTask(task)
  const errors = {}

  if (!normalized.title) {
    errors.title = 'Task title is required.'
  }

  if (!normalized.dueDate || Number.isNaN(new Date(normalized.dueDate).getTime())) {
    errors.dueDate = 'A valid due date is required.'
  }

  return { valid: Object.keys(errors).length === 0, errors, normalized }
}

export function parseStoredTasks(rawValue) {
  if (!rawValue || rawValue.trim() === '') {
    return []
  }

  try {
    const parsed = JSON.parse(rawValue)

    if (!Array.isArray(parsed)) {
      return []
    }

    return parsed
      .map((task) => {
        const { valid, normalized } = validateTaskData(task)
        return valid ? normalized : null
      })
      .filter(Boolean)
  } catch (error) {
    console.warn('Could not parse stored tasks:', error)
    return []
  }
}

export function getStatusCounts(tasks) {
  const counts = {
    total: tasks.length,
    pending: 0,
    inProgress: 0,
    completed: 0,
  }

  tasks.forEach((task) => {
    if (task.status === 'Pending') {
      counts.pending += 1
    }

    if (task.status === 'In Progress') {
      counts.inProgress += 1
    }

    if (task.status === 'Completed') {
      counts.completed += 1
    }
  })

  return counts
}

export function getViewTitle(activeView) {
  const match = NAV_ITEMS.find((item) => item.id === activeView)
  return match ? match.label : 'All Tasks'
}

export function getViewStatus(activeView) {
  const match = NAV_ITEMS.find((item) => item.id === activeView)
  return match ? match.status : 'all'
}
