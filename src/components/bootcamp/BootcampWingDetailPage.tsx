import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  Users,
  Radio,
  ClipboardList,
  CalendarDays,
  BookOpen,
  Armchair,
  Monitor,
  Target,
  ChevronLeft,
  Sparkles,
  ArrowRight,
  Map,
  Trophy,
  CheckCircle2,
  Package,
  UserCheck,
  UsersRound,
} from 'lucide-react';
import {
  BOOTCAMP_BASE_PATH,
  getBootcampWingBySlug,
  bootcampWings,
} from '@/data/bootcampData';
import { useTokens } from '@/tokens/useTokens';
import wing1Logo from '@/assets/wing 1.jpeg';
import wing2Logo from '@/assets/wing 2.jpeg';
import wing3Logo from '@/assets/wing 3.jpeg';
import wing4Logo from '@/assets/wing 4.jpeg';

// ─── Logo resolver ────────────────────────────────────────────────────────────
const WING_LOGOS: string[] = [wing1Logo, wing2Logo, wing3Logo, wing4Logo];

function getWingLogo(slug: string): string {
  const idx = bootcampWings.findIndex((w) => w.slug === slug);
  return idx !== -1 ? WING_LOGOS[idx] : '';
}

// ─── Registration links ───────────────────────────────────────────────────────
const WING_REGISTRATION_LINKS: Record<string, string> = {
  'basic-robotics-projects':      'https://forms.gle/pqVYq2gsyut8CJTf7',
  'pcb-design-fabrication':       'https://forms.gle/mf7WbLd3YbnL89vz5',
  'solidworks-bootcamp-roadmap':  'https://forms.gle/cVBThKHWajzxgwkN7',
  'web-app-design':               'https://forms.gle/PvEhHp86NjyPGSjT6',
};

// ─── Solo / Team config ───────────────────────────────────────────────────────
const WING_FORMAT_TAG: Record<string, 'Solo' | 'Team'> = {
  'basic-robotics-projects':     'Team',
  'pcb-design-fabrication':      'Solo',
  'solidworks-bootcamp-roadmap': 'Solo',
  'web-app-design':              'Team',
};

// ─── Components list (Wing 1 only) ────────────────────────────────────────────
const WING1_COMPONENTS = [
  {
    category: 'Microcontrollers',
    items: [
      { name: 'ESP32', qty: 1 },
    ],
  },
  {
    category: 'Sensors',
    items: [
      { name: 'PIR Motion Sensor', qty: 1 },
      { name: 'LDR (Light Dependent Resistor)', qty: 1 },
      { name: 'Soil Moisture Sensor', qty: 1 },
      { name: 'IR Sensor (pair)', qty: 2 },
      { name: 'DHT11 Temperature & Humidity Sensor', qty: 1 },
      { name: 'Sonar Sensor', qty: 1 },
    ],
  },
  {
    category: 'Actuators',
    items: [
      { name: 'SG-90 Servo Motor', qty: 1 },
      { name: 'Relay Module 2 channel', qty: 1 },
      { name: 'Water Pump DC 6V', qty: 1 },
    ],
  },
  {
    category: 'Displays',
    items: [
      { name: 'LCD (16x2, I2C)', qty: 1 },
    ],
  },
  {
    category: 'General Electronics',
    items: [
      { name: 'LEDs (Assorted Colors)', qty: 10 },
      { name: 'Push Switch', qty: 5 },
      { name: 'Resistors - 100Ω, 220Ω, 1kΩ, 4.7kΩ, 10kΩ', qty: 50 },
      { name: 'Breadboards', qty: 2 },
      { name: 'Jumper Wires (Pack of 30) MM, MF, FF', qty: 3 },
    ],
  },
  {
    category: 'Power Supply',
    items: [
      { name: '3.7Volt 18650 Battery', qty: 2 },
      { name: '2-cell battery case', qty: 1 },
      { name: '2-cell Battery charger', qty: 1 },
    ],
  },
];

function getRegistrationUrl(slug: string, fallbackUrl: string) {
  return WING_REGISTRATION_LINKS[slug] || fallbackUrl;
}

function handleRegistrationClick(
  e: React.MouseEvent<HTMLAnchorElement>,
  url: string
) {
  if (!url || url === '#') {
    e.preventDefault();
    alert('Registration form link will be added soon.');
  }
}

// ─── Wing Logo Display Component ──────────────────────────────────────────────
const WingLogoFrame = ({
  src,
  alt,
  eyebrow,
  variant = 'desktop',
}: {
  src: string;
  alt: string;
  eyebrow: string;
  variant?: 'desktop' | 'mobile';
}) => {
  const imgMaxH = variant === 'desktop' ? '200px' : '165px';
  const padding  = variant === 'desktop' ? '26px 22px' : '20px 18px';

  return (
    <div
      className={`wing-logo-frame wing-logo-frame--${variant}`}
      style={{ width: '100%' }}
    >
      <div className="wlf-texture" />
      <div className="wlf-glow" />
      <div className="wlf-shimmer" />
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', padding }}>
        <img
          src={src}
          alt={alt}
          draggable={false}
          style={{
            display: 'block',
            width: '100%',
            maxWidth: '100%',
            height: 'auto',
            maxHeight: imgMaxH,
            objectFit: 'contain',
            objectPosition: 'center',
            borderRadius: '10px',
            userSelect: 'none',
            filter: 'drop-shadow(0 0 10px rgba(46,204,113,0.22)) drop-shadow(0 6px 18px rgba(0,0,0,0.65))',
            transition: 'filter 0.4s ease, transform 0.4s ease',
          }}
          className="wlf-img"
        />
      </div>
      <div className="wlf-pill">
        <span className="wlf-pill-dot" />
        <span className="wlf-pill-text">{eyebrow}</span>
      </div>
    </div>
  );
};

