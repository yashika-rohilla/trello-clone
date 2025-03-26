import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./TaskDetailsComponent.css";
import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
interface TaskDetailsProps {
  selectedTask: Task;
}
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Task, updateTaskStatus } from "../../redux/slices/projectsSlice";

const TaskDetailsComponent = ({ selectedTask }: TaskDetailsProps) => {
  const { projectId } = useParams<{ projectId: string }>();
  const dispatch = useDispatch();

  const handleMarkAsComplete = () => {
    const taskId = selectedTask?.id;
    dispatch(
      updateTaskStatus({
        projectId: projectId as string,
        taskId,
        status: "Done",
      })
    );
  };

  return (
    <div>
      <div className={`task-card ${selectedTask?.status.toLowerCase()}`}>
        <div className="task-header">
          <h3 className="task-title">{selectedTask?.title}</h3>
          <div className="d-flex"></div>
          <span className={`status-tag ${selectedTask?.status.toLowerCase()}`}>
            {selectedTask?.status}
          </span>
        </div>

        <div className="d-flex align-items-baseline">
          <span className="me-1">Description:</span>
          <p className="task-desc">{selectedTask?.description}</p>
        </div>
        <div className="task-footer mt-4">
          <div className="assignee">
            <img
              src={selectedTask?.assigneeImage}
              alt={"AssigneeImage"}
              className="assignee-img"
            />
            <div className="assigneeName">{selectedTask?.assigned_to}</div>
          </div>

          <div className="d-flex align-items-center">
            <FontAwesomeIcon className="me-2" icon={faCalendarAlt} />
            <span className="due-date">{selectedTask?.due_date}</span>
          </div>
        </div>
        <div className="mt-4">
          <input
            type="text"
            className="comment-box"
            placeholder="Ask a question or post an update..."
          />
          <div className="d-flex mt-4">
            <button className="Submit flex-fill">Submit</button>

            <button
              className="markasComplete flex-fill"
              onClick={handleMarkAsComplete}>
              Mark as Complete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsComponent;
