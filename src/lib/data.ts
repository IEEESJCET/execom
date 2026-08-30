import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Member {
  id: string;
  name: string;
  position: string;
  department: string;
  class: string;
  photo?: string;
  links?: Record<string, string>;
  tagline?: string;
  bio?: string;
  status?: string;
  skills?: string[];
  connections?: string;
  projectsCount?: string;
  email?: string;
}

export interface Team {
  name: string;
  members: Member[];
}

export interface ExeComFrontmatter {
  year?: string;
  teams?: Team[];
  [key: string]: unknown;
}

export interface ExeComData {
  frontmatter: ExeComFrontmatter;
  content: string;
}

const contentDir = path.join(process.cwd(), 'content');

export function getAllExecomYears(): string[] {
  if (!fs.existsSync(contentDir)) return [];
  const files = fs.readdirSync(contentDir);
  return files
    .filter((file) => file.endsWith('.mdx') && file.startsWith('execom'))
    .map((file) => file.slice(6, -4));
}

export function getExecomData(year: string): ExeComData | null {
  const cleanYear = decodeURIComponent(year).trim();
  const filePath = path.join(contentDir, `execom${cleanYear}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);

  return { frontmatter: data as ExeComFrontmatter, content };
}

export function getMemberData(year: string, memberId: string): Member | null {
  const cleanYear = decodeURIComponent(year).trim();
  const cleanMemberId = decodeURIComponent(memberId).trim().toLowerCase();

  const data = getExecomData(cleanYear);
  const teams = data?.frontmatter?.teams;
  if (!Array.isArray(teams)) return null;

  for (const team of teams) {
    if (Array.isArray(team.members)) {
      const member = team.members.find(
        (m) => m && m.id && String(m.id).trim().toLowerCase() === cleanMemberId
      );
      if (member) return member;
    }
  }
  return null;
}

export function getAllMemberParams(): { year: string; id: string }[] {
  const years = getAllExecomYears();
  return years.flatMap((year) => {
    const data = getExecomData(year);
    const teams = data?.frontmatter.teams;
    if (!Array.isArray(teams)) return [];

    return teams.flatMap((team) =>
      Array.isArray(team.members)
        ? team.members
          .filter((member): member is Member => Boolean(member && member.id))
          .map((member) => ({ year, id: member.id }))
        : []
    );
  });
}