// ─── Components Table (Wing 1 only) ──────────────────────────────────────────
const ComponentsTable = ({ t }: { t: ReturnType<typeof useTokens> }) => {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  return (
    <div style={{ width: '100%' }}>
      {/* Header note */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        marginBottom: '20px', padding: '12px 16px',
        background: 'rgba(46,204,113,0.07)',
        border: '1px solid rgba(46,204,113,0.25)',
        borderRadius: '12px',
      }}>
        <Package size={16} color="#2ECC71" strokeWidth={2} />
        <span style={{ color: t.textSecondary, fontSize: '13px', lineHeight: 1.6 }}>
          The following components are required for the Basic Robotics Projects wing. Participants are expected to arrange these components before the bootcamp begins.
        </span>
      </div>

      {/* Table */}
      <div style={{
        border: '1px solid rgba(46,204,113,0.25)',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
      }}>
        {/* Table Head */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '180px 1fr 90px',
          background: 'rgba(46,204,113,0.18)',
          borderBottom: '1px solid rgba(46,204,113,0.3)',
          padding: '14px 20px',
          gap: '12px',
        }}>
          {['Category', 'Component', 'Quantity'].map((h) => (
            <span key={h} style={{
              color: '#2ECC71', fontSize: '12px', fontWeight: 900,
              letterSpacing: '0.1em', textTransform: 'uppercase' as const,
              textAlign: h === 'Quantity' ? 'center' as const : 'left' as const,
            }}>{h}</span>
          ))}
        </div>

        {/* Table Body */}
        {WING1_COMPONENTS.map((group, gi) =>
          group.items.map((item, ii) => {
            const rowKey = `${gi}-${ii}`;
            const isFirstInGroup = ii === 0;
            const isLastInGroup = ii === group.items.length - 1;
            const isLastGroup = gi === WING1_COMPONENTS.length - 1;
            const showBorderBottom = !(isLastGroup && isLastInGroup);

            return (
              <div
                key={rowKey}
                onMouseEnter={() => setHoveredRow(rowKey)}
                onMouseLeave={() => setHoveredRow(null)}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '180px 1fr 90px',
                  gap: '12px',
                  padding: '13px 20px',
                  borderBottom: showBorderBottom ? '1px solid rgba(46,204,113,0.1)' : 'none',
                  background: hoveredRow === rowKey
                    ? 'rgba(46,204,113,0.07)'
                    : gi % 2 === 0 ? 'rgba(46,204,113,0.02)' : 'rgba(0,0,0,0.15)',
                  transition: 'background 0.2s ease',
                  alignItems: 'center',
                }}
              >
                {/* Category cell */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  borderRight: '1px solid rgba(46,204,113,0.12)',
                  paddingRight: '12px',
                  minHeight: '32px',
                }}>
                  {isFirstInGroup ? (
                    <span style={{
                      color: '#2ECC71', fontSize: '13px', fontWeight: 800,
                      lineHeight: 1.4,
                    }}>{group.category}</span>
                  ) : (
                    <span style={{ color: 'transparent', fontSize: '13px', userSelect: 'none' }}>—</span>
                  )}
                </div>

                {/* Component name */}
                <span style={{
                  color: t.textPrimary, fontSize: '14px', lineHeight: 1.6,
                  fontWeight: hoveredRow === rowKey ? 600 : 400,
                  transition: 'font-weight 0.2s ease',
                }}>{item.name}</span>

                {/* Quantity */}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    minWidth: '36px', height: '28px',
                    background: 'rgba(46,204,113,0.12)',
                    border: '1px solid rgba(46,204,113,0.3)',
                    borderRadius: '8px',
                    color: '#2ECC71', fontSize: '13px', fontWeight: 900,
                    padding: '0 8px',
                  }}>{item.qty}</span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Total count */}
      <div style={{
        display: 'flex', justifyContent: 'flex-end', marginTop: '12px',
        gap: '8px', alignItems: 'center',
      }}>
        <span style={{ color: t.textSecondary, fontSize: '12px' }}>Total unique components:</span>
        <span style={{
          color: '#2ECC71', fontSize: '13px', fontWeight: 800,
          background: 'rgba(46,204,113,0.1)',
          border: '1px solid rgba(46,204,113,0.3)',
          borderRadius: '8px', padding: '2px 10px',
        }}>
          {WING1_COMPONENTS.reduce((acc, g) => acc + g.items.length, 0)}
        </span>
      </div>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
