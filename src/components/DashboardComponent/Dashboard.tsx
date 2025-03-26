import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { projects } from "../../data/projectsList";
import ProjectCard from "../ProjectCardComponent/ProjectCard";
import "./Dashboard.css";

const ITEMS_PER_PAGE = 4;

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProjects = projects.slice(startIndex, endIndex);

  const handleCardClick = (id: number) => {
    navigate(`/tasklist/${id}`);
  };

  return (
    <div className="dashboard">
      <h2 className="headingg mt-4 mb-3">Projects</h2>
      <div className="projects-container mb-4">
        {currentProjects.map((project, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(Number(project.id))}
            className="cursor">
            <ProjectCard
              title={project.title}
              description={project.description}
              coverImage={project.coverImage}
            />
          </div>
        ))}
      </div>

      <div className="pagination mt-5">
        <span className="ms-2">
          Page {currentPage} of {totalPages}
        </span>

        <div>
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}>
            Prev
          </button>

          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
