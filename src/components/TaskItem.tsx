// src/components/TaskItem.tsx
import React from "react";
import { useDispatch } from "react-redux";
import { deleteTask, toggleTaskCompletion } from "../features/tasksSlice";
import { Task } from "../features/tasksSlice";
import { ListItem, ListItemText, IconButton, Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import Done from "@mui/icons-material/Done";
import { TaskModeProps } from "../App";

interface TaskItemProps extends TaskModeProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, taskMode, setTaskMode }) => {
  const dispatch = useDispatch();

  const handleView = (id: string) => {
    setTaskMode({ id, mode: "view" });
  };

  const handleEdit = (id: string) => {
    setTaskMode({ id, mode: "update" });
  };

  const handleToggle = (id: string) => {
    dispatch(toggleTaskCompletion(id));
  };

  return (
    <ListItem
      sx={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        mb: 2,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div>
        <div>{task.dueDate}</div>
        <div>
          <Grid container alignItems="center">
            <Grid item>
              <div
                className="Status"
                style={{ backgroundColor: task.completed ? "green" : "red" }}
              ></div>
            </Grid>
            <Grid item xs>
              <ListItemText primary={task.title} />
            </Grid>
            <Grid item marginLeft={25}>
              <IconButton
                edge="end"
                aria-label="view"
                onClick={() => {
                  handleView(task.id);
                }}
                sx={{ mr: 1 }}
              >
                <VisibilityIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => handleEdit(task.id)}
                sx={{ mr: 1 }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => {
                  dispatch(deleteTask(task.id));
                  setTaskMode(null);
                }}
                sx={{ mr: 1 }}
              >
                <DeleteIcon />
              </IconButton>

              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => {
                  handleToggle(task.id);
                }}
              >
                <Done />
              </IconButton>
            </Grid>
          </Grid>
        </div>
      </div>
    </ListItem>
  );
};

export default TaskItem;
