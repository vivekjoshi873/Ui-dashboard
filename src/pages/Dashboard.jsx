import { useEffect, useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import { NAV_ITEMS, getStatusCounts, getViewStatus, getViewTitle, normalizeTask } from '../utils/taskHelpers'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import SummaryCards from '../components/SummaryCards'
import TaskFilters from '../components/TaskFilters'
import TaskList from '../components/TaskList'
import TaskForm from '../components/TaskForm'
import ConfirmDialog from '../components/ConfirmDialog'
import EmptyState from '../components/EmptyState'
import Button from '../components/ui/Button'
import Separator from '../components/ui/Separator'

function Dashboard({
  tasks,
  onCreateTask,
  onUpdateTask,
  onDeleteTask,
  activeView,
  setActiveView,
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
  sortOrder,
  setSortOrder,
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [toast, setToast] = useState('')

  useEffect(() => {
    if (!toast) {
      return undefined
    }

    const timer = window.setTimeout(() => setToast(''), 2200)
    return () => window.clearTimeout(timer)
  }, [toast])

  const summaryStats = useMemo(() => {
    const counts = getStatusCounts(tasks)
    return {
      total: counts.total,
      pending: counts.pending,
      inProgress: counts.inProgress,
      completed: counts.completed,
    }
  }, [tasks])

  const filteredTasks = useMemo(() => {
    let nextTasks = [...tasks]
    const viewStatus = getViewStatus(activeView)

    if (viewStatus !== 'all') {
      nextTasks = nextTasks.filter((task) => task.status === viewStatus)
    }

    if (statusFilter !== 'all') {
      nextTasks = nextTasks.filter((task) => task.status === statusFilter)
    }

    if (priorityFilter !== 'all') {
      nextTasks = nextTasks.filter((task) => task.priority === priorityFilter)
    }

    if (searchTerm.trim()) {
      const searchValue = searchTerm.trim().toLowerCase()
      nextTasks = nextTasks.filter((task) => task.title.toLowerCase().includes(searchValue))
    }

    nextTasks.sort((left, right) => {
      const leftTime = new Date(left.dueDate).getTime()
      const rightTime = new Date(right.dueDate).getTime()
      return sortOrder === 'earliest' ? leftTime - rightTime : rightTime - leftTime
    })

    return nextTasks
  }, [activeView, priorityFilter, searchTerm, sortOrder, statusFilter, tasks])

  const pageTitle = getViewTitle(activeView)
  const pageDescription = `Keep progress organized across ${tasks.length} task${tasks.length === 1 ? '' : 's'}.`

  const handleCreateTask = () => {
    setEditingTask(null)
    setIsFormOpen(true)
  }

  const handleEditTask = (task) => {
    setEditingTask(task)
    setIsFormOpen(true)
  }

  const closeForm = () => {
    setIsFormOpen(false)
    setEditingTask(null)
  }

  const handleTaskSubmit = (formData) => {
    const normalizedTask = normalizeTask(formData)

    if (editingTask) {
      onUpdateTask(editingTask.id, normalizedTask)
      setToast('Task updated successfully.')
    } else {
      onCreateTask(normalizedTask)
      setToast('Task created successfully.')
    }

    closeForm()
  }

  const handleStatusChange = (taskId, nextStatus) => {
    const matchingTask = tasks.find((task) => task.id === taskId)

    if (!matchingTask) {
      return
    }

    onUpdateTask(taskId, {
      ...matchingTask,
      status: nextStatus,
    })

    setToast('Task status updated.')
  }

  const handleDeleteTask = (task) => {
    setDeleteTarget(task)
  }

  const confirmDelete = () => {
    if (!deleteTarget) {
      return
    }

    onDeleteTask(deleteTarget.id)
    setDeleteTarget(null)
    setToast('Task deleted successfully.')
  }

  const resetFilters = () => {
    setSearchTerm('')
    setStatusFilter('all')
    setPriorityFilter('all')
    setSortOrder('earliest')
    setActiveView('all')
  }

  const showEmptyState = tasks.length === 0
  const showNoResults = !showEmptyState && filteredTasks.length === 0

  return (
    <div className="app-shell">
      <Sidebar
        activeView={activeView}
        onSelectView={setActiveView}
        isMobileOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="page-shell">
        <Header
          title={pageTitle}
          description={pageDescription}
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          onAddTask={handleCreateTask}
          onToggleSidebar={() => setIsSidebarOpen((current) => !current)}
        />

        <main className="main-content">
          <SummaryCards stats={summaryStats} />

          <div className="panel">
            <div className="panel__head">
              <div>
                <p className="eyebrow">Manage work</p>
                <h2>Task board</h2>
              </div>
              <Button type="button" onClick={handleCreateTask}>
                <Plus size={16} />
                Add new task
              </Button>
            </div>

            <Separator className="panel-separator" />

            <TaskFilters
              statusFilter={statusFilter}
              priorityFilter={priorityFilter}
              sortOrder={sortOrder}
              onStatusChange={setStatusFilter}
              onPriorityChange={setPriorityFilter}
              onSortChange={setSortOrder}
              onReset={resetFilters}
            />

            {showEmptyState ? (
              <EmptyState type="empty" onCreateTask={handleCreateTask} onResetFilters={resetFilters} />
            ) : showNoResults ? (
              <EmptyState type="no-results" onCreateTask={handleCreateTask} onResetFilters={resetFilters} />
            ) : (
              <TaskList
                tasks={filteredTasks}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                onStatusChange={handleStatusChange}
              />
            )}
          </div>
        </main>
      </div>

      <TaskForm
        isOpen={isFormOpen}
        task={editingTask}
        onClose={closeForm}
        onSubmit={handleTaskSubmit}
        submitLabel={editingTask ? 'Save changes' : 'Create task'}
      />

      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        taskTitle={deleteTarget?.title || ''}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
      />

      {toast ? <div className="toast">{toast}</div> : null}
    </div>
  )
}

export default Dashboard
