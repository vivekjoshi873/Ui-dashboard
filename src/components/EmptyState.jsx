import { Plus, RotateCcw } from "lucide-react";
import Button from "./ui/Button";

function EmptyState({ type, onCreateTask, onResetFilters }) {
  if (type === "empty") {
    return (
      <div className="empty-state">
        <div className="empty-state__icon">✓</div>
        <h3>No tasks yet</h3>
        <p>Create your first task and start organizing your work.</p>
        <Button type="button" onClick={onCreateTask}>
          <Plus size={16} />
          Add Task
        </Button>
      </div>
    );
  }

  return (
    <div className="empty-state">
      <div className="empty-state__icon">!</div>
      <h3>No tasks match your filters</h3>
      <p>Try adjusting the search or filters to find the task you need.</p>
      <Button
        type="button"
        variant="secondary"
        onClick={onResetFilters}
      >
        <RotateCcw size={16} />
        Clear filters
      </Button>
    </div>
  );
}

export default EmptyState;
