import Button from './ui/Button'
import Select from './ui/Select'

function TaskFilters({
  statusFilter,
  priorityFilter,
  sortOrder,
  onStatusChange,
  onPriorityChange,
  onSortChange,
  onReset,
}) {
  return (
    <div className="toolbar">
      <div className="toolbar__group">
        <label className="field field--compact">
          <span>Status</span>
          <Select
            value={statusFilter}
            aria-label="Filter by status"
            onValueChange={onStatusChange}
            options={[
              { value: 'all', label: 'All statuses' },
              { value: 'Pending', label: 'Pending' },
              { value: 'In Progress', label: 'In Progress' },
              { value: 'Completed', label: 'Completed' },
            ]}
          >
          </Select>
        </label>

        <label className="field field--compact">
          <span>Priority</span>
          <Select
            value={priorityFilter}
            aria-label="Filter by priority"
            onValueChange={onPriorityChange}
            options={[
              { value: 'all', label: 'All priorities' },
              { value: 'Low', label: 'Low' },
              { value: 'Medium', label: 'Medium' },
              { value: 'High', label: 'High' },
            ]}
          >
          </Select>
        </label>
      </div>

      <div className="toolbar__group toolbar__group--end">
        <label className="field field--compact">
          <span>Sort by due date</span>
          <Select
            value={sortOrder}
            aria-label="Sort tasks by due date"
            onValueChange={onSortChange}
            options={[
              { value: 'earliest', label: 'Earliest first' },
              { value: 'latest', label: 'Latest first' },
            ]}
          >
          </Select>
        </label>

        <Button type="button" variant="secondary" onClick={onReset}>
          Reset filters
        </Button>
      </div>
    </div>
  );
}

export default TaskFilters;
