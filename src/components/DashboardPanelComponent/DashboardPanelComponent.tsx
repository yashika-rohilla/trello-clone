import "./DashboardPanelComponent.css";
import trelloLogo from "../../assets/images/trelloLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const DashboardPanelComponent = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <div className="dashboard-panel">
      <div className="left-section">
        <span className="brand">
          <img src={trelloLogo} alt="Trello Logo" className="logo" />
          Sprint Plans
        </span>
        <div className="nav-links">
          <span>Overview</span>
          <span>List</span>
          <span className="active">Board</span>
          <span>Timeline</span>
          <span>Calendar</span>
          <span>Dashboard</span>
          <span>Messages</span>
          <span>More...</span>
        </div>
      </div>

      <div className="right-section">
        <input type="text" className="search-bar" placeholder="Search" />

        <div className="avatars me-2">
          <img
            src="data:image/jpeg;base64,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"
            alt="User 1"
          />
        </div>
        <FontAwesomeIcon
          icon={faSignOut}
          className="cursor"
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};

export default DashboardPanelComponent;
