import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { Link, Navigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  BadgeCheck,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock,
  ExternalLink,
  Laptop,
  MonitorCog,
  ShieldCheck,
  Users,
  Zap,
  Star,
  Trophy,
  ArrowRight,
  Sparkles,
  Target,
  Cpu,
} from 'lucide-react';
import { BOOTCAMP_BASE_PATH, getBootcampWingBySlug } from '@/data/bootcampData';
import { useTokens } from '@/tokens/useTokens';
import { useState, useRef } from 'react';

// ─── Particle Config (same as BootcampPage) ──────────────────────────────────
const DETAIL_PARTICLES = [
  { left: '4%',  top: '12%', dur: '11s', delay: '0s'   },
  { left: '14%', top: '58%', dur: '14s', delay: '2s'   },
  { left: '24%', top: '33%', dur: '9s',  delay: '1s'   },
  { left: '36%', top: '78%', dur: '12s', delay: '3s'   },
  { left: '50%', top: '18%', dur: '8s',  delay: '0.5s' },
  { left: '62%', top: '68%', dur: '13s', delay: '2.5s' },
  { left: '74%', top: '42%', dur: '10s', delay: '4s'   },
  { left: '86%', top: '22%', dur: '9s',  delay: '1.5s' },
  { left: '93%', top: '72%', dur: '11s', delay: '3.5s' },
  { left: '32%', top: '52%', dur: '10s', delay: '0.8s' },
];

// ─── Premium Background (identical to BootcampPage) ──────────────────────────
const PremiumBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.75)_100%)]" />
    <div
      className="absolute top-0 left-1/4 w-[700px] h-[700px] rounded-full hidden lg:block gpu-orb gpu-orb-pulse"
      style={{ background: 'radial-gradient(circle, rgba(46,204,113,0.09) 0%, transparent 70%)', '--dur': '8s' } as React.CSSProperties}
    />
    <div
      className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full hidden lg:block gpu-orb gpu-orb-pulse-reverse"
      style={{ background: 'radial-gradient(circle, rgba(39,174,96,0.07) 0%, transparent 70%)', '--dur': '10s' } as React.CSSProperties}
    />
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full hidden lg:block gpu-orb gpu-orb-pulse"
      style={{ background: 'radial-gradient(circle, rgba(46,204,113,0.04) 0%, transparent 70%)', '--dur': '12s' } as React.CSSProperties}
    />
    <div className="hidden lg:block">
      {DETAIL_PARTICLES.map((p, i) => (
        <span
          key={i}
          className="particle-dot"
          style={{ left: p.left, top: p.top, '--dur': p.dur, '--delay': p.delay } as React.CSSProperties}
        />
      ))}
    </div>
  </div>
);

// ─── Ambient Glows (same as BootcampPage) ────────────────────────────────────
const AmbientGlows = () => (
  <>
    <div
      className="absolute -top-32 -left-32 w-[450px] h-[450px] rounded-full blur-[130px] pointer-events-none z-0"
      style={{ backgroundColor: 'rgba(46,204,113,0.12)' }}
    />
    <div
      className="absolute -bottom-32 -right-32 w-[350px] h-[350px] rounded-full blur-[110px] pointer-events-none z-0"
      style={{ backgroundColor: 'rgba(39,174,96,0.08)' }}
    />
  </>
);

// ─── Scroll Progress Bar ──────────────────────────────────────────────────────
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#2ECC71] via-[#3DED97] to-[#27AE60] origin-left z-[99999]"
      style={{ scaleX }}
    />
  );
};

