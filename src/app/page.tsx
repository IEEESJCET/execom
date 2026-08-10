import Link from 'next/link';
import Image from 'next/image';
import { getAllExecomYears, getExecomData } from '@/lib/data';
import { ArrowRight, Sparkles, Users } from 'lucide-react';

export default function Home() {
  const availableYears = getAllExecomYears();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 bg-[#dce8bd] relative overflow-hidden font-sans">
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#1c2e1b]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#1c2e1b]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl w-full text-center relative z-10 my-auto py-8">

        {/* Top IEEE Logo & Status Badge */}
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="w-14 h-14 rounded-full bg-[#1c2e1b] p-3 flex items-center justify-center shadow-lg border-2 border-[#1c2e1b] mb-4 hover:scale-105 transition-transform">
            <Image
              src="/ieee mb white png.png"
              alt="IEEE Logo"
              width={32}
              height={32}
              unoptimized
              className="w-8 h-8 object-contain"
            />
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f0fe54] text-[#1c2e1b] font-black text-xs tracking-wider uppercase border border-[#1c2e1b] shadow-[2px_2px_0px_#1c2e1b]">
            <Sparkles className="w-3.5 h-3.5 fill-[#1c2e1b]" />
            IEEE Student Branch
          </div>
        </div>

        {/* Main Title & Description */}
        <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight uppercase text-[#1c2e1b] leading-tight">
          Executive Committee <br className="hidden sm:inline" />
          <span className="text-[#1c2e1b] underline decoration-[#f0fe54] decoration-8 underline-offset-4">
            Directory
          </span>
        </h1>

        <p className="text-base md:text-lg text-[#2d4c2b] mb-10 font-bold max-w-xl mx-auto leading-relaxed">
          Official directory of IEEE Student Branch executive committee leaders, team members, and official profiles.
        </p>

        {/* Directory Term Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
          {availableYears.map((year) => {
            const data = getExecomData(year);
            const displayYear = data?.frontmatter?.year || year;
            const teams = data?.frontmatter?.teams || [];
            const totalMembers = Array.isArray(teams)
              ? teams.reduce((acc, t) => acc + (Array.isArray(t.members) ? t.members.length : 0), 0)
              : 0;

            return (
              <Link
                key={year}
                href={`/execom/${year}`}
                className="group relative block p-6 sm:p-7 bg-[#1c2e1b] text-white rounded-3xl border-2 border-[#1c2e1b] shadow-[5px_5px_0px_#1c2e1b] hover:shadow-[8px_8px_0px_#1c2e1b] hover:-translate-y-1 transition-all duration-300 text-left overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#f0fe54]/15 rounded-full blur-2xl group-hover:bg-[#f0fe54]/30 transition-colors pointer-events-none" />

                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black uppercase tracking-widest text-[#f0fe54]">
                    ExeCom Term
                  </span>
                  <div className="w-9 h-9 rounded-full bg-[#f0fe54] text-[#1c2e1b] flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                    <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                  </div>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-white group-hover:text-[#f0fe54] transition-colors leading-none mb-2">
                  Term {displayYear}
                </h2>

                <div className="text-xs font-bold text-[#b0c897] flex items-center gap-1.5 mt-3 pt-3 border-t border-white/10">
                  <Users className="w-3.5 h-3.5" />
                  <span>{totalMembers > 0 ? `${totalMembers} Active Committee Members` : 'Official Directory'}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
