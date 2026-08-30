import { Metadata } from 'next';
import { getMemberData, getAllMemberParams } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  Globe,
  Star,
  Send,
  Mail,
  Code2,
  Sparkles,
  Shield,
  Cpu,
  Brain,
  Palette,
  ExternalLink,
} from 'lucide-react';

export async function generateStaticParams() {
  return getAllMemberParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ year: string; id: string }>;
}): Promise<Metadata> {
  const { year, id } = await params;
  const member = getMemberData(year, id);
  if (!member) return { title: 'Member Not Found' };

  return {
    title: `${member.name} | ${member.position} - IEEE ExeCom`,
    description: `${member.position} - ${member.department} (${member.class})`,
  };
}

// Brand SVG Icons
function LinkedinIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function GithubIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
    </svg>
  );
}

function InstagramIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function TwitterIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function YoutubeIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

// Dynamic Social Icon Switcher
function SocialIcon({ platform }: { platform: string }) {
  const p = platform.toLowerCase();

  if (p.includes('linkedin')) {
    return <LinkedinIcon className="w-6 h-6 text-[#0A66C2]" />;
  }
  if (p.includes('github')) {
    return <GithubIcon className="w-6 h-6 text-[#1c2e1b]" />;
  }
  if (p.includes('insta') || p.includes('instagram')) {
    return <InstagramIcon className="w-6 h-6 text-[#E4405F]" />;
  }
  if (p.includes('twitter') || p.includes('x')) {
    return <TwitterIcon className="w-5 h-5 text-black" />;
  }
  if (p.includes('youtube')) {
    return <YoutubeIcon className="w-6 h-6 text-[#FF0000]" />;
  }
  if (p.includes('portfolio') || p.includes('website') || p.includes('site') || p.includes('web')) {
    return <Globe className="w-6 h-6 text-[#1c2e1b]" />;
  }
  if (p.includes('mail') || p.includes('email')) {
    return <Mail className="w-6 h-6 text-[#EA4335]" />;
  }

  return <ExternalLink className="w-5 h-5 text-[#1c2e1b]" />;
}

// Domain & Skill badge renderer
function SkillBadge({ name }: { name: string }) {
  const lower = name.toLowerCase();
  const iconClass = "w-4 h-4 text-[#1c2e1b]";

  if (lower.includes('cyber') || lower.includes('security')) {
    return <Shield className={iconClass} />;
  }
  if (lower.includes('ai') || lower.includes('machine') || lower.includes('ml')) {
    return <Brain className={iconClass} />;
  }
  if (lower.includes('ui') || lower.includes('ux') || lower.includes('design') || lower.includes('figma')) {
    return <Palette className={iconClass} />;
  }
  if (lower.includes('iot') || lower.includes('electronics') || lower.includes('embedded') || lower.includes('hardware')) {
    return <Cpu className={iconClass} />;
  }
  if (lower.includes('leadership') || lower.includes('management') || lower.includes('ieee')) {
    return <Sparkles className={iconClass} />;
  }
  if (lower.includes('python')) {
    return (
      <svg className="w-4 h-4" viewBox="0 0 128 128">
        <path
          fill="#3776AB"
          d="M62.6 0c-18.4 0-17.2 8-17.2 8l.1 8.3h17.5v2.5H18.2S2 16.7 2 35.3s14.2 17.9 14.2 17.9h8.5v-12s-.4-14.3 14.3-14.3h24.6s13.8.2 13.8-13.4V9.8S79.6 0 62.6 0zm-8.8 5.2c2.6 0 4.7 2.1 4.7 4.7s-2.1 4.7-4.7 4.7-4.7-2.1-4.7-4.7 2.1-4.7 4.7-4.7z"
        />
        <path
          fill="#FFD43B"
          d="M65.4 128c18.4 0 17.2-8 17.2-8l-.1-8.3H65v-2.5h24.8s16.2 2.1 16.2-16.5-14.2-17.9-14.2-17.9h-8.5v12s.4 14.3-14.3 14.3H44.4s-13.8-.2-13.8 13.4v13.7s-6.1 9.8 10.9 9.8zm8.8-5.2c-2.6 0-4.7-2.1-4.7-4.7s2.1-4.7 4.7-4.7 4.7 2.1 4.7 4.7-2.1 4.7-4.7 4.7z"
        />
      </svg>
    );
  }

  return <Code2 className={iconClass} />;
}

