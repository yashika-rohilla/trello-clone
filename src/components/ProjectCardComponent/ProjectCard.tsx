import "./ProjectCard.css";

export interface ProjectProps {
  title: string;
  description: string;
  coverImage: string;
}

const ProjectCard = ({ title, description, coverImage }: ProjectProps) => {
  return (
    <div className="project-card">
      <div className="card-image">
        <img src={coverImage} alt={title} className="project-image" />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default ProjectCard;
