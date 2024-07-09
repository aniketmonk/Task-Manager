// src/components/TaskList.tsx
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import TaskItem from "./TaskItem";
import { List, Box, Typography } from "@mui/material";
import { TaskModeProps } from "../App";
import SelectInput from "./Filter";

const TaskList: React.FC<TaskModeProps> = ({ taskMode, setTaskMode }) => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const { filter } = useSelector((state: RootState) => state.tasks);

  useEffect(() => {}, [filter]);
  return (
    <div className="TaskListWrapper">
      <Box sx={{ width: "500px", margin: "auto", mt: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Task List
        </Typography>
        <SelectInput />
        <List>
          {tasks
            .filter((tsk) => {
              if (filter === "all") {
                return true;
              }
              if (filter === "complete") {
                return tsk.completed;
              }
              if (filter === "incomplete") {
                return !tsk.completed;
              }
              return true;
            })
            .map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                taskMode={taskMode}
                setTaskMode={setTaskMode}
              />
            ))}
        </List>
      </Box>
    </div>
  );
};

export default TaskList;
