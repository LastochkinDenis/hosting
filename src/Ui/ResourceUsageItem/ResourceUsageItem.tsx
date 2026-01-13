import "./ResourceUsageItem.scss";

interface IProps {
  title: string;
  used: number;
  limit: number;
  unit?: string
}

const getPercentage = (used: number, total: number) => {
  return Math.round((used / total) * 100);
};

const getStatusColor = (percentage: number) => {
  if (percentage >= 80) return "#DE350B";
  if (percentage >= 50) return "#FFAB00";
  return "#135bec";
};

export default function ResourceUsageItem({title, used, limit, unit}: IProps) {
    return <div className="resource-usage-item">
        <div className="resource-usage-item__header">
        <span className="resource-usage-item__label">{title}</span>
        <span className="resource-usage-item__value">
            {used} {unit} / {limit} {unit}
        </span>
        </div>
        <div className="resource-usage-item__bar">
        <div
            className="resource-usage-item__bar-fill"
            style={{
                width: `${getPercentage(used, limit)}%`,
                backgroundColor: getStatusColor(getPercentage(used, limit)),
            }}
        />
        </div>
    </div>
}
