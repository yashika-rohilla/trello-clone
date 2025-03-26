import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { projects } from "../../data/projectsList"; 

export interface Task {
  id: string; 
  title: string;
  description: string;
  department: string;
  status: string;
  assigned_to: string;
  assigneeImage: string;
  due_date: string;
}

export interface Project {
  id: string; 
  title: string;
  description: string;
  coverImage: string;
  tasks: Task[];
}

interface ProjectsState {
  projects: Project[];
  projectsPerPage: number;
}

const parsedProjects: Project[] = projects.map((project) => ({
  ...project,
  id: String(project.id), 
  tasks: project.tasks.map((task) => ({
    ...task,
    id: String(task.id), 
  })),
}));

const initialState: ProjectsState = {
  projects: parsedProjects,
  projectsPerPage: 5,
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    updateTaskStatus: (
      state,
      action: PayloadAction<{ projectId: string; taskId: string; status: string }>
    ) => {
      const project = state.projects.find((p) => p.id === action.payload.projectId);
      if (project) {
        const task = project.tasks.find((t) => t.id === action.payload.taskId);
        if (task) {
          task.status = action.payload.status;
        }
      }
    },
  },
});

export const { updateTaskStatus } = projectsSlice.actions;
export default projectsSlice.reducer;
