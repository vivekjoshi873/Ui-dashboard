import { CalendarDays, MoreHorizontal } from 'lucide-react'
import { STATUS_OPTIONS, formatDate } from '../utils/taskHelpers'
import Badge from './ui/Badge'
import Button from './ui/Button'
import Select from './ui/Select'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/DropdownMenu'
import { Tooltip } from './ui/Tooltip'

function getPriorityClass(priority) {
  return priority.toLowerCase()
}

function getStatusClass(status) {
  return status.toLowerCase().replace(/\s+/g, '-')
}

function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  return (
    <article className="task-card">
      <div className="task-card__topline">
        <div>
          <h3 className="task-card__title">{task.title}</h3>
          <p>{task.description || "No description provided."}</p>
        </div>
        <div className="task-card__badges">
          <Badge variant={getPriorityClass(task.priority)}>{task.priority}</Badge>
          <Badge variant={getStatusClass(task.status)}>{task.status}</Badge>
        </div>
      </div>

      <div className="task-card__meta">
        <span className="task-card__date">
          <CalendarDays size={15} />
          {formatDate(task.dueDate)}
        </span>
      </div>

      <div className="task-card__footer">
        <label className="field field--status">
          <span>Status</span>
          <Select
            aria-label={`Update status for ${task.title}`}
            value={task.status}
            onValueChange={(value) => onStatusChange(task.id, value)}
            options={STATUS_OPTIONS.map((status) => ({ value: status, label: status }))}
          >
          </Select>
        </label>

        <div className="task-card__actions">
          <DropdownMenu>
            <Tooltip content="Task actions">
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="icon"
                  aria-label={`Actions for ${task.title}`}
                >
                  <MoreHorizontal size={18} />
                </Button>
              </DropdownMenuTrigger>
            </Tooltip>
            <DropdownMenuContent>
              <DropdownMenuItem onSelect={() => onEdit(task)}>Edit task</DropdownMenuItem>
              <DropdownMenuItem
                className="ui-menu-item--danger"
                onSelect={() => onDelete(task)}
              >
                Delete task
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </article>
  )
}

export default TaskCard
