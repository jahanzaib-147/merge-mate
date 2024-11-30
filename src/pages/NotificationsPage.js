import React, { useEffect, useState } from "react";
import { List, ListItem, ListItemText, Typography, Divider } from "@mui/material";
import firebaseHelper from "../firebaseHelper";

const NotificationsPage = ({ userId, role }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const data = await firebaseHelper.read(`notifications/${userId}`);
      setNotifications(data || []);
    };
    fetchNotifications();
  }, [userId]);

  return (
    <div>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Notifications
      </Typography>
      <List>
        {notifications.map((notification, index) => (
          <React.Fragment key={index}>
            <ListItem>
              <ListItemText
                primary={notification.title}
                secondary={notification.message}
              />
            </ListItem>
            {index < notifications.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </div>
  );
};

export default NotificationsPage;
