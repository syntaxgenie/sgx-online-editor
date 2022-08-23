import { firestore as db } from "../..";
import { Project } from "../../contexts/projects-context/ProjectsContext";

export interface defaultDoc {
  createdAt?: Date;
  updatedAt?: Date;
}

export enum COLLECTIONS {
  PROJECTS = "projects",
  USERS = "users",
}

const addNewProject = async (project: Project) => {
  return await db.collection(COLLECTIONS.PROJECTS).add(project);
};

const updateProject = async (project: Project) => {};

const deleteProject = async (project: Project) => {
  await db.collection(COLLECTIONS.PROJECTS).doc(project.id).delete();
};

const addProjectsListener = (
  ownerId: string,
  callback: (
    projects: Project[],
    type: "added" | "modified" | "removed"
  ) => void
) => {
  return db
    .collection(COLLECTIONS.PROJECTS)
    .where("owner", "==", ownerId)
    .onSnapshot((snapshot) => {
      const new_projects: Project[] = [];
      const updated_projects: Project[] = [];
      const delete_projects: Project[] = [];
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          new_projects.push({
            ...(change.doc.data() as any),
            id: change.doc.id,
          });
        }
        if (change.type === "modified") {
          updated_projects.push({
            ...(change.doc.data() as any),
            id: change.doc.id,
          });
        }
        if (change.type === "removed") {
          delete_projects.push({
            ...(change.doc.data() as any),
            id: change.doc.id,
          });
        }
      });
      callback(new_projects, "added");
      callback(updated_projects, "modified");
      callback(delete_projects, "removed");
    });
};

const updateProjectData = async (project: Project) => {
  await db.collection(COLLECTIONS.PROJECTS).doc(project.id).update(project);
};

const getUserName = async (uid: string) => {
  const querySnapshot = await db
    .collection("users")
    .where("uid", "==", uid)
    .get();
  const [doc] = querySnapshot.docs;
  const userData = doc.data();
  return userData.userName as string;
};

const deleteSharedProjectId = async (pid: string, uid: string) => {
  const querySnapshot = await db
    .collection("users")
    .where("uid", "==", uid)
    .get();
  const [user] = querySnapshot.docs;
  const sp: string[] = user.data().sharedProjects;
  const removed = sp.filter((id) => id !== pid);
  return await user.ref.update({ sharedProjects: removed });
};

const getUserData = async (uid: string) => {
  const querySnapshot = await db
    .collection("users")
    .where("uid", "==", uid)
    .get();
  const [doc] = querySnapshot.docs;
  const userData = doc.data();
  const projectIds: string[] = userData.sharedProjects || [];
  // const projects: Project[] = [];
  const projectPromises = projectIds.map(async (id) => {
    const project = await getProject(id);
    if (project) return project;
  });
  const x = await Promise.all(projectPromises);
  const projects:Project[] = x.filter((x) => x !== undefined) as Project[];

  return {
    username: userData.userName as string,
    sharedProjects: projects,
  };
};

const getProject = async (projectId: string): Promise<Project> => {
  const querySnapshot = await db
    .collection("projects")
    .where("id", "==", projectId)
    .get();
  const [doc] = querySnapshot.docs;
  const projectData = doc?.data() as Project;
  return projectData;
};

export {
  addNewProject,
  getUserData,
  updateProject,
  deleteProject,
  addProjectsListener,
  updateProjectData,
  getUserName,
  deleteSharedProjectId,
};
