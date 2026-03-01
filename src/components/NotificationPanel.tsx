import { notifications } from "@/data/mockData";
import { UserPlus, Lightbulb, Trophy, X } from "lucide-react";

interface NotificationPanelProps {
  onClose: () => void;
}

const NotificationPanel = ({ onClose }: NotificationPanelProps) => {
  const getIcon = (type: string) => {
    switch (type) {
      case "follow":
        return <UserPlus className="w-4 h-4" />;
      case "suggestion":
        return <Lightbulb className="w-4 h-4" />;
      case "milestone":
        return <Trophy className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getIconBg = (type: string) => {
    switch (type) {
      case "follow":
        return "bg-blue-500";
      case "suggestion":
        return "bg-yellow-500";
      case "milestone":
        return "bg-primary";
      default:
        return "bg-muted";
    }
  };

  return (
    <div className="absolute top-full right-0 mt-2 w-80 bg-card rounded-md shadow-2xl border border-border overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="font-semibold">Notifications</h3>
        <button
          onClick={onClose}
          className="p-1 rounded hover:bg-accent transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="flex gap-3 p-4 hover:bg-accent/50 transition-colors cursor-pointer border-b border-border/50 last:border-0"
          >
            <div className={`w-10 h-10 rounded-full ${getIconBg(notification.type)} flex items-center justify-center flex-shrink-0`}>
              {getIcon(notification.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm">{notification.title}</p>
              <p className="text-muted-foreground text-sm truncate">
                {notification.description}
              </p>
              <p className="text-muted-foreground text-xs mt-1">
                {notification.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationPanel;