export function BootcampWingDetailPage() {
  const { wingSlug } = useParams();
  const wing = getBootcampWingBySlug(wingSlug);
  const t = useTokens();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'learn' | 'roadmap' | 'outcomes' | 'components'>('learn');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [hoveredInfo, setHoveredInfo] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(timer);
  }, []);

  // ── 404 ──────────────────────────────────────────────────────────────────
  if (!wing) {
    return (
      <main style={{ minHeight: '100vh', backgroundColor: t.pageBg, color: t.textPrimary, padding: '120px 20px 60px' }}>
        <style>{`
          @keyframes fadeUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
          .nf-link { transition:all .25s ease; display:flex; align-items:center; justify-content:space-between; color:inherit; text-decoration:none; }
          .nf-link:hover { background:rgba(46,204,113,0.1)!important; border-color:rgba(46,204,113,0.55)!important; transform:translateX(6px); }
          .nf-back:hover { box-shadow:0 8px 28px rgba(46,204,113,0.5)!important; transform:translateY(-2px); }
        `}</style>
        <div style={{ maxWidth: '680px', margin: '0 auto', animation: 'fadeUp 0.5s ease both' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', width:'80px', height:'80px', borderRadius:'24px', background:'rgba(46,204,113,0.1)', border:'1px solid rgba(46,204,113,0.25)', marginBottom:'20px' }}>
              <Target size={36} color="#2ECC71" strokeWidth={1.6} />
            </div>
            <h1 style={{ fontSize:'clamp(26px,5vw,40px)', fontWeight:900, marginBottom:'14px' }}>Wing Not Found</h1>
            <p style={{ color:t.textSecondary, lineHeight:1.8, fontSize:'16px' }}>
              The bootcamp wing you are looking for does not exist. Choose one of the available wings below.
            </p>
          </div>
          <div style={{ display:'grid', gap:'12px', marginBottom:'32px' }}>
            {bootcampWings.map((item, i) => (
              <Link key={item.slug} to={`${BOOTCAMP_BASE_PATH}/${item.slug}`} className="nf-link"
                style={{ border:'1px solid rgba(46,204,113,0.2)', borderRadius:'14px', padding:'18px 20px', backgroundColor:'rgba(46,204,113,0.03)', animation:`fadeUp 0.5s ease ${0.1+i*0.07}s both` }}>
                <div>
                  <span style={{ color:'#2ECC71', fontSize:'11px', fontWeight:800, letterSpacing:'0.12em', textTransform:'uppercase' }}>{item.eyebrow}</span>
                  <p style={{ margin:'4px 0 0', fontWeight:700, color:t.textPrimary }}>{item.title}</p>
                </div>
                <ArrowRight size={18} color="#2ECC71" />
              </Link>
            ))}
          </div>
          <div style={{ textAlign:'center' }}>
            <Link to={BOOTCAMP_BASE_PATH} className="nf-back"
              style={{ display:'inline-flex', alignItems:'center', gap:'8px', color:'#000', backgroundColor:'#2ECC71', padding:'13px 28px', borderRadius:'12px', fontWeight:800, textDecoration:'none', transition:'all .25s ease', boxShadow:'0 4px 20px rgba(46,204,113,0.35)' }}>
              <ChevronLeft size={16} strokeWidth={2.5} /> Back to Bootcamp
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const logoSrc = getWingLogo(wing.slug);
  const isWing1 = wing.slug === 'basic-robotics-projects';
  const formatTag = WING_FORMAT_TAG[wing.slug];

  const infoItems = [
    { icon: <Target size={17} color="#2ECC71" strokeWidth={2} />,        label: 'Target Group',    value: wing.targetGroup    },
    { icon: <Radio size={17} color="#2ECC71" strokeWidth={2} />,         label: 'Mode',            value: wing.mode           },
    { icon: <Users size={17} color="#2ECC71" strokeWidth={2} />,         label: 'Group Format',    value: wing.groupFormat    },
    { icon: <ClipboardList size={17} color="#2ECC71" strokeWidth={2} />, label: 'Requirement',     value: wing.requirement    },
    { icon: <CalendarDays size={17} color="#2ECC71" strokeWidth={2} />,  label: 'Duration',        value: wing.timeline       },
    { icon: <BookOpen size={17} color="#2ECC71" strokeWidth={2} />,      label: 'Class Count',     value: wing.classCount     },
    ...(wing.capacity       ? [{ icon:<Armchair size={17} color="#2ECC71" strokeWidth={2}/>, label:'Capacity',        value:wing.capacity       }] : []),
    ...(wing.softwareAccess ? [{ icon:<Monitor  size={17} color="#2ECC71" strokeWidth={2}/>, label:'Software Access', value:wing.softwareAccess }] : []),
  ];

  // Tab definitions — conditionally include Components for Wing 1
  const tabs = [
    { key: 'learn',      label: 'What You Learn', icon: <CheckCircle2 size={14} strokeWidth={2.2}/> },
    { key: 'roadmap',    label: 'Roadmap',        icon: <Map          size={14} strokeWidth={2.2}/> },
    { key: 'outcomes',   label: 'Outcomes',       icon: <Trophy       size={14} strokeWidth={2.2}/> },
    ...(isWing1 ? [{ key: 'components', label: 'Components', icon: <Package size={14} strokeWidth={2.2}/> }] : []),
  ] as const;

  return (
    <main style={{ minHeight:'100vh', backgroundColor:t.pageBg, color:t.textPrimary, overflowX:'hidden' }}>

      {/* ══════════════ ALL STYLES ══════════════ */}
      <style>{`

        /* ── Keyframes ── */
        @keyframes glowPulse     { 0%,100%{opacity:.5}  50%{opacity:1} }
        @keyframes floatY        { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes dotPulse      { 0%,100%{box-shadow:0 0 0 0 rgba(46,204,113,.5)} 50%{box-shadow:0 0 0 5px rgba(46,204,113,0)} }
        @keyframes tabSlide      { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes borderGlow    { 0%,100%{border-color:rgba(46,204,113,.3)} 50%{border-color:rgba(46,204,113,.65)} }
        @keyframes wlfShimmer    { 0%{transform:translateX(-130%) skewX(-16deg)} 100%{transform:translateX(230%) skewX(-16deg)} }
        @keyframes wlfGlowPulse  { 0%,100%{opacity:.5;transform:translate(-50%,-50%) scale(1)} 50%{opacity:.88;transform:translate(-50%,-50%) scale(1.08)} }
        @keyframes fadeUp        { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes tagPop        { 0%{transform:scale(0.85);opacity:0} 100%{transform:scale(1);opacity:1} }

        /* ── Back link ── */
        .back-link { display:inline-flex; align-items:center; gap:8px; text-decoration:none; transition:all .25s ease; font-weight:600; font-size:14px; }
        .back-link:hover { gap:12px; }
        .back-link .arrow { transition:transform .25s ease; display:inline-flex; }
        .back-link:hover .arrow { transform:translateX(-4px); }

        /* ── Buttons ── */
        .reg-btn-main {
          position:relative; overflow:hidden; display:inline-flex; align-items:center; gap:8px;
          background-color:#2ECC71; color:#000; padding:14px 28px; border-radius:12px;
          font-weight:800; font-size:15px; text-decoration:none;
          box-shadow:0 4px 20px rgba(46,204,113,.4); transition:all .3s cubic-bezier(.4,0,.2,1);
        }
        .reg-btn-main::before { content:''; position:absolute; inset:0; background:linear-gradient(90deg,transparent,rgba(255,255,255,.3),transparent); transform:translateX(-100%); transition:transform .5s ease; }
        .reg-btn-main:hover::before { transform:translateX(100%); }
        .reg-btn-main:hover { transform:translateY(-3px); box-shadow:0 12px 32px rgba(46,204,113,.55); }

        .outline-btn-main { display:inline-flex; align-items:center; gap:6px; border:1px solid rgba(46,204,113,.3); color:inherit; padding:14px 24px; border-radius:12px; font-weight:700; font-size:15px; text-decoration:none; background:rgba(46,204,113,.04); transition:all .25s ease; }
        .outline-btn-main:hover { background:rgba(46,204,113,.1)!important; border-color:rgba(46,204,113,.55)!important; transform:translateY(-2px); }

        /* ── Info cards ── */
        .info-card-item { transition:all .28s cubic-bezier(.4,0,.2,1); cursor:default; }
        .info-card-item:hover { transform:translateY(-5px) scale(1.03); border-color:rgba(46,204,113,.55)!important; box-shadow:0 10px 30px rgba(46,204,113,.15); background:rgba(46,204,113,.07)!important; }

        /* ── Tabs ── */
        .tab-button { background:none; border:none; cursor:pointer; transition:all .25s ease; position:relative; padding:12px 22px; border-radius:10px 10px 0 0; font-weight:700; font-size:14px; display:inline-flex; align-items:center; gap:7px; }
        .tab-button::after { content:''; position:absolute; bottom:-1px; left:50%; transform:translateX(-50%); width:0; height:2px; background:#2ECC71; border-radius:999px; transition:width .3s ease; }
        .tab-button.tab-active::after { width:75%; }
        .tab-button:hover:not(.tab-active) { background:rgba(46,204,113,.06); }
        .tab-content-anim { animation:tabSlide .35s cubic-bezier(.4,0,.2,1) both; }

        /* ── Curriculum rows ── */
        .learn-card { display:flex; align-items:flex-start; gap:12px; border:1px solid rgba(46,204,113,.15); border-radius:14px; padding:16px 18px; background:rgba(46,204,113,.03); transition:all .25s ease; cursor:default; }
        .learn-card:hover { border-color:rgba(46,204,113,.4)!important; background:rgba(46,204,113,.07)!important; transform:translateY(-3px); box-shadow:0 6px 20px rgba(46,204,113,.12); }
        .roadmap-row { display:grid; grid-template-columns:130px 1fr; border:1px solid rgba(46,204,113,.18); border-radius:16px; overflow:hidden; transition:all .3s cubic-bezier(.4,0,.2,1); cursor:default; }
        .roadmap-row:hover { border-color:rgba(46,204,113,.5)!important; transform:translateX(8px); box-shadow:0 6px 24px rgba(46,204,113,.14); }
        .outcome-row { display:flex; align-items:flex-start; gap:14px; padding:16px 20px; border:1px solid rgba(46,204,113,.14); border-radius:14px; background:rgba(46,204,113,.025); transition:all .25s ease; cursor:default; }
        .outcome-row:hover { border-color:rgba(46,204,113,.4)!important; background:rgba(46,204,113,.07)!important; transform:translateX(7px); }

        /* ── Format tag (Solo / Team) ── */
        .format-tag {
          display:inline-flex; align-items:center; gap:6px;
          border-radius:999px; padding:5px 14px;
          font-size:12px; font-weight:800; letter-spacing:0.08em; text-transform:uppercase;
          animation:tagPop .4s cubic-bezier(.34,1.56,.64,1) both;
        }
        .format-tag--team {
          background:rgba(46,204,113,0.14); border:1.5px solid rgba(46,204,113,0.45); color:#2ECC71;
        }
        .format-tag--solo {
          background:rgba(99,179,237,0.12); border:1.5px solid rgba(99,179,237,0.4); color:#63B3ED;
        }

        /* ── Final CTA ── */
        .final-cta-reg { position:relative; overflow:hidden; display:inline-flex; align-items:center; gap:10px; background-color:#2ECC71; color:#000; padding:15px 36px; border-radius:14px; font-weight:900; font-size:16px; text-decoration:none; box-shadow:0 6px 24px rgba(46,204,113,.45); transition:all .3s cubic-bezier(.4,0,.2,1); }
        .final-cta-reg::before { content:''; position:absolute; inset:0; background:linear-gradient(90deg,transparent,rgba(255,255,255,.28),transparent); transform:translateX(-100%); transition:transform .5s ease; }
        .final-cta-reg:hover::before { transform:translateX(100%); }
        .final-cta-reg:hover { transform:translateY(-4px); box-shadow:0 16px 36px rgba(46,204,113,.55); }

        /* ── Section title ── */
        .section-title { display:flex; align-items:center; gap:12px; margin-bottom:22px; }
        .section-title-bar { width:4px; height:24px; border-radius:999px; background:linear-gradient(180deg,#2ECC71,rgba(46,204,113,.25)); box-shadow:0 0 10px rgba(46,204,113,.5); }
        .section-title-text { color:#2ECC71; font-size:11px; font-weight:800; letter-spacing:.15em; text-transform:uppercase; }
        .fee-badge { animation:floatY 3.5s ease-in-out infinite; }
        .status-dot { animation:dotPulse 1.8s ease-in-out infinite; }

        /* ════════════════════════════════════════
           WING LOGO FRAME
           ════════════════════════════════════════ */
        .wing-logo-frame {
          position: relative;
          border-radius: 20px;
          border: 1px solid rgba(46,204,113,0.28);
          background: linear-gradient(145deg, rgba(8,22,14,0.98) 0%, rgba(4,12,8,0.98) 100%);
          overflow: hidden;
          box-shadow: 0 0 0 1px rgba(46,204,113,0.06), 0 8px 40px rgba(0,0,0,0.5), 0 0 50px rgba(46,204,113,0.07);
          transition: box-shadow .4s ease, border-color .4s ease;
        }
        .wing-logo-frame::before {
          content:''; position:absolute; top:0; left:0; right:0; height:3px; z-index:5;
          background:linear-gradient(90deg,#2ECC71,#3DED97,#27AE60);
          border-radius:20px 20px 0 0;
        }
        .wing-logo-frame:hover {
          border-color: rgba(46,204,113,0.5);
          box-shadow: 0 0 0 1px rgba(46,204,113,0.1), 0 12px 50px rgba(0,0,0,0.55), 0 0 70px rgba(46,204,113,0.16);
        }
        .wing-logo-frame:hover .wlf-img {
          filter: drop-shadow(0 0 20px rgba(46,204,113,0.42)) drop-shadow(0 8px 20px rgba(0,0,0,0.7)) !important;
          transform: scale(1.04);
        }
        .wlf-texture {
          position:absolute; inset:0; pointer-events:none; z-index:0;
          background-image: radial-gradient(circle,rgba(46,204,113,0.055) 1px,transparent 1px);
          background-size: 22px 22px;
        }
        .wlf-glow {
          position:absolute; left:50%; top:50%;
          transform:translate(-50%,-50%);
          width:80%; height:80%; border-radius:50%;
          background:radial-gradient(circle,rgba(46,204,113,0.18) 0%,transparent 70%);
          filter:blur(20px); pointer-events:none; z-index:1;
          animation:wlfGlowPulse 3.8s ease-in-out infinite;
        }
        .wlf-shimmer {
          position:absolute; inset:0; z-index:3; pointer-events:none;
          background:linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.055) 50%,transparent 70%);
          animation:wlfShimmer 5.5s ease-in-out infinite;
        }
        .wlf-img {
          display:block; width:100%; max-width:100%; height:auto;
          object-fit:contain; object-position:center; border-radius:10px;
          user-select:none;
          filter:drop-shadow(0 0 10px rgba(46,204,113,0.22)) drop-shadow(0 6px 18px rgba(0,0,0,0.65));
          transition:filter .4s ease, transform .4s ease;
        }
        .wlf-pill {
          position:absolute; bottom:10px; left:10px; z-index:4;
          display:inline-flex; align-items:center; gap:5px;
          background:rgba(4,12,8,0.82); border:1px solid rgba(46,204,113,0.35);
          border-radius:999px; padding:4px 11px; backdrop-filter:blur(10px);
        }
        .wlf-pill-dot {
          width:5px; height:5px; border-radius:50%; background:#2ECC71;
          box-shadow:0 0 5px rgba(46,204,113,0.9); flex-shrink:0;
          animation:dotPulse 2s ease-in-out infinite;
        }
        .wlf-pill-text { color:#2ECC71; font-size:9px; font-weight:800; letter-spacing:.12em; text-transform:uppercase; }

        /* ════════════════════════════════════════
           HERO LAYOUT
           ════════════════════════════════════════ */
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 48px;
          align-items: flex-start;
        }
        .hero-right-col {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .logo-mobile-block { display: none; }
        .fee-inline-strip { display: none; }

        @media (max-width: 700px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 0;
          }
          .hero-right-col { display: none; }
          .logo-mobile-block {
            display: block;
            width: 100%;
            margin-bottom: 20px;
          }
          .fee-inline-strip {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            background: rgba(46,204,113,0.09);
            border: 1px solid rgba(46,204,113,0.32);
            border-radius: 12px;
            padding: 8px 16px 8px 12px;
            margin-bottom: 22px;
          }
          .hero-eyebrow-wrap { justify-content: center; }
          .hero-cta-row      { justify-content: center; }
          .hero-desc         { margin-left:auto; margin-right:auto; }
          .hero-text-col     { text-align: center; }
          .format-tags-row   { justify-content: center; }
        }

        @media (max-width: 420px) {
          .tab-button { padding:9px 8px; font-size:11px; gap:4px; }
          .roadmap-row { grid-template-columns:85px 1fr; }
        }
      `}</style>

      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <div style={{ position:'relative', overflow:'hidden', paddingTop:'108px', paddingBottom:'64px' }}>

        {/* BG orbs */}
        <div style={{ position:'absolute', top:'-140px', right:'-140px', width:'520px', height:'520px', background:'radial-gradient(circle,rgba(46,204,113,0.13) 0%,transparent 70%)', borderRadius:'50%', pointerEvents:'none', animation:'glowPulse 3.5s ease-in-out infinite' }} />
        <div style={{ position:'absolute', bottom:'-100px', left:'-100px', width:'400px', height:'400px', background:'radial-gradient(circle,rgba(46,204,113,0.07) 0%,transparent 70%)', borderRadius:'50%', pointerEvents:'none', animation:'glowPulse 5s ease-in-out infinite 1.5s' }} />

        <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'0 24px' }}>

          {/* Back link */}
          <div style={{ opacity:mounted?1:0, transform:mounted?'none':'translateY(-12px)', transition:'opacity .4s ease,transform .4s ease', marginBottom:'36px' }}>
            <Link to={BOOTCAMP_BASE_PATH} className="back-link" style={{ color:t.textSecondary }}>
              <span className="arrow"><ChevronLeft size={16} strokeWidth={2.5} /></span>
              Back to Bootcamp
            </Link>
          </div>

          {/* ══ Hero Grid ══ */}
          <div className="hero-grid">

            {/* ── LEFT / TEXT COLUMN ── */}
            <div
              className="hero-text-col"
              style={{ opacity:mounted?1:0, transform:mounted?'none':'translateY(30px)', transition:'opacity .6s ease .1s,transform .6s ease .1s' }}
            >
              {/* Eyebrow pill + Format tag row */}
              <div style={{ display:'flex', marginBottom:'18px' }}>
                <div className="hero-eyebrow-wrap" style={{ display:'inline-flex', alignItems:'center', gap:'10px', flexWrap:'wrap' as const }}>
                  {/* Eyebrow pill */}
                  <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', backgroundColor:'rgba(46,204,113,0.12)', border:'1px solid rgba(46,204,113,0.3)', borderRadius:'999px', padding:'6px 16px' }}>
                    <span style={{ width:'7px', height:'7px', borderRadius:'50%', backgroundColor:'#2ECC71', display:'inline-block', boxShadow:'0 0 8px rgba(46,204,113,0.8)', animation:'dotPulse 2s ease-in-out infinite' }} />
                    <span style={{ color:'#2ECC71', fontSize:'12px', fontWeight:800, letterSpacing:'0.12em', textTransform:'uppercase' as const }}>
                      {wing.eyebrow}
                    </span>
                  </div>

                  {/* Solo / Team tag */}
                  {formatTag && (
                    <div
                      className={`format-tag format-tag--${formatTag.toLowerCase()}`}
                      style={{ animationDelay: '0.2s' }}
                    >
                      {formatTag === 'Team'
                        ? <UsersRound size={12} strokeWidth={2.5} />
                        : <UserCheck  size={12} strokeWidth={2.5} />
                      }
                      {formatTag}
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile-only logo */}
              <div className="logo-mobile-block">
                <WingLogoFrame
                  src={logoSrc}
                  alt={`${wing.title} wing logo`}
                  eyebrow={wing.eyebrow}
                  variant="mobile"
                />
              </div>

              {/* Mobile-only fee strip */}
              <div style={{ display:'flex', justifyContent:'center' }}>
                <div className="fee-inline-strip">
                  <span style={{ width:'28px', height:'28px', borderRadius:'8px', background:'rgba(46,204,113,0.15)', border:'1px solid rgba(46,204,113,0.35)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <Sparkles size={13} color="#2ECC71" strokeWidth={2} />
                  </span>
                  <div style={{ display:'flex', flexDirection:'column' as const, gap:'1px' }}>
                    <span style={{ color:'#2ECC71', fontSize:'9px', fontWeight:800, letterSpacing:'0.14em', textTransform:'uppercase' as const, lineHeight:1 }}>Registration Fee</span>
                    <span style={{ color:'#2ECC71', fontSize:'18px', fontWeight:900, lineHeight:1.1, textShadow:'0 0 14px rgba(46,204,113,0.5)' }}>{wing.fee}</span>
                    <span style={{ color:t.textSecondary, fontSize:'10px', lineHeight:1 }}>{wing.mode}</span>
                  </div>
                  {wing.status && (
                    <span style={{ display:'inline-flex', alignItems:'center', gap:'5px', backgroundColor:'rgba(46,204,113,0.12)', border:'1px solid rgba(46,204,113,0.28)', borderRadius:'999px', padding:'3px 10px', color:'#2ECC71', fontSize:'10px', fontWeight:700, whiteSpace:'nowrap' as const }}>
                      <span className="status-dot" style={{ width:'5px', height:'5px', borderRadius:'50%', backgroundColor:'#2ECC71', display:'inline-block' }} />
                      {wing.status}
                    </span>
                  )}
                </div>
              </div>

              {/* Title */}
              <h1 style={{ fontSize:'clamp(36px,5.5vw,64px)', lineHeight:1.1, fontWeight:900, marginBottom:'20px', letterSpacing:'-0.025em' }}>
                {wing.title}
              </h1>

              {/* Description */}
              <p className="hero-desc" style={{ color:t.textSecondary, fontSize:'17px', lineHeight:1.85, maxWidth:'680px', marginBottom:'36px' }}>
                {wing.detailIntro}
              </p>

              {/* CTA buttons */}
              <div className="hero-cta-row" style={{ display:'flex', flexWrap:'wrap' as const, gap:'14px', alignItems:'center' }}>
                <a
                  href={getRegistrationUrl(wing.slug, wing.registrationUrl)}
                  target="_blank" rel="noreferrer"
                  onClick={(e) => handleRegistrationClick(e, getRegistrationUrl(wing.slug, wing.registrationUrl))}
                  className="reg-btn-main"
                >
                  <Sparkles size={15} strokeWidth={2.2} />
                  Register Now — Free
                </a>
                <Link to={BOOTCAMP_BASE_PATH} className="outline-btn-main">
                  All Wings <ArrowRight size={15} strokeWidth={2} />
                </Link>
              </div>
            </div>

            {/* ── RIGHT COLUMN (desktop only) ── */}
            <div
              className="hero-right-col"
              style={{ opacity:mounted?1:0, transform:mounted?'none':'translateX(30px)', transition:'opacity .6s ease .22s,transform .6s ease .22s' }}
            >
              <WingLogoFrame
                src={logoSrc}
                alt={`${wing.title} wing logo`}
                eyebrow={wing.eyebrow}
                variant="desktop"
              />

              {/* Fee badge */}
              <div
                className="fee-badge"
                style={{ border:'1.5px solid rgba(46,204,113,0.4)', borderRadius:'22px', padding:'26px 30px', textAlign:'center', background:'rgba(46,204,113,0.07)', backdropFilter:'blur(14px)', boxShadow:'0 8px 36px rgba(46,204,113,0.18), inset 0 1px 0 rgba(46,204,113,0.2)' }}
              >
                <p style={{ color:'#2ECC71', fontSize:'11px', fontWeight:800, letterSpacing:'0.14em', textTransform:'uppercase' as const, marginBottom:'10px' }}>Registration Fee</p>
                <p style={{ fontSize:'44px', fontWeight:900, color:'#2ECC71', lineHeight:1, textShadow:'0 0 24px rgba(46,204,113,0.55)', marginBottom:'8px' }}>{wing.fee}</p>
                <p style={{ color:t.textSecondary, fontSize:'13px', lineHeight:1.5 }}>{wing.mode}</p>
              </div>

              {/* Status pill */}
              {wing.status && (
                <div style={{ display:'flex', justifyContent:'center' }}>
                  <div style={{ backgroundColor:'rgba(46,204,113,0.12)', border:'1px solid rgba(46,204,113,0.3)', borderRadius:'999px', padding:'7px 18px', color:'#2ECC71', fontSize:'13px', fontWeight:700, display:'inline-flex', alignItems:'center', gap:'8px' }}>
                    <span className="status-dot" style={{ width:'6px', height:'6px', borderRadius:'50%', backgroundColor:'#2ECC71', display:'inline-block' }} />
                    {wing.status}
                  </div>
                </div>
              )}

              {/* Format tag — desktop right col */}
              {formatTag && (
                <div style={{ display:'flex', justifyContent:'center' }}>
                  <div className={`format-tag format-tag--${formatTag.toLowerCase()}`} style={{ fontSize:'13px', padding:'7px 20px' }}>
                    {formatTag === 'Team'
                      ? <UsersRound size={14} strokeWidth={2.5} />
                      : <UserCheck  size={14} strokeWidth={2.5} />
                    }
                    {formatTag} Wing
                  </div>
                </div>
              )}
            </div>

          </div>{/* /hero-grid */}
        </div>
      </div>

      {/* Divider */}
      <div style={{ height:'1px', background:'linear-gradient(90deg,transparent,rgba(46,204,113,0.3),transparent)', maxWidth:'1200px', margin:'0 auto' }} />

      {/* ─── MAIN CONTENT ─────────────────────────────────────────────────── */}
      <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'60px 24px 90px' }}>

        {/* Quick Details */}
        <section style={{ marginBottom:'56px', opacity:mounted?1:0, transform:mounted?'none':'translateY(24px)', transition:'opacity .6s ease .3s,transform .6s ease .3s' }}>
          <div className="section-title">
            <div className="section-title-bar" />
            <span className="section-title-text">Quick Details</span>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', gap:'14px' }}>
            {infoItems.map((item, i) => (
              <div key={item.label} className="info-card-item"
                onMouseEnter={() => setHoveredInfo(i)} onMouseLeave={() => setHoveredInfo(null)}
                style={{ border:hoveredInfo===i?'1px solid rgba(46,204,113,.55)':'1px solid rgba(46,204,113,.16)', borderRadius:'16px', padding:'18px', backgroundColor:hoveredInfo===i?'rgba(46,204,113,.07)':'rgba(46,204,113,.03)' }}>
                <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'10px' }}>
                  {item.icon}
                  <span style={{ color:'#2ECC71', fontSize:'11px', fontWeight:800, letterSpacing:'.1em', textTransform:'uppercase' as const }}>{item.label}</span>
                </div>
                <p style={{ margin:0, color:t.textPrimary, fontWeight:700, fontSize:'14px', lineHeight:1.6 }}>{item.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tabbed Curriculum */}
        <section style={{ marginBottom:'56px', opacity:mounted?1:0, transform:mounted?'none':'translateY(24px)', transition:'opacity .6s ease .42s,transform .6s ease .42s' }}>
          <div className="section-title">
            <div className="section-title-bar" />
            <span className="section-title-text">Curriculum</span>
          </div>

          {/* Tab bar */}
          <div style={{ display:'flex', gap:'4px', borderBottom:'1px solid rgba(46,204,113,0.18)', marginBottom:'28px', flexWrap:'wrap' as const }}>
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as typeof activeTab)}
                className={`tab-button ${activeTab===tab.key?'tab-active':''}`}
                style={{
                  color: activeTab===tab.key ? '#2ECC71' : t.textSecondary,
                  backgroundColor: activeTab===tab.key ? 'rgba(46,204,113,0.07)' : 'transparent',
                  ...(tab.key === 'components' ? {
                    borderTop: '1px solid rgba(46,204,113,0.25)',
                    borderLeft: '1px solid rgba(46,204,113,0.15)',
                    borderRight: '1px solid rgba(46,204,113,0.15)',
                  } : {}),
                }}
              >
                {tab.icon}
                {tab.label}
                {/* Wing-1-only badge on the tab */}
                {tab.key === 'components' && (
                  <span style={{
                    marginLeft: '4px',
                    background: 'rgba(46,204,113,0.18)',
                    border: '1px solid rgba(46,204,113,0.35)',
                    color: '#2ECC71',
                    fontSize: '9px',
                    fontWeight: 900,
                    letterSpacing: '0.08em',
                    borderRadius: '999px',
                    padding: '1px 7px',
                    textTransform: 'uppercase' as const,
                  }}>W1</span>
                )}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div key={activeTab} className="tab-content-anim">

            {activeTab === 'learn' && (
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:'12px' }}>
                {wing.highlights.map((item) => (
                  <div key={item} className="learn-card">
                    <span style={{ width:'8px', height:'8px', borderRadius:'50%', backgroundColor:'#2ECC71', flexShrink:0, marginTop:'6px', boxShadow:'0 0 6px rgba(46,204,113,0.6)' }} />
                    <span style={{ color:t.textSecondary, fontSize:'14px', lineHeight:1.75 }}>{item}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'roadmap' && (
              <div style={{ display:'grid', gap:'14px' }}>
                {wing.roadmap.map((item, i) => (
                  <div key={`${item.period}-${item.title}`} className="roadmap-row"
                    style={{ backgroundColor:hoveredCard===i?'rgba(46,204,113,0.05)':'rgba(46,204,113,0.025)' }}
                    onMouseEnter={() => setHoveredCard(i)} onMouseLeave={() => setHoveredCard(null)}>
                    <div style={{ backgroundColor:'rgba(46,204,113,0.1)', borderRight:'1px solid rgba(46,204,113,0.2)', padding:'22px 16px', display:'flex', alignItems:'center', justifyContent:'center', textAlign:'center' as const }}>
                      <span style={{ color:'#2ECC71', fontWeight:900, fontSize:'13px', lineHeight:1.45 }}>{item.period}</span>
                    </div>
                    <div style={{ padding:'22px 26px' }}>
                      <h3 style={{ fontSize:'17px', fontWeight:800, marginBottom:'12px', color:t.textPrimary }}>{item.title}</h3>
                      <ul style={{ margin:0, paddingLeft:'18px', color:t.textSecondary, lineHeight:1.85, fontSize:'14px' }}>
                        {item.points.map((point) => <li key={point}>{point}</li>)}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'outcomes' && (
              <div style={{ display:'grid', gap:'10px' }}>
                {wing.outcomes.map((item, i) => (
                  <div key={item} className="outcome-row">
                    <span style={{ width:'26px', height:'26px', borderRadius:'50%', backgroundColor:'rgba(46,204,113,0.15)', border:'1.5px solid rgba(46,204,113,0.4)', color:'#2ECC71', fontSize:'12px', fontWeight:900, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:'1px' }}>{i+1}</span>
                    <span style={{ color:t.textSecondary, fontSize:'15px', lineHeight:1.78 }}>{item}</span>
                  </div>
                ))}
              </div>
            )}

            {/* ══ COMPONENTS TAB — Wing 1 only ══ */}
            {activeTab === 'components' && isWing1 && (
              <ComponentsTable t={t} />
            )}

          </div>
        </section>

        {/* Final CTA */}
        <section style={{ opacity:mounted?1:0, transform:mounted?'none':'translateY(24px)', transition:'opacity .6s ease .54s,transform .6s ease .54s' }}>
          <div style={{ position:'relative', overflow:'hidden', borderRadius:'24px', border:'1px solid rgba(46,204,113,0.3)', padding:'60px 40px', background:'linear-gradient(135deg,rgba(46,204,113,0.09) 0%,rgba(46,204,113,0.03) 100%)', textAlign:'center', animation:'borderGlow 4s ease-in-out infinite' }}>
            <div style={{ position:'absolute', top:'-70px', left:'-70px', width:'240px', height:'240px', background:'radial-gradient(circle,rgba(46,204,113,0.14) 0%,transparent 70%)', borderRadius:'50%', pointerEvents:'none' }} />
            <div style={{ position:'absolute', bottom:'-70px', right:'-70px', width:'240px', height:'240px', background:'radial-gradient(circle,rgba(46,204,113,0.1) 0%,transparent 70%)', borderRadius:'50%', pointerEvents:'none' }} />
            <div style={{ position:'relative', zIndex:1 }}>
              <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', backgroundColor:'rgba(46,204,113,0.12)', border:'1px solid rgba(46,204,113,0.32)', borderRadius:'999px', padding:'6px 18px', marginBottom:'22px', color:'#2ECC71', fontSize:'12px', fontWeight:800, letterSpacing:'0.1em', textTransform:'uppercase' as const }}>
                <Sparkles size={13} strokeWidth={2.2} color="#2ECC71" />
                100% Free — Limited Seats
              </div>
              <h2 style={{ fontSize:'clamp(24px,4vw,42px)', fontWeight:900, marginBottom:'16px', letterSpacing:'-0.015em' }}>
                Ready to Join{' '}
                <span style={{ color:'#2ECC71', textShadow:'0 0 20px rgba(46,204,113,0.4)' }}>{wing.shortTitle}</span>?
              </h2>
              <p style={{ color:t.textSecondary, fontSize:'16px', lineHeight:1.8, maxWidth:'540px', margin:'0 auto 36px' }}>
                This bootcamp wing is completely free. Secure your spot now before seats fill up.
              </p>
              <div style={{ display:'flex', justifyContent:'center', flexWrap:'wrap' as const, gap:'16px' }}>
                <a href={getRegistrationUrl(wing.slug, wing.registrationUrl)} target="_blank" rel="noreferrer"
                  onClick={(e) => handleRegistrationClick(e, getRegistrationUrl(wing.slug, wing.registrationUrl))}
                  className="final-cta-reg">
                  Register for {wing.shortTitle}
                  <ArrowRight size={17} strokeWidth={2.5} />
                </a>
                <Link to={BOOTCAMP_BASE_PATH} className="outline-btn-main" style={{ padding:'15px 28px', fontSize:'15px' }}>
                  Explore All Wings
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}