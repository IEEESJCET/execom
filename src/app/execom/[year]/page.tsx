import Link from 'next/link';
import { Metadata } from 'next';
import { getExecomData, getAllExecomYears, Team, Member } from '@/lib/data';
import Image from 'next/image';
import { ArrowLeft, Sparkles, UserCheck } from 'lucide-react';

export async function generateStaticParams() {
  const years = getAllExecomYears();
  return years.map((year) => ({ year }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ year: string }>;
}): Promise<Metadata> {
  const { year } = await params;
  const data = getExecomData(year);
  if (!data) return { title: 'ExeCom Not Found' };
  const displayYear = data.frontmatter?.year || year;
  return {
    title: `IEEE ExeCom ${displayYear} Directory`,
    description: `IEEE Student Branch Executive Committee Directory for ${displayYear}`,
  };
}

export default async function YearPage({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year } = await params;
  const data = getExecomData(year);

  if (!data) {
    return (
      <main className="min-h-screen bg-[#dce8bd] flex items-center justify-center p-8 font-sans">
        <div className="p-8 text-center text-xl font-bold text-[#1c2e1b] bg-white rounded-3xl border-2 border-[#1c2e1b] shadow-[4px_4px_0px_#1c2e1b]">
          ExeCom data not found for term {year}.
          <div className="mt-4">
            <Link
              href="/"
              className="inline-block px-5 py-2 bg-[#f0fe54] text-[#1c2e1b] rounded-full text-sm font-extrabold border border-[#1c2e1b]"
            >
              Back to Directories
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const displayYear = data.frontmatter?.year || year;
  const teams: Team[] = Array.isArray(data.frontmatter?.teams)
    ? data.frontmatter.teams
    : [];
  const content = data.content ? data.content.trim() : '';

  return (
    <main className="min-h-screen bg-[#dce8bd] text-[#1c2e1b] pb-20 font-sans">

      {/* Top Banner Header */}
      <header className="px-4 pt-6 md:pt-10 max-w-5xl mx-auto mb-8">
        <div className="bg-[#1c2e1b] text-white rounded-3xl p-6 sm:p-10 border-2 border-[#1c2e1b] shadow-[6px_6px_0px_#1c2e1b] relative overflow-hidden text-center flex flex-col items-center justify-center">

          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#b0c897] hover:text-[#f0fe54] mb-4 transition-colors bg-white/10 px-4 py-1.5 rounded-full border border-white/10"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Directories</span>
          </Link>

          {/* Banner Title */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f0fe54] text-[#1c2e1b] font-black text-xs tracking-wider uppercase mb-3 border border-[#1c2e1b] shadow-sm">
            <Sparkles className="w-3.5 h-3.5 fill-[#1c2e1b]" />
            Official Term Directory
          </div>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase mb-2">
            IEEE ExeCom {displayYear}
          </h1>
          <p className="text-sm md:text-base text-[#b0c897] font-bold max-w-lg">
            Executive Committee leaders and official team member directory.
          </p>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 md:px-8 space-y-12">
        {/* About / Content Section from MDX */}
        {content && (
          <section className="text-center">
            <h2 className="text-xl md:text-2xl font-black uppercase text-[#1c2e1b] mb-3 tracking-tight">
              About Our Chapter
            </h2>
            <div className="bg-[#1c2e1b] text-white p-6 sm:p-10 rounded-3xl shadow-xl relative overflow-hidden border-2 border-[#1c2e1b] shadow-[4px_4px_0px_#1c2e1b] text-center flex flex-col items-center justify-center">
              <div className="text-base md:text-xl font-medium leading-relaxed whitespace-pre-line text-slate-100 italic max-w-2xl">
                &quot;{content}&quot;
              </div>
            </div>
          </section>
        )}

        {/* Team Modules */}
        {teams.map((team: Team) => (
          <section key={team.name} className="relative">
            <div className="bg-[#1c2e1b] rounded-[32px] p-6 sm:p-10 shadow-2xl border-2 border-[#1c2e1b] pt-12 relative">

              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#f0fe54] text-[#1c2e1b] text-sm md:text-base font-black px-6 py-2 rounded-full shadow-lg border-2 border-[#1c2e1b] shadow-[2px_2px_0px_#1c2e1b] uppercase tracking-wider whitespace-nowrap">
                {team.name}
              </div>

              {/* Members Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch mt-4">
                {Array.isArray(team.members) &&
                  team.members.map((member: Member, index: number) => (
                    <Link
                      href={`/execom/${year}/${member.id}`}
                      key={member.id}
                      className="group flex flex-col items-center text-center focus:outline-none"
                    >
                      <div className="w-full aspect-square bg-white rounded-2xl border-4 border-white shadow-xl overflow-hidden relative group-hover:scale-105 transition-transform duration-300 flex items-center justify-center">
                        {member.photo ? (
                          <Image
                            src={member.photo}
                            alt={member.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            priority={index < 6}
                            unoptimized
                            className="object-cover object-top"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center font-black text-5xl text-[#1c2e1b] bg-[#c2d7aa]">
                            {member.name ? member.name.charAt(0) : '?'}
                          </div>
                        )}
                      </div>

                      {/* Name & Position under Photo */}
                      <div className="mt-4 px-2">
                        <h3 className="font-black text-lg sm:text-xl text-white group-hover:text-[#f0fe54] transition-colors line-clamp-1">
                          {member.name}
                        </h3>
                        <p className="text-xs font-extrabold text-[#b0c897] uppercase tracking-wider mt-1 flex items-center justify-center gap-1">
                          <UserCheck className="w-3.5 h-3.5" />
                          <span>{member.position}</span>
                        </p>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}