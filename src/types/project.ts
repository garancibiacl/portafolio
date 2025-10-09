export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
  github?: string;
  demo?: string;
  technologies: string[];
}
