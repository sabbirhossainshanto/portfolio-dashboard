export interface IProject {
  _id: string;
  title: string;
  image: string;
  backendGithubLink: string;
  backendLiveLink: string;
  details: string;
  frontendGithubLink: string;
  frontendLiveLink: string;
  overview: string;
  technologies: string[];
  type: string;
}
