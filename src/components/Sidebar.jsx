import {
  CheckCheck,
  CircleDashed,
  FolderKanban,
  ListTodo,
  X,
} from "lucide-react";
import { DialogTitle } from "./ui/Dialog";
import Button from "./ui/Button";
import { Sheet, SheetContent } from "./ui/Sheet";

const navConfig = [
  { id: "all", label: "All Tasks", icon: ListTodo },
  { id: "pending", label: "Pending Tasks", icon: CircleDashed },
  { id: "in-progress", label: "In Progress", icon: FolderKanban },
  { id: "completed", label: "Completed Tasks", icon: CheckCheck },
];

function Sidebar({ activeView, onSelectView, isMobileOpen, onClose }) {
  const contents = (
    <>
      <div className="sidebar__header">
        <div className="brand-mark">T</div>
        <div className="brand-copy">
          <span className="brand-copy__name">TaskFlow</span>
        </div>
        <Button
          type="button"
          variant="icon"
          className="sidebar__close"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          <X size={18} />
        </Button>
      </div>

      <nav className="sidebar__nav" aria-label="Main navigation">
        {navConfig.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            className={
              activeView === id ? "nav-item nav-item--active" : "nav-item"
            }
            onClick={() => {
              onSelectView(id);
              onClose();
            }}
          >
            <span className="nav-item__icon">
              <Icon size={16} />
            </span>
            {label}
          </button>
        ))}
      </nav>

      <div className="sidebar__profile">
        <div className="avatar">JN</div>
        <div>
          <strong>Jordan</strong>
          <small>Product Lead</small>
        </div>
      </div>
    </>
  );

  return (
    <>
      <aside className="sidebar" aria-label="Sidebar navigation">
        {contents}
      </aside>

      <Sheet open={isMobileOpen} onOpenChange={(open) => !open && onClose()}>
        <SheetContent className="sidebar sidebar--sheet">
          <DialogTitle className="visually-hidden">Task navigation</DialogTitle>
          {contents}
        </SheetContent>
      </Sheet>
    </>
  );
}

export default Sidebar;
