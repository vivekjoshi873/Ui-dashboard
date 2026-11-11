import TaskCard from './TaskCard'

function TaskList({ tasks, onEdit, onDelete, onStatusChange }) {
  return (
    <div className="task-list" aria-live="polite">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  )
}

export default TaskList
