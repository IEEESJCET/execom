'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Footer() {
  const pathname = usePathname();

  const isProfilePage = /^\/execom\/[^/]+\/[^/]+$/.test(pathname);

  if (isProfilePage) return null;

  return (
    <footer className="w-full text-white py-8 px-4 md:px-8 mt-auto shadow-xl bg-[#1c2e1b] border-t-2 border-[#2b442a] font-sans">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <Link
            href="/"
            className="font-black text-lg tracking-tight text-white hover:text-[#f0fe54] transition-colors uppercase"
          >
            IEEE Student Branch
          </Link>
          <p className="text-xs text-[#b0c897] font-semibold mt-0.5">
            Executive Committee Directory & Profiles
          </p>
        </div>

        <div className="text-xs text-[#b0c897] font-semibold text-center sm:text-right">
          &copy; {new Date().getFullYear()} IEEE Student Branch. All rights reserved.
        </div>
      </div>
    </footer>
  );
}