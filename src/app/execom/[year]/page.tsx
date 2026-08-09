import Link from 'next/link';
import { Metadata } from 'next';
import { getExecomData, getAllExecomYears, Team, Member } from '@/lib/data';
import Image from 'next/image';

export async function generateStaticParams() {
  const years = getAllExecomYears();
  return years.map((year) => ({ year }));
}

export async function generateMetadata({ params }: { params: Promise<{ year: string }> }): Promise<Metadata> {
  const { year } = await params;
  const data = getExecomData(year);
  if (!data) return { title: 'ExeCom Not Found' };
  const displayYear = data.frontmatter?.year || year;
  return {
    title: `IEEE ExeCom ${displayYear}`,
    description: `IEEE Student Branch Executive Committee Directory for ${displayYear}`,
  };
}

export default async function YearPage({ params }: { params: Promise<{ year: string }> }) {
  const { year } = await params;
  const data = getExecomData(year);

  if (!data) return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
      <div className="p-8 text-center text-xl font-bold text-[#002B49] bg-white rounded-2xl border border-[#0066AF]/20 shadow-md">
        ExeCom data not found for term {year}.
      </div>
    </main>
  );

  const displayYear = data.frontmatter?.year || year;
  const teams: Team[] = Array.isArray(data.frontmatter?.teams) ? data.frontmatter.teams : [];
  const content = data.content ? data.content.trim() : '';

  return (
    <main className="min-h-screen bg-slate-50 text-[#020817] pb-20">
      {/* Top Banner Header */}
      <header className="bg-gradient-blue-navy text-white py-10 px-4 shadow-md mb-10">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
          <Link href="/" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-[#E0D9D9] hover:text-white mb-3 transition-colors">
            ← Back to All Directories
          </Link>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-2">
            IEEE ExeCom {displayYear}
          </h1>
          <p className="text-sm md:text-base text-blue-100 font-medium max-w-lg">
            Executive Committee leaders and official team member directory.
          </p>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 md:px-8 space-y-12">
        {/* About / Content Section from MDX */}
        {content && (
          <section className="text-center">
            <h2 className="text-2xl md:text-3xl font-black text-[#002B49] mb-4">About Our Chapter</h2>
            <div className="bg-gradient-hero-dark text-white p-8 md:p-12 rounded-3xl shadow-xl relative overflow-hidden border border-[#0066AF]/30 text-center flex flex-col items-center justify-center min-h-[160px]">
              <div className="text-lg md:text-2xl font-bold leading-relaxed whitespace-pre-line text-blue-50 max-w-2xl">
                {content}
              </div>
            </div>
          </section>
        )}

        {/* Team Modules (matching Figma wireframe dark container style) */}
        {teams.map((team: Team) => (
          <section key={team.name} className="relative">
            {/* Outer Dark Gradient Container */}
            <div className="bg-gradient-card-dark rounded-3xl p-6 md:p-10 shadow-2xl border border-[#0066AF]/30 pt-12 relative">
              {/* Floating Top Badge for Team Name */}
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-blue-navy text-white text-sm md:text-base font-extrabold px-6 py-2 rounded-full shadow-lg border border-white/20 uppercase tracking-wider">
                {team.name}
              </div>

              {/* Members Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch mt-4">
                {Array.isArray(team.members) && team.members.map((member: Member, index: number) => (
                  <Link
                    href={`/execom/${year}/${member.id}`}
                    key={member.id}
                    className="group flex flex-col items-center text-center focus:outline-none"
                  >
                    {/* White Square Photo Box */}
                    <div className="w-full aspect-square bg-white rounded-2xl border-4 border-white shadow-xl overflow-hidden relative group-hover:scale-105 transition-transform duration-300 flex items-center justify-center">
                      {member.photo ? (
                        <Image
                          src={member.photo}
                          alt={member.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          priority={index < 6}
                          unoptimized
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-black text-5xl text-[#0066AF] bg-blue-50">
                          {member.name ? member.name.charAt(0) : '?'}
                        </div>
                      )}
                    </div>

                    {/* Name & Position under Photo */}
                    <div className="mt-4 px-2">
                      <h3 className="font-bold text-lg text-white group-hover:text-blue-300 transition-colors line-clamp-1">
                        {member.name}
                      </h3>
                      <p className="text-xs font-semibold text-blue-200 uppercase tracking-wider mt-0.5">
                        {member.position}
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