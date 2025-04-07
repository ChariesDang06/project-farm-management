import { useNotification } from "../contexts/NotificationContext";
import NotificationCard from "./card/NotificationCard";

const NotificationContainer = () => {
    const { notifications } = useNotification();

    return (
        <div className="fixed top-4 right-4 w-[400px] z-50 mt-4 gap-4 ">
            {notifications.map((notif) => (
                <NotificationCard key={notif.id} {...notif} />
            ))}
        </div>
    );
};

export default NotificationContainer;
