import Link from 'next/link';
import { getAllExecomYears } from '@/lib/data';

export default function Home() {
  const availableYears = getAllExecomYears();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-5xl font-extrabold mb-4 text-blue-900 tracking-tight">IEEE Student Branch</h1>
        <p className="text-xl text-gray-600 mb-10 font-medium">Executive Committee Directory</p>
        
        <div className="flex flex-col gap-4 items-center">
          {availableYears.map((year) => (
            <Link 
              key={year} 
              href={`/execom/${year}`} 
              className="w-full max-w-sm p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg hover:border-blue-400 transition-all text-xl font-bold text-gray-800"
            >
              ExeCom {year}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
