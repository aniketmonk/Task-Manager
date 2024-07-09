import { useState } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskLists";
import { TaskMode } from "./features/tasksSlice";
import { useSelector } from "react-redux";
import { RootState } from "./store";
export interface TaskModeProps {
  taskMode: TaskMode | null;
  setTaskMode: React.Dispatch<React.SetStateAction<TaskMode | null>>;
}
function App() {
  const [taskMode, setTaskMode] = useState<TaskMode | null>(null);
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  return (
    <>
      <div className="DashBoard">
        <div>
          Completed Tasks:{tasks.filter((tsk) => tsk.completed).length}{" "}
        </div>
        <div>
          Incompleted Tasks:{tasks.filter((tsk) => !tsk.completed).length}{" "}
        </div>
        <div>Total Task:{tasks.length}</div>
      </div>
      <div className="App">
        <TaskForm taskMode={taskMode} setTaskMode={setTaskMode} />
        <TaskList taskMode={taskMode} setTaskMode={setTaskMode} />
      </div>
    </>
  );
}

export default App;