// ─── Registration handler ─────────────────────────────────────────────────────
function handleRegistrationClick(e: React.MouseEvent<HTMLAnchorElement>, url: string) {
  if (!url || url === '#') {
    e.preventDefault();
    alert('Registration form link will be added soon.');
  }
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
const HeroSection = ({ wing }: { wing: ReturnType<typeof getBootcampWingBySlug> }) => {
  const t = useTokens();
  if (!wing) return null;

  return (
    <div className="relative z-10 pt-32 pb-12 sm:pt-36 sm:pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          <Link to={BOOTCAMP_BASE_PATH}>
            <motion.span
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border text-sm font-bold relative overflow-hidden group"
              style={{
                backgroundColor: 'rgba(46,204,113,0.06)',
                borderColor: 'rgba(46,204,113,0.3)',
                color: '#2ECC71',
              }}
              whileHover={{ x: -4, borderColor: '#2ECC71', boxShadow: '0 0 20px rgba(46,204,113,0.2)' }}
              whileTap={{ scale: 0.96 }}
            >
              <motion.span
                animate={{ x: [0, -3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ArrowLeft size={16} />
              </motion.span>
              Back to Bootcamp
            </motion.span>
          </Link>
        </motion.div>

        {/* Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Glow border */}
          <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-[#2ECC71]/40 via-transparent to-[#27AE60]/30 blur-sm" />

          <div
            className="relative rounded-3xl border p-8 sm:p-10 lg:p-14 overflow-hidden"
            style={{ backgroundColor: 'rgba(4,12,8,0.92)', borderColor: 'rgba(46,204,113,0.25)' }}
          >
            {/* Animated top line */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#2ECC71] to-transparent"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            {/* BG decoration */}
            <div className="absolute -right-24 -top-24 w-80 h-80 rounded-full bg-[#2ECC71]/8 blur-3xl pointer-events-none" />
            <div className="absolute -left-16 -bottom-16 w-60 h-60 rounded-full bg-[#27AE60]/5 blur-3xl pointer-events-none" />

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#2ECC71]/40 rounded-tl-3xl" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#2ECC71]/40 rounded-br-3xl" />

            <div className="relative max-w-5xl">
              {/* Eyebrow badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-7 relative overflow-hidden"
                style={{ backgroundColor: 'rgba(46,204,113,0.1)', borderColor: 'rgba(46,204,113,0.35)' }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-[#2ECC71]/15 to-transparent"
                  animate={{ x: ['-200%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
                />
                <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}>
                  <BadgeCheck size={15} className="text-[#2ECC71]" />
                </motion.div>
                <span className="text-sm font-bold text-[#2ECC71]">{wing.eyebrow}</span>
                <span className="text-[#2ECC71]/50 text-sm">•</span>
                <span className="text-sm font-bold text-[#2ECC71]">Registration: {wing.fee}</span>
                <motion.div
                  animate={{ scale: [1, 1.4, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-[#2ECC71]"
                />
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-none"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2ECC71] via-[#3DED97] to-[#27AE60]">
                  {wing.title}
                </span>
              </motion.h1>

              {/* Animated underline */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="w-24 h-1.5 bg-gradient-to-r from-[#2ECC71] to-[#27AE60] rounded-full origin-left mb-7"
              />

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-base sm:text-lg lg:text-xl leading-[1.85] max-w-4xl"
                style={{ color: t.textSecondary }}
              >
                {wing.detailIntro}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.65 }}
                className="flex flex-col sm:flex-row gap-4 mt-10"
              >
                <a
                  href={wing.registrationUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => handleRegistrationClick(e, wing.registrationUrl)}
                >
                  <motion.span
                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#2ECC71] to-[#27AE60] text-black font-bold text-base relative overflow-hidden"
                    whileHover={{ scale: 1.04, boxShadow: '0 0 35px rgba(46,204,113,0.5)' }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                      initial={{ x: '-150%' }}
                      whileHover={{ x: '150%' }}
                      transition={{ duration: 0.7 }}
                    />
                    <span className="relative">Register Now</span>
                    <ExternalLink size={17} className="relative" />
                  </motion.span>
                </a>

                <a href="#roadmap">
                  <motion.span
                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 px-8 py-4 rounded-2xl border font-bold text-base"
                    style={{ borderColor: 'rgba(46,204,113,0.3)', color: t.textPrimary, backgroundColor: 'rgba(46,204,113,0.05)' }}
                    whileHover={{ scale: 1.04, borderColor: '#2ECC71', boxShadow: '0 0 25px rgba(46,204,113,0.2)' }}
                    whileTap={{ scale: 0.96 }}
                  >
                    View Roadmap
                    <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.3, repeat: Infinity }}>
                      <ChevronRight size={18} />
                    </motion.span>
                  </motion.span>
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// ─── Quick Info Card ──────────────────────────────────────────────────────────
const QuickInfoCard = ({ wing }: { wing: ReturnType<typeof getBootcampWingBySlug> }) => {
  const t = useTokens();
  if (!wing) return null;

  const infoItems = [
    { icon: Users, label: 'Target Group', value: wing.targetGroup },
    { icon: MonitorCog, label: 'Mode', value: wing.mode },
    { icon: Users, label: 'Group Format', value: wing.groupFormat },
    { icon: ShieldCheck, label: 'Requirement', value: wing.requirement },
    { icon: CalendarDays, label: 'Timeline', value: wing.timeline },
    { icon: Clock, label: 'Class Count', value: wing.classCount },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative h-full"
    >
      <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-[#2ECC71]/24 to-[#27AE60]/14 blur-sm pointer-events-none" />

      <div
        className="relative rounded-3xl border p-6 sm:p-7 lg:p-8 overflow-hidden"
        style={{
          backgroundColor: 'rgba(4,12,8,0.92)',
          borderColor: 'rgba(46,204,113,0.24)',
        }}
      >
        <motion.div
          className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2ECC71] to-transparent"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        <div className="absolute -right-12 -top-12 w-40 h-40 rounded-full bg-[#2ECC71]/6 blur-3xl pointer-events-none" />

        <div className="relative flex items-center gap-3 mb-7">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            className="w-10 h-10 rounded-full bg-[#2ECC71]/10 flex items-center justify-center shrink-0"
          >
            <Cpu size={17} className="text-[#2ECC71]" />
          </motion.div>

          <h3 className="text-xl font-black leading-tight shrink-0" style={{ color: t.textPrimary }}>
            Quick Info
          </h3>

          <div className="h-px flex-1 bg-gradient-to-r from-[#2ECC71]/35 to-transparent" />
        </div>

        <div className="relative flex flex-col gap-4">
          {infoItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ x: 4 }}
              className="flex items-start gap-4 rounded-2xl border p-4 sm:p-5 group cursor-default min-w-0"
              style={{
                backgroundColor: 'rgba(46,204,113,0.035)',
                borderColor: 'rgba(46,204,113,0.13)',
              }}
            >
              <div className="w-9 h-9 rounded-xl bg-[#2ECC71]/10 flex items-center justify-center shrink-0 group-hover:bg-[#2ECC71]/20 transition-colors">
                <item.icon size={15} className="text-[#2ECC71]" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-black tracking-widest uppercase text-[#2ECC71]/70 mb-1.5 leading-none">
                  {item.label}
                </div>

                <div
                  className="text-sm font-semibold leading-[1.65] break-words"
                  style={{ color: t.textPrimary }}
                >
                  {item.value}
                </div>
              </div>
            </motion.div>
          ))}

          {wing.capacity && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ x: 4 }}
              className="flex items-start gap-4 rounded-2xl border p-4 sm:p-5 group cursor-default min-w-0"
              style={{
                backgroundColor: 'rgba(46,204,113,0.035)',
                borderColor: 'rgba(46,204,113,0.13)',
              }}
            >
              <div className="w-9 h-9 rounded-xl bg-[#2ECC71]/10 flex items-center justify-center shrink-0 group-hover:bg-[#2ECC71]/20 transition-colors">
                <Users size={15} className="text-[#2ECC71]" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-black tracking-widest uppercase text-[#2ECC71]/70 mb-1.5 leading-none">
                  Capacity
                </div>

                <div className="text-sm font-semibold leading-[1.65] break-words" style={{ color: t.textPrimary }}>
                  {wing.capacity}
                </div>
              </div>
            </motion.div>
          )}

          {wing.softwareAccess && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ x: 4 }}
              className="flex items-start gap-4 rounded-2xl border p-4 sm:p-5 group cursor-default min-w-0"
              style={{
                backgroundColor: 'rgba(46,204,113,0.035)',
                borderColor: 'rgba(46,204,113,0.13)',
              }}
            >
              <div className="w-9 h-9 rounded-xl bg-[#2ECC71]/10 flex items-center justify-center shrink-0 group-hover:bg-[#2ECC71]/20 transition-colors">
                <Laptop size={15} className="text-[#2ECC71]" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-black tracking-widest uppercase text-[#2ECC71]/70 mb-1.5 leading-none">
                  Software Access
                </div>

                <div className="text-sm font-semibold leading-[1.65] break-words" style={{ color: t.textPrimary }}>
                  {wing.softwareAccess}
                </div>
              </div>
            </motion.div>
          )}

          {wing.status && (
            <motion.div
              className="rounded-2xl border p-5 relative overflow-hidden"
              style={{
                borderColor: 'rgba(46,204,113,0.28)',
                backgroundColor: 'rgba(46,204,113,0.065)',
              }}
              animate={{
                borderColor: ['rgba(46,204,113,0.28)', 'rgba(46,204,113,0.55)', 'rgba(46,204,113,0.28)'],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="flex items-center gap-2 mb-2">
                <motion.span
                  animate={{ scale: [1, 1.4, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-[#2ECC71] inline-block"
                />
                <span className="text-[11px] font-black tracking-widest uppercase text-[#2ECC71]">
                  Status
                </span>
              </div>

              <div className="text-sm font-semibold leading-[1.65]" style={{ color: t.textPrimary }}>
                {wing.status}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// ─── Highlights Grid ──────────────────────────────────────────────────────────
const HighlightsSection = ({ wing }: { wing: ReturnType<typeof getBootcampWingBySlug> }) => {
  const t = useTokens();
  if (!wing) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="relative h-full"
    >
      <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-[#2ECC71]/20 via-transparent to-transparent blur-sm pointer-events-none" />

      <div
        className="relative rounded-3xl border p-6 sm:p-7 lg:p-8 overflow-hidden h-full"
        style={{
          backgroundColor: 'rgba(4,12,8,0.88)',
          borderColor: 'rgba(46,204,113,0.2)',
        }}
      >
        <div className="absolute -left-12 -bottom-12 w-48 h-48 rounded-full bg-[#2ECC71]/5 blur-3xl pointer-events-none" />

        <div className="relative flex items-center gap-3 mb-7">
          <div className="h-px w-8 bg-gradient-to-r from-[#2ECC71] to-transparent rounded-full shrink-0" />

          <Star size={16} className="text-[#2ECC71] fill-[#2ECC71] shrink-0" />

          <h2
            className="text-2xl md:text-3xl font-black leading-tight shrink-0"
            style={{ color: t.textPrimary }}
          >
            Wing Highlights
          </h2>

          <div className="h-px flex-1 bg-gradient-to-r from-[#2ECC71]/30 to-transparent rounded-full" />
        </div>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {wing.highlights.map((highlight, i) => (
            <motion.div
              key={highlight}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              whileHover={{ x: 5, scale: 1.01 }}
              className="flex items-start gap-4 p-4 sm:p-5 rounded-2xl border group cursor-default min-w-0"
              style={{
                backgroundColor: 'rgba(46,204,113,0.04)',
                borderColor: 'rgba(46,204,113,0.12)',
              }}
            >
              <motion.div
                className="w-7 h-7 rounded-full bg-[#2ECC71]/15 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#2ECC71]/25 transition-colors"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <CheckCircle2 size={14} className="text-[#2ECC71]" />
              </motion.div>

              <span
                className="text-sm leading-[1.75] font-medium min-w-0 break-words"
                style={{ color: t.textSecondary }}
              >
                {highlight}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// ─── Roadmap Section ──────────────────────────────────────────────────────────
const RoadmapSection = ({ wing }: { wing: ReturnType<typeof getBootcampWingBySlug> }) => {
  const t = useTokens();
  if (!wing) return null;

  return (
    <section id="roadmap" className="relative z-10 py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 sm:mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6"
            style={{ backgroundColor: 'rgba(46,204,113,0.06)', borderColor: 'rgba(46,204,113,0.25)' }}
          >
            <BookOpen size={13} className="text-[#2ECC71]" />
            <span className="text-xs font-bold tracking-widest uppercase text-[#2ECC71]">Learning Path</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-5">
            <span style={{ color: t.textPrimary }}>Class & Weekly </span>
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2ECC71] via-[#3DED97] to-[#27AE60]">
                Roadmap
              </span>
              <motion.svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 180 10"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                <motion.path
                  d="M2 6C45 2 135 2 178 6"
                  stroke="url(#roadmap-underline)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                />
                <defs>
                  <linearGradient id="roadmap-underline" x1="0" y1="0" x2="180" y2="0">
                    <stop stopColor="#2ECC71" />
                    <stop offset="1" stopColor="#27AE60" />
                  </linearGradient>
                </defs>
              </motion.svg>
            </span>
          </h2>

          <p className="max-w-2xl mx-auto text-base sm:text-lg leading-[1.8]" style={{ color: t.textSecondary }}>
            Follow the structured learning sequence — each phase builds on the last.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Center line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
            <motion.div
              className="h-full bg-gradient-to-b from-[#2ECC71]/60 via-[#2ECC71]/30 to-transparent"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              style={{ transformOrigin: 'top' }}
            />
          </div>

          <div className="space-y-10 md:space-y-0">
            {wing.roadmap.map((item, index) => {
              const isLeft = index % 2 === 0;
              return (
                <motion.div
                  key={`${item.period}-${item.title}`}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="relative md:grid md:grid-cols-2 md:gap-8 md:mb-10"
                >
                  {/* Center dot */}
                  <div className="hidden md:flex absolute left-1/2 top-8 -translate-x-1/2 z-10 items-center justify-center">
                    <motion.div
                      className="w-5 h-5 rounded-full bg-[#2ECC71] border-2 border-black"
                      animate={{ scale: [1, 1.3, 1], boxShadow: ['0 0 0px #2ECC71', '0 0 12px #2ECC71', '0 0 0px #2ECC71'] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    />
                  </div>

                  {/* Card — alternates sides */}
                  <div className={`relative ${isLeft ? 'md:col-start-1 md:pr-12' : 'md:col-start-2 md:pl-12'}`}>
                    <motion.div
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.3 }}
                      className="relative group"
                    >
                      {/* Card glow */}
                      <motion.div
                        className="absolute -inset-[1px] rounded-2xl blur-sm"
                        style={{ background: 'linear-gradient(135deg, #2ECC71, #27AE60)' }}
                        initial={{ opacity: 0.1 }}
                        whileHover={{ opacity: 0.4 }}
                        transition={{ duration: 0.3 }}
                      />

                      <div
                        className="relative rounded-2xl border p-6 overflow-hidden"
                        style={{ backgroundColor: 'rgba(4,12,8,0.92)', borderColor: 'rgba(46,204,113,0.2)' }}
                      >
                        {/* Top bar */}
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#2ECC71] via-[#3DED97] to-[#27AE60]">
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                            animate={{ x: ['-200%', '200%'] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                          />
                        </div>

                        {/* Period badge */}
                        <motion.div
                          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-4"
                          style={{ backgroundColor: 'rgba(46,204,113,0.1)', borderColor: 'rgba(46,204,113,0.25)' }}
                          whileHover={{ scale: 1.05 }}
                        >
                          <BookOpen size={12} className="text-[#2ECC71]" />
                          <span className="text-[11px] font-black tracking-widest uppercase text-[#2ECC71]">
                            {item.period}
                          </span>
                        </motion.div>

                        {/* Step number watermark */}
                        <div
                          className="absolute top-3 right-4 text-6xl font-black select-none pointer-events-none leading-none"
                          style={{ color: 'rgba(46,204,113,0.05)' }}
                        >
                          {String(index + 1).padStart(2, '0')}
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-black mb-4" style={{ color: t.textPrimary }}>
                          {item.title}
                        </h3>

                        {/* Points */}
                        <ul className="space-y-2.5">
                          {item.points.map((point, pi) => (
                            <motion.li
                              key={point}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.05 + pi * 0.06 }}
                              className="flex items-start gap-2.5 text-sm leading-[1.75]"
                              style={{ color: t.textSecondary }}
                            >
                              <motion.span
                                className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[#2ECC71] shrink-0"
                                animate={{ scale: [1, 1.5, 1] }}
                                transition={{ duration: 2, repeat: Infinity, delay: pi * 0.4 }}
                              />
                              <span>{point}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Outcomes Section ─────────────────────────────────────────────────────────
const OutcomesSection = ({ wing }: { wing: ReturnType<typeof getBootcampWingBySlug> }) => {
  const t = useTokens();
  if (!wing) return null;

  return (
    <section className="relative z-10 pb-24 sm:pb-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Outer glow */}
          <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-[#2ECC71]/30 via-transparent to-[#27AE60]/25 blur-sm" />

          <div
            className="relative rounded-3xl border p-8 sm:p-10 lg:p-14 overflow-hidden"
            style={{ backgroundColor: 'rgba(4,12,8,0.92)', borderColor: 'rgba(46,204,113,0.28)' }}
          >
            {/* Animated top line */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#2ECC71] to-transparent"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-[#2ECC71]/6 blur-3xl pointer-events-none" />
            <div className="absolute -left-20 -bottom-20 w-60 h-60 rounded-full bg-[#27AE60]/5 blur-3xl pointer-events-none" />

            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* Outcomes */}
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                    className="w-10 h-10 rounded-full bg-[#2ECC71]/10 flex items-center justify-center shrink-0"
                  >
                    <Trophy size={19} className="text-[#2ECC71]" />
                  </motion.div>
                  <h2 className="text-2xl md:text-3xl font-black" style={{ color: t.textPrimary }}>
                    Expected Outcomes
                  </h2>
                </div>

                <div className="h-px bg-gradient-to-r from-[#2ECC71]/40 to-transparent mb-8" />

                <div className="space-y-3">
                  {wing.outcomes.map((outcome, i) => (
                    <motion.div
                      key={outcome}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.09, duration: 0.5 }}
                      whileHover={{ x: 6 }}
                      className="flex items-start gap-3.5 p-4 rounded-2xl border group cursor-default"
                      style={{ backgroundColor: 'rgba(46,204,113,0.04)', borderColor: 'rgba(46,204,113,0.12)' }}
                    >
                      <motion.div
                        className="w-7 h-7 rounded-full bg-[#2ECC71]/12 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#2ECC71]/22 transition-colors"
                        whileHover={{ scale: 1.2 }}
                      >
                        <CheckCircle2 size={15} className="text-[#2ECC71]" />
                      </motion.div>
                      <span className="text-sm leading-relaxed font-medium" style={{ color: t.textSecondary }}>
                        {outcome}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CTA Card */}
              <motion.div
                className="relative"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-[#2ECC71]/35 to-[#27AE60]/25 blur-sm" />
                <div
                  className="relative rounded-2xl border p-8 overflow-hidden"
                  style={{ backgroundColor: 'rgba(8,20,12,0.95)', borderColor: 'rgba(46,204,113,0.3)' }}
                >
                  {/* Shimmer */}
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2ECC71] to-transparent"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  />

                  {/* Icon */}
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="w-16 h-16 rounded-2xl bg-[#2ECC71]/10 flex items-center justify-center mb-6 border border-[#2ECC71]/20"
                  >
                    <Sparkles size={28} className="text-[#2ECC71]" />
                  </motion.div>

                  <h3 className="text-2xl font-black mb-3" style={{ color: t.textPrimary }}>
                    Ready to Join?
                  </h3>
                  <p className="text-sm leading-[1.8] mb-8" style={{ color: t.textSecondary }}>
                    Registration is completely <span className="text-[#2ECC71] font-bold">100% free</span>. Secure your spot and start your robotics journey with AUSTRC.
                  </p>

                  {/* Pulse CTA */}
                  <a
                    href={wing.registrationUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => handleRegistrationClick(e, wing.registrationUrl)}
                    className="block"
                  >
                    <motion.span
                      className="inline-flex w-full items-center justify-center gap-2.5 py-4 rounded-2xl bg-gradient-to-r from-[#2ECC71] to-[#27AE60] text-black font-bold text-base relative overflow-hidden"
                      whileHover={{ scale: 1.03, boxShadow: '0 0 35px rgba(46,204,113,0.5)' }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <motion.span
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                        initial={{ x: '-150%' }}
                        whileHover={{ x: '150%' }}
                        transition={{ duration: 0.7 }}
                      />
                      <span className="relative">Register for {wing.shortTitle}</span>
                      <motion.span
                        className="relative"
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.3, repeat: Infinity }}
                      >
                        <ArrowRight size={17} />
                      </motion.span>
                    </motion.span>
                  </a>

                  {/* Free badge */}
                  <motion.div
                    className="flex items-center justify-center gap-2 mt-4"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  >
                    <BadgeCheck size={14} className="text-[#2ECC71]" />
                    <span className="text-xs font-bold text-[#2ECC71]/70">No payment required — completely free</span>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
export function BootcampWingDetailPage() {
  const t = useTokens();
  const { wingSlug } = useParams();
  const wing = getBootcampWingBySlug(wingSlug);

  if (!wing) {
    return <Navigate to={BOOTCAMP_BASE_PATH} replace />;
  }

  return (
    <>
      <ScrollProgress />

      <main
        className="relative min-h-screen overflow-x-hidden"
        style={{ backgroundColor: t.pageBg, color: t.textPrimary }}
      >
        {/* ── Same background as BootcampPage ── */}
        <PremiumBackground />
        <AmbientGlows />

        {/* ══ HERO ══ */}
        <HeroSection wing={wing} />

        {/* ══ INFO + HIGHLIGHTS (side by side) ══ */}
        <section className="relative z-10 pb-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 items-start">
              {/* Highlights — takes 2/3 width */}
              <div className="lg:col-span-2">
                <HighlightsSection wing={wing} />
              </div>
              {/* Quick Info — takes 1/3 width */}
              <div className="lg:col-span-1">
                <QuickInfoCard wing={wing} />
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="relative z-10 px-8 py-4">
          <div className="h-px bg-gradient-to-r from-transparent via-[#2ECC71]/20 to-transparent" />
        </div>

        {/* ══ ROADMAP ══ */}
        <RoadmapSection wing={wing} />

        {/* ══ OUTCOMES + CTA ══ */}
        <OutcomesSection wing={wing} />

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/40 to-transparent pointer-events-none z-10" />
      </main>
    </>
  );
}