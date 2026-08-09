import Link from 'next/link';
import { getAllExecomYears } from '@/lib/data';

export default function Home() {
  const availableYears = getAllExecomYears();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 bg-slate-50 relative overflow-hidden">
      {/* Decorative background glow elements using Figma color palette */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#0066AF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#002B49]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl w-full text-center relative z-10">
        {/* Top IEEE Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0066AF]/10 border border-[#0066AF]/20 text-[#0066AF] font-bold text-xs tracking-wider uppercase mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#0066AF] animate-pulse" />
          IEEE Student Branch
        </div>

        <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight text-[#002B49]">
          Executive Committee <span className="text-gradient-blue-navy">Directory</span>
        </h1>
        <p className="text-lg md:text-xl text-[#656565] mb-12 font-medium max-w-xl mx-auto leading-relaxed">
          Access past and present leadership teams, executive members, and official profiles.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
          {availableYears.map((year) => (
            <Link
              key={year}
              href={`/execom/${year}`}
              className="group relative block p-6 bg-white border border-[#0066AF]/20 rounded-2xl shadow-sm hover:shadow-xl hover:border-[#0066AF] hover:-translate-y-1 transition-all duration-300 text-left overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-blue-navy opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-bl-full" />

              <p className="text-xs font-bold uppercase tracking-wider text-[#0066AF] mb-1">
                Directory Term
              </p>
              <h2 className="text-2xl font-black text-[#002B49] group-hover:text-[#0066AF] transition-colors flex items-center justify-between">
                ExeCom {year}
                <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform text-[#0066AF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
