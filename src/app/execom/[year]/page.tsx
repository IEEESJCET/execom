import Link from 'next/link';
import { Metadata } from 'next';
import { getExecomData, getAllExecomYears } from '@/lib/data';
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

  if (!data) return <div className="p-8 text-center text-xl font-bold">ExeCom data not found for this year.</div>;

  const displayYear = data.frontmatter?.year || year;
  const teams = Array.isArray(data.frontmatter?.teams) ? data.frontmatter.teams : [];

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8 text-gray-900">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-blue-900">IEEE ExeCom {displayYear}</h1>

        {teams.map((team: any) => (
          <section key={team.name} className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 border-b pb-2 text-gray-800">{team.name}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.isArray(team.members) && team.members.map((member: any, index: number) => (
                <Link
                  href={`/execom/${year}/${member.id}`}
                  key={member.id}
                  className="block p-4 border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-blue-300 transition-all bg-white"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex-shrink-0 overflow-hidden relative border border-gray-200">
                      {member.photo ? (
                        <Image
                          src={member.photo}
                          alt={member.name}
                          fill
                          sizes="64px"
                          priority={index < 6}
                          unoptimized
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-bold text-gray-400 bg-gray-200">
                          {member.name ? member.name.charAt(0) : '?'}
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{member.name}</h3>
                      <p className="text-sm text-blue-600 font-medium">{member.position}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}