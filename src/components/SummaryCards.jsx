import { CheckCheck, CircleDashed, FolderKanban, ListTodo } from "lucide-react";
import Card from "./ui/Card";

const summaryConfig = [
  { key: "total", label: "Total Tasks", icon: ListTodo },
  { key: "pending", label: "Pending", icon: CircleDashed },
  { key: "inProgress", label: "In Progress", icon: FolderKanban },
  { key: "completed", label: "Completed", icon: CheckCheck },
];

function SummaryCards({ stats }) {
  return (
    <section className="summary-grid" aria-label="Task summary">
      {summaryConfig.map(({ key, label, icon: Icon }) => (
        <Card key={key} className="summary-card">
          <div className="summary-card__icon summary-card__icon--accent">
            <Icon size={18} />
          </div>
          <div>
            <p>{label}</p>
            <strong>{stats[key]}</strong>
          </div>
        </Card>
      ))}
    </section>
  );
}

export default SummaryCards;
