import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, editTask } from "../features/tasksSlice";
import { v4 as uuidv4 } from "uuid";
import { Box, TextField, Button } from "@mui/material";
import { TaskModeProps } from "../App";
import { RootState } from "../store";

const TaskForm: React.FC<TaskModeProps> = ({ taskMode, setTaskMode }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [completed, setCompleted] = useState(false);

  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      addTask({ id: uuidv4(), title, description, completed: false, dueDate })
    );
    setTitle("");
    setDescription("");
    setDueDate("");
  };

  useEffect(() => {
    if (taskMode) {
      const task = tasks.find((tsk) => tsk.id === taskMode.id);
      if (task) {
        setTitle(task?.title);
        setDescription(task.description);
        setDueDate(task.dueDate);
        setCompleted(task.completed);
      }
    }
  }, [taskMode]);

  const handleEditTask = () => {
    if (taskMode)
      dispatch(
        editTask({ id: taskMode?.id, title, description, dueDate, completed })
      );
    setTaskMode(null);
  };

  return (
    <Box
      component="form"
      onSubmit={taskMode?.mode === "update" ? handleEditTask : handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        // maxWidth: 600,
        width: "40%",
        height: "auto",
        margin: "auto",
        padding: 2,
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <TextField
        label="Title"
        variant="outlined"
        value={title}
        onChange={(e) => {
          if (taskMode?.mode !== "view") setTitle(e.target.value);
        }}
        fullWidth
        required
      />
      <TextField
        label="Description"
        variant="outlined"
        value={description}
        onChange={(e) => {
          if (taskMode?.mode !== "view") setDescription(e.target.value);
        }}
        multiline
        rows={4}
        fullWidth
        required
      />
      <TextField
        label="Due Date"
        variant="outlined"
        type="date"
        value={dueDate}
        onChange={(e) => {
          if (taskMode?.mode !== "view") setDueDate(e.target.value);
        }}
        InputLabelProps={{
          shrink: true,
        }}
        fullWidth
        required
      />
      {taskMode === null && (
        <Button variant="contained" color="primary" type="submit">
          Add Task
        </Button>
      )}
      {taskMode?.mode === "update" && (
        <Button variant="contained" color="primary" type="submit">
          Update
        </Button>
      )}
    </Box>
  );
};

export default TaskForm;
