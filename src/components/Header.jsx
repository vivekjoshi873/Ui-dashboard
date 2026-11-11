import { Menu, Plus } from "lucide-react";
import SearchBar from "./SearchBar";
import Button from "./ui/Button";
import { Tooltip } from "./ui/Tooltip";

function Header({
  title,
  description,
  searchValue,
  onSearchChange,
  onAddTask,
  onToggleSidebar,
}) {
  return (
    <header className="topbar">
      <div className="topbar__left">
        <Tooltip content="Open navigation">
          <Button
            type="button"
            variant="icon"
            className="menu-button"
            onClick={onToggleSidebar}
            aria-label="Toggle navigation"
          >
            <Menu size={18} />
          </Button>
        </Tooltip>
        <div>
          <p className="eyebrow">Overview</p>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </div>

      <div className="topbar__actions">
        <SearchBar value={searchValue} onChange={onSearchChange} />
        <Button type="button" onClick={onAddTask}>
          <Plus size={16} />
          Add New Task
        </Button>
      </div>
    </header>
  );
}

export default Header;
