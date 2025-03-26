import AuthProtection from "../../components/AuthProtection/AuthProtection";
import Dashboard from "../../components/DashboardComponent/Dashboard";
import Sidebar from "../../components/SidebarComponent/Sidebar";
const DashboardPage = () => {
  return (
    <AuthProtection>
      <div className="DashboardPagecontainer">
        <div className="d-flex">
          <Sidebar />
          <Dashboard />
        </div>
      </div>
    </AuthProtection>
  );
};

export default DashboardPage;
