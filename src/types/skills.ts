export interface Skill {
  name: string;
  level: number;
}

export interface SkillsData {
  heading: string;
  list: Skill[];
  techTags: string[];
}
