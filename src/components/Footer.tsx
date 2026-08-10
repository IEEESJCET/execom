'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Footer() {
  const pathname = usePathname();

  const isProfilePage = /^\/execom\/[^/]+\/[^/]+$/.test(pathname);

  if (isProfilePage) return null;

  return (
    <footer className="w-full text-white py-8 px-4 md:px-8 mt-auto shadow-inner bg-gradient-black-blue">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <Link
            href="/"
            className="font-extrabold text-lg tracking-tight text-white hover:text-blue-200 transition-colors"
          >
            IEEE Student Branch
          </Link>
          <p className="text-xs text-blue-100/80 font-medium mt-0.5">
            Executive Committee Directory & Profiles
          </p>
        </div>

        <div className="text-xs text-blue-100/70 font-medium text-center sm:text-right">
          &copy; {new Date().getFullYear()} IEEE Student Branch. All rights reserved.
        </div>
      </div>
    </footer>
  );
}