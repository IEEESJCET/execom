import { Metadata } from 'next';
import { getMemberData, getAllMemberParams } from '@/lib/data';
import Image from 'next/image';

export async function generateStaticParams() {
  return getAllMemberParams();
}

export async function generateMetadata({ params }: { params: Promise<{ year: string, id: string }> }): Promise<Metadata> {
  const { year, id } = await params;
  const member = getMemberData(year, id);
  if (!member) return { title: 'Member Not Found' };

  return {
    title: `${member.name} | ${member.position}`,
    description: `${member.department} - ${member.class}`,
  };
}

export default async function MemberProfile({ params }: { params: Promise<{ year: string, id: string }> }) {
  const { year, id } = await params;
  const member = getMemberData(year, id);

  if (!member) return <div className="p-8 text-center text-xl font-bold">Profile not found.</div>;

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="max-w-md w-full bg-white border border-gray-200 rounded-2xl shadow-xl p-8 text-center">
        <div className="w-32 h-32 bg-gray-100 rounded-full mx-auto mb-5 border-4 border-blue-600 overflow-hidden relative shadow-inner">
          {member.photo ? (
            <Image
              src={member.photo}
              alt={member.name}
              fill
              sizes="128px"
              priority
              unoptimized
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center font-bold text-[40px] text-gray-400 bg-gray-200">
              {member.name ? member.name.charAt(0) : '?'}
            </div>
          )}
        </div>

        <h1 className="text-3xl font-extrabold text-gray-900 mb-1">{member.name}</h1>
        <p className="text-blue-700 font-bold mb-3 text-lg">{member.position}</p>
        <p className="text-gray-600 text-sm mb-8 font-medium">{member.department} <br /> {member.class}</p>

        <div className="flex flex-wrap justify-center gap-3">
          {member.links && Object.entries(member.links).map(([platform, url]) => (
            <a
              key={platform}
              href={url as string}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-sm font-bold capitalize transition-colors shadow-sm"
            >
              {platform}
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}