export default async function MemberProfile({
  params,
}: {
  params: Promise<{ year: string; id: string }>;
}) {
  const { year, id } = await params;
  const member = getMemberData(year, id);

  if (!member) {
    return (
      <main className="min-h-screen bg-[#eef870] flex items-center justify-center p-4">
        <div className="p-8 text-center text-xl font-bold text-[#1c2e1b] bg-white rounded-3xl border-2 border-[#1c2e1b] shadow-[4px_4px_0px_#1c2e1b]">
          Member profile not found.
          <div className="mt-4">
            <Link
              href={`/execom/${year}`}
              className="inline-block px-5 py-2 bg-[#f0fe54] text-[#1c2e1b] rounded-full text-sm font-extrabold border border-[#1c2e1b]"
            >
              Back to ExeCom {year}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const nameParts = member.name.trim().split(' ');
  const firstName = nameParts[0] || member.name;
  const lastName = nameParts.slice(1).join(' ') || '';

  // Default domains & skills (max 4-5)
  const skillsList = (
    member.skills && member.skills.length > 0
      ? member.skills
      : ['Cybersecurity', 'Web Dev', 'UI/UX', 'AI', 'Leadership']
  ).slice(0, 5);

  // Dynamic email
  const emailAddress = member.email || `${id.replace('-', '.')}@ieee.org`;

  // Dynamic Social Links Mapping
  const dynamicSocials: Array<{ key: string; name: string; url: string }> = [];

  if (member.links) {
    Object.entries(member.links).forEach(([key, rawUrl]) => {
      if (rawUrl && typeof rawUrl === 'string' && rawUrl !== '#') {
        let formattedUrl = rawUrl.trim();
        if (
          !formattedUrl.startsWith('http://') &&
          !formattedUrl.startsWith('https://') &&
          !formattedUrl.startsWith('mailto:')
        ) {
          formattedUrl = `https://${formattedUrl}`;
        }
        dynamicSocials.push({ key, name: key, url: formattedUrl });
      }
    });
  }

  // Add email to socials if not already included
  if (!dynamicSocials.some((s) => s.key.toLowerCase().includes('email') || s.key.toLowerCase().includes('mail'))) {
    dynamicSocials.push({ key: 'email', name: 'Email', url: `mailto:${emailAddress}` });
  }

  return (
    <main className="min-h-screen bg-[#dce8bd] flex items-center justify-center p-2 sm:p-6 font-sans">
      <div className="w-full max-w-sm sm:max-w-md bg-[#1c2e1b] rounded-[40px] sm:rounded-[44px] shadow-2xl overflow-hidden border-[6px] sm:border-[8px] border-[#1c2e1b] relative flex flex-col my-auto">

        {/* Dynamic Island / Notch Aesthetics */}
        <div className="w-full bg-[#c2d7aa] flex justify-center pt-3 pb-1 relative z-20">
          <div className="w-24 h-4 bg-black rounded-full flex items-center justify-end px-2 gap-1.5">
            <div className="w-2 h-2 rounded-full bg-blue-900/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-green-900/40" />
          </div>
        </div>

        {/* Top Header Section (Sage Green with rounded bottom edge) */}
        <div className="bg-[#c2d7aa] rounded-b-[36px] sm:rounded-b-[40px] px-5 sm:px-7 pt-2 pb-6 relative flex flex-col justify-between shadow-md z-10">

          {/* Top Control Bar */}
          <div className="flex items-center justify-between mb-4 z-20">
            <Link
              href={`/execom/${year}`}
              className="w-10 h-10 rounded-full bg-[#1c2e1b] text-white flex items-center justify-center hover:bg-[#2b442a] transition-all shadow-md active:scale-95"
              aria-label="Back to ExeCom"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>

            <div className="w-10 h-10 rounded-full bg-[#1c2e1b] flex items-center justify-center shadow-md p-2 hover:bg-[#2b442a] transition-all">
              <Image
                src="/ieee mb white png.png"
                alt="IEEE Student Branch"
                width={24}
                height={24}
                unoptimized
                className="w-6 h-6 object-contain"
              />
            </div>
          </div>

          {/* Profile Main Header Layout: Left (Details) + Right (Photo) */}
          <div className="grid grid-cols-12 gap-2 items-end z-10 min-h-[220px]">
            {/* Left Column: Name & Status */}
            <div className="col-span-7 pr-1 pb-1">
              <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#1c2e1b] leading-[0.92] mb-2 font-sans">
                {firstName} <br />
                {lastName && <span className="block">{lastName}</span>}
              </h1>

              <p className="text-[#2d472b] font-bold text-xs sm:text-sm mb-4 leading-tight">
                {member.tagline || `${member.position} | ${member.class || member.department}`}
              </p>

              {/* Status Badge & Icon Buttons */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <div className="bg-[#f0fe54] text-[#1c2e1b] font-extrabold text-[11px] px-3 py-1.5 rounded-md border border-[#1c2e1b] shadow-[2px_2px_0px_#1c2e1b] whitespace-nowrap">
                  {member.status || 'Open to Work'}
                </div>

                <div className="w-7 h-7 rounded-full bg-white text-[#1c2e1b] flex items-center justify-center shadow-sm border border-black/10">
                  <Star className="w-3.5 h-3.5 fill-[#1c2e1b]" />
                </div>

                <a
                  href={`mailto:${emailAddress}`}
                  className="w-7 h-7 rounded-full bg-white text-[#1c2e1b] flex items-center justify-center shadow-sm border border-black/10 hover:scale-105 transition-transform"
                  aria-label="Send Email"
                >
                  <Send className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Right Column: Dynamic Photo Cutout */}
            <div className="col-span-5 flex justify-end">
              <div className="w-32 h-44 sm:w-36 sm:h-52 relative rounded-b-3xl rounded-t-2xl overflow-hidden shadow-lg border-2 border-[#1c2e1b]/15 bg-[#b5caa0] flex items-center justify-center">
                {member.photo ? (
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    priority
                    unoptimized
                    sizes="160px"
                    className="object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-[#1c2e1b] text-[#f0fe54] flex flex-col items-center justify-center p-2 text-center">
                    <span className="text-4xl font-black">{firstName.charAt(0)}</span>
                    <span className="text-xs font-bold uppercase mt-1">{member.position}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Lower Main Card Section (Dark Forest Green) */}
        <div className="bg-[#1c2e1b] text-white p-5 sm:p-7 space-y-4 relative flex-1 flex flex-col justify-between">

          {/* Bio Quote */}
          <div>
            <p className="text-sm sm:text-base text-slate-100 font-medium leading-snug tracking-normal">
              &quot;Hi, I&apos;m <span className="font-bold text-white">{firstName}</span>, a{' '}
              <span className="font-bold italic text-white">{member.position}</span> and{' '}
              <span className="font-bold italic text-white">{member.department || member.class}</span>.&quot;
            </p>
          </div>

          {/* Dynamic Socials Section */}
          <div>
            <div className="text-[11px] uppercase font-bold text-[#b0c897] tracking-wider text-right mb-2">
              Socials
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {dynamicSocials.map((social) => (
                <a
                  key={social.key}
                  href={social.url}
                  target={social.url.startsWith('mailto:') ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  className="bg-white text-[#1c2e1b] rounded-2xl p-2.5 flex items-center justify-center shadow-md hover:scale-105 transition-all aspect-square min-w-[44px] min-h-[44px]"
                  title={social.name.charAt(0).toUpperCase() + social.name.slice(1)}
                >
                  <SocialIcon platform={social.key} />
                </a>
              ))}
            </div>
          </div>

          {/* IEEE Position Card */}
          <div className="bg-white text-[#1c2e1b] rounded-2xl p-4 shadow-md border border-gray-100 flex flex-col items-center justify-center text-center">
            <span className="font-black text-2xl sm:text-3xl uppercase tracking-tight leading-none text-[#1c2e1b]">
              {member.position}
            </span>
            <span className="text-[11px] font-black text-[#2d472b] uppercase tracking-wider mt-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#1c2e1b]" />
              IEEE ExeCom Position
            </span>
          </div>

          {/* Domains & Skills Badges Section */}
          <div>
            <div className="text-[11px] uppercase font-bold text-[#b0c897] tracking-wider text-left mb-2">
              Domains & Skills
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {skillsList.map((skill, index) => (
                <div
                  key={index}
                  className="bg-white text-[#1c2e1b] px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm border border-slate-200 hover:scale-105 transition-all cursor-default"
                  title={skill}
                >
                  <SkillBadge name={skill} />
                  <span>{skill}</span>
                </div>
              ))}

              <div className="bg-white/10 text-white/90 text-[11px] font-bold px-3 py-1.5 rounded-xl border border-white/15 ml-auto">
                {member.class ? `Class: ${member.class}` : 'IEEE Member'}
              </div>
            </div>
          </div>

          {/* Centered Yellow CTA Pill Button: GET IN TOUCH + Dynamic Mail ID */}
          <div className="pt-2 flex flex-col items-center gap-1.5">
            <a
              href={`mailto:${emailAddress}`}
              className="bg-[#f0fe54] text-[#1c2e1b] font-black text-sm py-2.5 px-8 rounded-full border-2 border-[#1c2e1b] shadow-[3px_3px_0px_#000000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#000000] transition-all flex items-center justify-center uppercase tracking-wider cursor-pointer active:scale-95"
            >
              Get in touch
            </a>

            <a
              href={`mailto:${emailAddress}`}
              className="text-xs text-[#b0c897] font-bold flex items-center gap-1 hover:text-white transition-colors tracking-tight"
            >
              <Mail className="w-3.5 h-3.5" />
              {emailAddress}
            </a>
          </div>

        </div>
      </div>
    </main>
  );
}