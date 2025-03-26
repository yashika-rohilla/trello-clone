import { useDraggable } from "@dnd-kit/core";
import { Task } from "../../redux/slices/projectsSlice";
import "./TaskCard.css";
import { useState } from "react";
import PopupComponent from "../PopupComponent/PopupComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import TaskDetailsComponent from "../TaskDetailsComponent/TaskDetailsComponent";

type CardProps = { data: Task };

const TaskCard: React.FC<CardProps> = ({ data }) => {
  const [selectedTask, setSelectedTask] = useState<Task>({} as Task);
  const isDisabled = data.status === "Done";
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: data.id,
    disabled: isDisabled,
  });

  return (
    <>
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        className={`projectCard-container mb-5 ${
          isDragging ? "dragging" : ""
        } ${data.status === "Done" ? "disabled-card" : ""}`}
        style={{ opacity: isDragging ? 0.5 : 1 }}>
        <div className="card-content">
          <div className="progress-bar"></div>
          <h3 className="title">{data.title}</h3>
          <p className="description">{data.description}</p>

          <span
            className={
              data.department === "Engineering" ? "tagblue" : "taggreen"
            }>
            {data.department || "Unknown"}
          </span>

          <div className="task-info mt-3">
            <div className="assignee-container">
              <img
                src={data.assigneeImage}
                alt="Assignee"
                className="assignee-image"
              />
              <span className="assignee-name">{data.assigned_to}</span>
            </div>

            <div className="task-meta">
              <FontAwesomeIcon icon={faComment} className="me-2" />
              <FontAwesomeIcon icon={faThumbsUp} />
            </div>
          </div>
          <div className="mt-3">
            <button
              className="btn enabled-button"
              onClick={() => {
                setIsPopupOpen(true);
                setSelectedTask(data);
              }}
              onPointerDown={(e) => e.stopPropagation()}>
              {" "}
              View Details
            </button>
          </div>
        </div>
      </div>

      <PopupComponent
        show={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        title={"Task Details"}>
        <TaskDetailsComponent selectedTask={selectedTask} />
      </PopupComponent>
    </>
  );
};

export default TaskCard;
