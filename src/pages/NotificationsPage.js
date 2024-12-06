import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "You have a new message from Project A.", read: false },
    { id: 2, message: "Your task 'Design UI' is now in progress.", read: false },
    { id: 3, message: "Project B has been updated with new features.", read: false },
  ]);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const markAsRead = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
    setSnackbarMessage("Notification marked as read.");
    setOpenSnackbar(true);
  };

  const removeNotification = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
    setSnackbarMessage("Notification removed.");
    setOpenSnackbar(true);
  };

  return (
    <Box sx={{ py: 6, backgroundColor: "#f5f5f5" }}>
      <Container>
        <Typography variant="h4" textAlign="center" sx={{ fontWeight: 600, mb: 4 }}>
          Notifications
        </Typography>
        <Box sx={{ backgroundColor: "#fff", p: 3, borderRadius: 2, boxShadow: 3 }}>
          <List>
            {notifications.length === 0 ? (
              <Typography variant="body2" color="textSecondary" textAlign="center">
                No notifications.
              </Typography>
            ) : (
              notifications.map((notification) => (
                <React.Fragment key={notification.id}>
                  <ListItem sx={{ backgroundColor: notification.read ? "#e0e0e0" : "#fff" }}>
                    <ListItemText
                      primary={notification.message}
                      secondary={notification.read ? "Read" : "Unread"}
                    />
                    <Box sx={{ display: "flex", gap: 1 }}>
                      {!notification.read && (
                        <Button
                          size="small"
                          color="primary"
                          onClick={() => markAsRead(notification.id)}
                        >
                          Mark as Read
                        </Button>
                      )}
                      <Button
                        size="small"
                        color="error"
                        onClick={() => removeNotification(notification.id)}
                      >
                        Remove
                      </Button>
                    </Box>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))
            )}
          </List>
        </Box>
      </Container>

      {/* Snackbar for notifications */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Notifications;