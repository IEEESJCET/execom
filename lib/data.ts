import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'content');

export function getAllExecomYears() {
  if (!fs.existsSync(contentDir)) return [];
  const files = fs.readdirSync(contentDir);
  return files
    .filter((file: string) => file.endsWith('.mdx') && file.startsWith('execom'))
    .map((file: string) => file.replace('execom', '').replace('.mdx', ''));
}

export function getExecomData(year: string) {
  const filePath = path.join(contentDir, `execom${year}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);

  return { frontmatter: data, content };
}

export function getMemberData(year: string, memberId: string) {
  const data = getExecomData(year);
  if (!data) return null;

  for (const team of data.frontmatter.teams) {
    const member = team.members.find((m: any) => m.id === memberId);
    if (member) return member;
  }
  return null;
}