import { useState } from 'react'
import Dashboard from './pages/Dashboard'
import { useLocalStorage } from './hooks/useLocalStorage'
import { normalizeTask } from './utils/taskHelpers'

function App() {
  const [tasks, setTasks] = useLocalStorage('task-dashboard-v1', [])
  const [activeView, setActiveView] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [sortOrder, setSortOrder] = useState('earliest')

  const handleCreateTask = (newTask) => {
    const normalizedTask = normalizeTask(newTask)
    setTasks((currentTasks) => [normalizedTask, ...currentTasks])
  }

  const handleUpdateTask = (taskId, updatedTask) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) => {
        if (task.id !== taskId) {
          return task
        }

        return {
          ...task,
          ...normalizeTask(updatedTask),
          id: taskId,
        }
      }),
    )
  }

  const handleDeleteTask = (taskId) => {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId))
  }

  return (
    <Dashboard
      tasks={tasks}
      onCreateTask={handleCreateTask}
      onUpdateTask={handleUpdateTask}
      onDeleteTask={handleDeleteTask}
      activeView={activeView}
      setActiveView={setActiveView}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      statusFilter={statusFilter}
      setStatusFilter={setStatusFilter}
      priorityFilter={priorityFilter}
      setPriorityFilter={setPriorityFilter}
      sortOrder={sortOrder}
      setSortOrder={setSortOrder}
    />
  )
}

export default App
