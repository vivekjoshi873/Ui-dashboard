import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from '../utils/taskHelpers'
import Button from './ui/Button'
import Input from './ui/Input'
import Textarea from './ui/Textarea'
import Select from './ui/Select'
import Calendar from './ui/Calendar'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from './ui/Dialog'

const EMPTY_FORM = {
  title: '',
  description: '',
  priority: 'Medium',
  dueDate: '',
  status: 'Pending',
}

function TaskForm({ isOpen, task, onClose, onSubmit, submitLabel }) {
  const [formState, setFormState] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (!isOpen) {
      return
    }

    if (task) {
      setFormState({
        title: task.title,
        description: task.description || '',
        priority: task.priority || 'Medium',
        dueDate: task.dueDate || '',
        status: task.status || 'Pending',
      })
      setErrors({})
      return
    }

    setFormState(EMPTY_FORM)
    setErrors({})
  }, [isOpen, task])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormState((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const validationErrors = {}
    const trimmedTitle = formState.title.trim()

    if (!trimmedTitle) {
      validationErrors.title = 'Task title is required.'
    }

    if (!formState.dueDate) {
      validationErrors.dueDate = 'Due date is required.'
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    onSubmit({
      ...formState,
      title: trimmedTitle,
    })
  }

  const handleSelectChange = (name, value) => {
    setFormState((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="task-form">
        <div className="task-form__header">
          <div>
            <p className="eyebrow">Task details</p>
            <DialogTitle>{task ? 'Edit task' : 'Add new task'}</DialogTitle>
            <DialogDescription>
              {task ? 'Update the details and keep your work on track.' : 'Add the details for your new task.'}
            </DialogDescription>
          </div>
          <DialogClose asChild>
            <Button type="button" variant="icon" aria-label="Close form">
              <X size={18} />
            </Button>
          </DialogClose>
        </div>

        <form onSubmit={handleSubmit} className="task-form__content">
          <label className="field">
            <span>Title <span className="field-required" aria-hidden="true">*</span></span>
            <Input
              name="title"
              type="text"
              value={formState.title}
              onChange={handleChange}
              placeholder="Enter a task title"
              aria-invalid={Boolean(errors.title)}
              aria-describedby={errors.title ? 'task-title-error' : undefined}
              autoFocus
            />
            {errors.title ? (
              <small className="field-error" id="task-title-error">{errors.title}</small>
            ) : null}
          </label>

          <label className="field">
            <span>Description</span>
            <Textarea
              name="description"
              rows="4"
              value={formState.description}
              onChange={handleChange}
              placeholder="Add a short description"
            />
          </label>

          <div className="task-form__row">
            <label className="field">
              <span>Priority</span>
              <Select
                value={formState.priority}
                onValueChange={(value) => handleSelectChange('priority', value)}
                aria-label="Task priority"
                options={PRIORITY_OPTIONS.map((priority) => ({ value: priority, label: priority }))}
              >
              </Select>
            </label>

            <label className="field">
              <span>Due date <span className="field-required" aria-hidden="true">*</span></span>
              <Calendar
                value={formState.dueDate}
                onChange={(value) => setFormState((current) => ({ ...current, dueDate: value }))}
                onErrorClear={() => setErrors((current) => ({ ...current, dueDate: '' }))}
                hasError={Boolean(errors.dueDate)}
                errorId="task-date-error"
              />
              {errors.dueDate ? (
                <small className="field-error" id="task-date-error">{errors.dueDate}</small>
              ) : null}
            </label>
          </div>

          <label className="field">
            <span>Status</span>
            <Select
              value={formState.status}
              onValueChange={(value) => handleSelectChange('status', value)}
              aria-label="Task status"
              options={STATUS_OPTIONS.map((status) => ({ value: status, label: status }))}
            >
            </Select>
          </label>

          <div className="task-form__actions">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {submitLabel}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default TaskForm
