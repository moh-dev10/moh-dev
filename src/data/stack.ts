export type SkillGroup = {
  title: string;
  description: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Core",
    description: "Technologies I use to build production websites and web experiences.",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "WordPress",
      "WooCommerce",
    ],
  },
  {
    title: "Working Knowledge",
    description: "Tools and technologies I'm actively using to build full-stack applications.",
    skills: [
      "Node.js",
      "Express",
      "PostgreSQL",
      "Prisma",
      "REST APIs",
      "Supabase",
      "Git",
      "GitHub",
    ],
  },
  {
    title: "Exploring",
    description: "Technologies I'm currently learning and experimenting with.",
    skills: [
      "Python",
      "AI",
      "Automation",
      "n8n",
    ],
  },
];