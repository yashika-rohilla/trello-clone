import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useParams } from "react-router-dom";
import "./TaskListPage.css";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  useDroppable,
} from "@dnd-kit/core";
import { Task, updateTaskStatus } from "../../redux/slices/projectsSlice";
import { useState } from "react";
import TaskCard from "../../components/TaskCardComponent/TaskCard";
import DashboardPanelComponent from "../../components/DashboardPanelComponent/DashboardPanelComponent";
import AuthProtection from "../../components/AuthProtection/AuthProtection";

const DroppableColumn = ({
  status,
  tasks,
}: {
  status: string;
  tasks: Task[];
}) => {
  const { setNodeRef } = useDroppable({ id: status });

  return (
    <div className="col-md-3">
      <div className="heading mb-3">{status}</div>
      <div ref={setNodeRef} className="tasks-container">
        {tasks.length > 0 ? (
          tasks.map((task) => <TaskCard key={task.id} data={task} />)
        ) : (
          <p>No Task</p>
        )}
      </div>
    </div>
  );
};

const TaskListPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const dispatch = useDispatch();
  const { projects } = useSelector((state: RootState) => state.projects);

  const selectedProject = projects.find((p) => p.id === projectId);

  const tasksByStatus = selectedProject
    ? {
        Backlog: selectedProject.tasks.filter(
          (task) => task.status === "Backlog"
        ),
        Ready: selectedProject.tasks.filter((task) => task.status === "Ready"),
        InProgress: selectedProject.tasks.filter(
          (task) => task.status === "InProgress"
        ),
        Done: selectedProject.tasks.filter((task) => task.status === "Done"),
      }
    : { Backlog: [], Ready: [], InProgress: [], Done: [] };

  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    const taskId = event.active.id as string;
    const task = selectedProject?.tasks.find((t) => t.id === taskId);
    if (task) {
      setActiveTask(task);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);
    if (!over || !selectedProject) return;

    const taskId = active.id as string;
    const newStatus = over.id as Task["status"];

    dispatch(
      updateTaskStatus({
        projectId: projectId as string,
        taskId,
        status: newStatus,
      })
    );
  };

  return (
    <AuthProtection>
      <div className="tasklist">
        <DashboardPanelComponent />

        <div className="taskPanelPadding">
          <h2 className="taskPanelheading">
            {selectedProject ? selectedProject.title : "Project Not Found"}
          </h2>
          <p className="mb-4">
            {selectedProject ? selectedProject.description : null}
          </p>

          <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <div className="row">
              <DroppableColumn status="Backlog" tasks={tasksByStatus.Backlog} />
              <DroppableColumn
                status="InProgress"
                tasks={tasksByStatus.InProgress}
              />
              <DroppableColumn status="Ready" tasks={tasksByStatus.Ready} />
              <DroppableColumn status="Done" tasks={tasksByStatus.Done} />
            </div>

            <DragOverlay>
              {activeTask && <TaskCard data={activeTask} />}
            </DragOverlay>
          </DndContext>
        </div>
      </div>
    </AuthProtection>
  );
};

export default TaskListPage;
