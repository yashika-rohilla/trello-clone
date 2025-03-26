import "./Sidebar.css";
import trelloLogo from "../../../src/assets/images/trelloLogo.png";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <img src={trelloLogo} alt="Trello Logo" className="logo" />
      </div>
      <ul className="menu">
        <li className="active">Dashboard</li>
        <li>Team</li>
        <li>Workflows </li>
        <li>Reports</li>
        <li>Notifications </li>
        <li>Settings</li>
      </ul>
    </div>
  );
};

export default Sidebar;
