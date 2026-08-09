import { Metadata } from 'next';
import { getMemberData, getAllMemberParams } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';

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

  if (!member) return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="p-8 text-center text-xl font-bold text-[#002B49] bg-white rounded-2xl border border-[#0066AF]/20 shadow-md">
        Member profile not found.
      </div>
    </main>
  );

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-50 relative overflow-hidden">
      {/* Decorative Background Glows */}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-[#0066AF]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-[#002B49]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full relative z-10">
        {/* Navigation back link */}
        <Link
          href={`/execom/${year}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0066AF] hover:text-[#002B49] mb-4 transition-colors"
        >
          ← Back to ExeCom {year}
        </Link>

        {/* Member Profile Card using Figma dark gradient style */}
        <div className="bg-gradient-card-dark border border-[#0066AF]/30 rounded-3xl shadow-2xl p-8 text-center relative overflow-hidden text-white">
          {/* White Photo Box */}
          <div className="w-36 h-36 bg-white rounded-2xl mx-auto mb-6 border-4 border-white overflow-hidden relative shadow-xl flex items-center justify-center">
            {member.photo ? (
              <Image
                src={member.photo}
                alt={member.name}
                fill
                sizes="144px"
                priority
                unoptimized
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center font-black text-4xl text-[#0066AF] bg-blue-50">
                {member.name ? member.name.charAt(0) : '?'}
              </div>
            )}
          </div>

          <h1 className="text-3xl font-black text-white mb-1 tracking-tight">{member.name}</h1>
          <div className="inline-block px-4 py-1.5 rounded-full bg-[#0066AF] text-white font-bold text-xs uppercase tracking-wider mb-4 shadow-sm">
            {member.position}
          </div>
          <p className="text-blue-100 text-sm mb-8 font-medium leading-relaxed">
            {member.department} <br />
            <span className="text-blue-200 font-bold text-xs uppercase tracking-wider">Class: {member.class}</span>
          </p>

          <div className="flex flex-wrap justify-center gap-3 border-t border-white/10 pt-6">
            {member.links && Object.entries(member.links).map(([platform, url]) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-white text-[#002B49] hover:bg-blue-100 hover:text-[#0066AF] rounded-xl text-xs font-bold capitalize tracking-wide transition-all shadow-md hover:-translate-y-0.5"
              >
                {platform}
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}