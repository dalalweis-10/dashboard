function StatusBadge({ status, labels }) {
  const config = labels[status] ?? { text: status, className: "bg-gray-100 text-gray-600" };
  return <span className={`badge ${config.className}`}>{config.text}</span>;
}
function Card({ children, className = "" }) {
  return <div className={`card ${className}`}>{children}</div>;
}
function PageHeader({ title, subtitle, action }) {
  return <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-xl font-bold text-navy-500 dark:text-white">{title}</h1>
        {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>;
}
function EmptyState({ message }) {
  return <div className="text-center py-12 text-gray-400 dark:text-gray-500 text-sm">
      {message}
    </div>;
}
export {
  Card,
  EmptyState,
  PageHeader,
  StatusBadge
};
