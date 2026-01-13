import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'motion/react';
import { 
  Download, 
  Smartphone, 
  Shield, 
  Zap, 
  Users, 
  AlertCircle, 
  CheckCircle, 
  X, 
  ChevronDown,
  Star,
  Sparkles,
  Bell,
  Calendar,
  MessageSquare,
  Trophy,
  Copy,
  Check,
  Play,
  Wifi,
  Battery,
  Signal,
  Heart,
  Share2,
  ArrowRight,
  Rocket,
  Gift,
  Clock,
  MapPin
} from 'lucide-react';
import { Button } from './ui/button';

// Floating Particle Component
const FloatingParticle = ({ delay, duration, size, left, top }: { 
  delay: number; 
  duration: number; 
  size: number; 
  left: string; 
  top: string; 
}) => (
  <motion.div
    className="absolute rounded-full bg-[#2ECC71]"
    style={{ width: size, height: size, left, top }}
    animate={{
      y: [-20, 20, -20],
      x: [-10, 10, -10],
      opacity: [0.2, 0.5, 0.2],
      scale: [1, 1.3, 1],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

// Glowing Orb Component
const GlowingOrb = ({ className, delay = 0 }: { className: string; delay?: number }) => (
  <motion.div
    className={`absolute rounded-full blur-3xl ${className}`}
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.5, 0.3],
    }}
    transition={{
      duration: 4,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

// Animated Counter Component
const AnimatedCounter = ({ value, suffix = '' }: { value: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000;
          const steps = 60;
          const increment = value / steps;
          let current = 0;
          
          const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, hasAnimated]);
  
  return <span ref={ref}>{count}{suffix}</span>;
};

// Notification Popup Component
const NotificationPopup = ({ 
  icon: Icon, 
  title, 
  message, 
  delay, 
  position 
}: { 
  icon: any; 
  title: string; 
  message: string; 
  delay: number;
  position: { top?: string; bottom?: string; left?: string; right?: string };
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8, x: position.right ? 50 : -50 }}
    animate={{ opacity: 1, scale: 1, x: 0 }}
    transition={{ delay, duration: 0.5, type: "spring" }}
    className="absolute bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-4 shadow-2xl w-56 z-20"
    style={position}
  >
    <motion.div
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="flex items-start gap-3"
    >
      <div className="w-10 h-10 bg-[#2ECC71]/20 rounded-xl flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-[#2ECC71]" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-white text-sm font-semibold truncate">{title}</h4>
        <p className="text-gray-400 text-xs mt-0.5 line-clamp-2">{message}</p>
      </div>
    </motion.div>
  </motion.div>
);

// Feature Pill Component
const FeaturePill = ({ 
  icon: Icon, 
  text, 
  delay, 
  position 
}: { 
  icon: any; 
  text: string; 
  delay: number;
  position: { top?: string; bottom?: string; left?: string; right?: string };
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="absolute z-20"
    style={position}
  >
    <motion.div
      animate={{ y: [-5, 5, -5] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      className="bg-black/80 backdrop-blur-xl border border-[#2ECC71]/30 rounded-full px-4 py-2 flex items-center gap-2 shadow-lg"
    >
      <Icon className="w-4 h-4 text-[#2ECC71]" />
      <span className="text-white text-sm font-medium">{text}</span>
    </motion.div>
  </motion.div>
);

export function AppDownloadPage() {
  const [isAndroid, setIsAndroid] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);
  const mockupY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const mockupRotate = useTransform(scrollYProgress, [0, 0.3], [0, -5]);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);
  
  const mockupX = useTransform(smoothMouseX, [-500, 500], [-15, 15]);
  const mockupRotateY = useTransform(smoothMouseX, [-500, 500], [-10, 10]);
  const mockupRotateX = useTransform(smoothMouseY, [-500, 500], [10, -10]);

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    setIsAndroid(/android/i.test(userAgent));
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set(clientX - innerWidth / 2);
      mouseY.set(clientY - innerHeight / 2);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Auto-rotate features
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleDownload = async () => {
    if (isAndroid) {
      setIsDownloading(true);
      setDownloadProgress(0);
      
      const interval = setInterval(() => {
        setDownloadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setIsDownloading(false);
              const link = document.createElement('a');
              link.href = '/src/assets/APK/app-release.apk';
              link.download = 'AUSTRC-App.apk';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }, 500);
            return 100;
          }
          return prev + Math.random() * 15;
        });
      }, 200);
    } else {
      setShowModal(true);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Optimized for blazing fast performance on all Android devices",
      color: "from-yellow-500 to-orange-500",
      bgColor: "from-yellow-500/20 to-orange-500/20"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Stay Connected",
      description: "Real-time updates about events, workshops, and activities",
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-500/20 to-cyan-500/20"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure & Private",
      description: "Industry-standard encryption protects your data",
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-500/20 to-emerald-500/20"
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Native Experience",
      description: "Built specifically for Android with native features",
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-500/20 to-pink-500/20"
    }
  ];

  const stats = [
    { value: 500, suffix: '+', label: 'Downloads', icon: Download },
    { value: 4.8, suffix: '', label: 'Rating', icon: Star },
    { value: 15, suffix: 'MB', label: 'Size', icon: Smartphone },
    { value: 100, suffix: '%', label: 'Free', icon: Gift }
  ];

  const appFeatures = [
    {
      icon: Bell,
      title: "Smart Notifications",
      description: "Get instant alerts for events, deadlines, and updates"
    },
    {
      icon: Calendar,
      title: "Event Calendar",
      description: "Never miss a workshop, competition, or meetup"
    },
    {
      icon: MessageSquare,
      title: "Community Hub",
      description: "Connect and collaborate with fellow members"
    },
    {
      icon: Trophy,
      title: "Achievements",
      description: "Track progress and earn recognition badges"
    },
    {
      icon: MapPin,
      title: "Event Locations",
      description: "Find venues with integrated maps and directions"
    },
    {
      icon: Clock,
      title: "Reminders",
      description: "Set custom reminders for important activities"
    }
  ];

  const screenshots = [
    { title: "Home Dashboard", color: "from-[#2ECC71] to-[#27AE60]" },
    { title: "Events Feed", color: "from-blue-500 to-cyan-500" },
    { title: "Community", color: "from-purple-500 to-pink-500" }
  ];

  return (
    <main ref={containerRef} className="relative min-h-screen bg-black overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Main Gradient Orbs */}
        <GlowingOrb className="w-[800px] h-[800px] bg-[#2ECC71]/20 top-[-200px] left-[-200px]" />
        <GlowingOrb className="w-[600px] h-[600px] bg-[#27AE60]/15 bottom-[-100px] right-[-100px]" delay={1} />
        <GlowingOrb className="w-[400px] h-[400px] bg-[#2ECC71]/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" delay={2} />
        
        {/* Floating Particles */}
        {[...Array(25)].map((_, i) => (
          <FloatingParticle
            key={i}
            delay={i * 0.2}
            duration={4 + Math.random() * 4}
            size={3 + Math.random() * 6}
            left={`${Math.random() * 100}%`}
            top={`${Math.random() * 100}%`}
          />
        ))}
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(46,204,113,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(46,204,113,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        
        {/* Radial Gradient Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,black_70%)]" />
        
        {/* Animated Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <motion.line
            x1="0%"
            y1="30%"
            x2="100%"
            y2="70%"
            stroke="url(#gradient1)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
          />
          <motion.line
            x1="100%"
            y1="20%"
            x2="0%"
            y2="80%"
            stroke="url(#gradient1)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 4, delay: 1, repeat: Infinity, repeatType: "reverse" }}
          />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2ECC71" stopOpacity="0" />
              <stop offset="50%" stopColor="#2ECC71" stopOpacity="1" />
              <stop offset="100%" stopColor="#2ECC71" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 pt-24 pb-20">
        {/* Hero Section */}
        <motion.section
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="min-h-[90vh] flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16"
        >
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left max-w-xl order-2 lg:order-1">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#2ECC71]/20 to-[#27AE60]/10 border border-[#2ECC71]/30 rounded-full px-5 py-2.5 mb-6"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-4 h-4 text-[#2ECC71]" />
              </motion.div>
              <span className="text-[#2ECC71] text-sm font-medium">Version 2.0 Now Available</span>
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-2 h-2 bg-[#2ECC71] rounded-full"
              />
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1]"
            >
              Your Club,
              <br />
              <span className="relative inline-block mt-2">
                <motion.span 
                  className="text-transparent bg-clip-text bg-gradient-to-r from-[#2ECC71] via-[#58D68D] to-[#27AE60]"
                  animate={{ 
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] 
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                  style={{ backgroundSize: '200% 200%' }}
                >
                  In Your Pocket
                </motion.span>
                <motion.svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 300 12"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                >
                  <motion.path
                    d="M0 6 Q75 0 150 6 T300 6"
                    fill="none"
                    stroke="url(#underline-gradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="underline-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#2ECC71" />
                      <stop offset="100%" stopColor="#27AE60" />
                    </linearGradient>
                  </defs>
                </motion.svg>
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-gray-400 text-lg sm:text-xl mb-8 leading-relaxed"
            >
              Experience AUST Robotics Club like never before. Get instant updates, 
              connect with members, and access exclusive content — all in one powerful app.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center gap-4 mb-10"
            >
              <Button
                onClick={handleDownload}
                disabled={isDownloading}
                className="group relative w-full sm:w-auto px-8 py-7 text-lg font-semibold bg-gradient-to-r from-[#2ECC71] to-[#27AE60] hover:from-[#27AE60] hover:to-[#2ECC71] text-white rounded-2xl shadow-[0_0_50px_0_rgba(46,204,113,0.4)] hover:shadow-[0_0_80px_0_rgba(46,204,113,0.6)] transition-all duration-500 overflow-hidden"
              >
                {/* Shine Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                  initial={{ x: '-200%' }}
                  animate={{ x: '200%' }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                />
                
                {isDownloading ? (
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <span>Downloading... {Math.min(Math.round(downloadProgress), 100)}%</span>
                  </div>
                ) : (
                  <>
                    <Download className="w-6 h-6 mr-3 group-hover:animate-bounce" />
                    <span>Download for Android</span>
                  </>
                )}
                
                {/* Version Badge */}
                <motion.span 
                  className="absolute -top-2 -right-2 bg-white text-[#2ECC71] text-xs font-bold px-3 py-1 rounded-full shadow-lg"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  FREE
                </motion.span>
              </Button>
              
              {/* Watch Demo Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group"
              >
                <span className="w-12 h-12 rounded-full bg-white/10 backdrop-blur flex items-center justify-center group-hover:bg-[#2ECC71]/20 transition-colors">
                  <Play className="w-5 h-5 ml-0.5" />
                </span>
                <span className="font-medium">Watch Demo</span>
              </motion.button>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-4 text-center hover:border-[#2ECC71]/30 transition-all duration-300"
                >
                  <stat.icon className="w-5 h-5 text-[#2ECC71] mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-gray-500 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Content - Mockup */}
          <motion.div
            ref={mockupRef}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            style={{ 
              y: mockupY,
              rotateZ: mockupRotate,
              rotateY: mockupRotateY,
              rotateX: mockupRotateX,
              x: mockupX
            }}
            className="relative order-1 lg:order-2 flex-shrink-0"
          >
            {/* Glow Behind Mockup */}
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.4, 0.6, 0.4]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-br from-[#2ECC71]/40 to-[#27AE60]/30 blur-[100px] rounded-full scale-75"
            />
            
            {/* Rotating Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-50px] border border-[#2ECC71]/20 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-100px] border border-dashed border-[#2ECC71]/10 rounded-full"
            />
            
            {/* Notification Popups */}
            <NotificationPopup
              icon={Calendar}
              title="New Event!"
              message="Robotics Workshop starts in 2 hours"
              delay={1.5}
              position={{ top: '10%', right: '-40%' }}
            />
            <NotificationPopup
              icon={Trophy}
              title="Achievement Unlocked!"
              message="You've earned the Early Bird badge"
              delay={2}
              position={{ bottom: '20%', left: '-45%' }}
            />
            
            {/* Feature Pills */}
            <FeaturePill
              icon={Zap}
              text="Fast & Smooth"
              delay={2.5}
              position={{ top: '30%', left: '-35%' }}
            />
            <FeaturePill
              icon={Shield}
              text="100% Secure"
              delay={2.8}
              position={{ bottom: '35%', right: '-30%' }}
            />
            
            {/* Main Mockup Image */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10"
              style={{ perspective: 1000 }}
            >
              {/* Reflection Effect */}
              <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[80%] h-32 bg-gradient-to-t from-[#2ECC71]/20 to-transparent blur-2xl rounded-full" />
              
              {/* Mockup Container */}
              <div className="relative">
                {/* Shine Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent rounded-[3rem] z-20 pointer-events-none"
                  animate={{ 
                    opacity: [0, 0.5, 0] 
                  }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                />
                
                {/* The Mockup Image */}
                <motion.img
                  src="/src/assets/mockup.png"
                  alt="AUSTRC Mobile App"
                  className="relative z-10 w-[280px] sm:w-[320px] md:w-[360px] lg:w-[400px] h-auto drop-shadow-[0_0_80px_rgba(46,204,113,0.3)]"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Decorative Elements */}
                <motion.div
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-[#2ECC71] to-[#27AE60] rounded-2xl flex items-center justify-center shadow-lg z-20"
                >
                  <Rocket className="w-8 h-8 text-white" />
                </motion.div>
                
                {/* Floating Icons */}
                {[Bell, Heart, Star, Share2].map((Icon, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-10 h-10 bg-gray-900/90 backdrop-blur border border-gray-700/50 rounded-xl flex items-center justify-center shadow-lg z-20"
                    style={{
                      top: `${20 + i * 20}%`,
                      [i % 2 === 0 ? 'left' : 'right']: '-15%'
                    }}
                    animate={{ 
                      y: [-5, 5, -5],
                      rotate: [-5, 5, -5]
                    }}
                    transition={{ 
                      duration: 3 + i * 0.5, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      delay: i * 0.3
                    }}
                  >
                    <Icon className="w-5 h-5 text-[#2ECC71]" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="flex justify-center mt-10"
        >
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-gray-500 cursor-pointer hover:text-[#2ECC71] transition-colors"
          >
            <span className="text-sm font-medium">Explore Features</span>
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>

        {/* Features Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="py-32"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.span 
              className="inline-block text-[#2ECC71] text-sm font-semibold tracking-wider uppercase mb-4 px-4 py-2 bg-[#2ECC71]/10 rounded-full border border-[#2ECC71]/20"
              whileHover={{ scale: 1.05 }}
            >
              ✨ Features
            </motion.span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4">
              Everything You Need,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2ECC71] to-[#27AE60]">
                Nothing You Don't
              </span>
            </h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
              Packed with powerful features designed to enhance your club experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                onHoverStart={() => setActiveFeature(index)}
                className={`group relative cursor-pointer ${activeFeature === index ? 'z-10' : ''}`}
              >
                {/* Active Indicator */}
                <AnimatePresence>
                  {activeFeature === index && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className={`absolute inset-0 bg-gradient-to-br ${feature.bgColor} rounded-3xl blur-xl`}
                    />
                  )}
                </AnimatePresence>
                
                <div className={`relative bg-gradient-to-b from-gray-900/90 to-black/90 backdrop-blur-xl p-8 rounded-3xl border transition-all duration-500 h-full ${
                  activeFeature === index ? 'border-[#2ECC71]/50 shadow-[0_0_40px_0_rgba(46,204,113,0.2)]' : 'border-gray-800/50 hover:border-gray-700'
                }`}>
                  <motion.div
                    animate={activeFeature === index ? { rotate: 360, scale: 1.1 } : { rotate: 0, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg`}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-white font-bold text-xl mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                  
                  {/* Arrow Indicator */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: activeFeature === index ? 1 : 0, x: activeFeature === index ? 0 : -10 }}
                    className="mt-4 flex items-center gap-2 text-[#2ECC71]"
                  >
                    <span className="text-sm font-medium">Learn more</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* App Showcase Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="py-32"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left - Multiple Mockups */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative h-[600px] flex items-center justify-center"
              >
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#2ECC71]/20 via-transparent to-[#27AE60]/20 blur-3xl rounded-full scale-75" />
                
                {/* Main Mockup */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-20"
                >
                  <img
                    src="/src/assets/mockup.png"
                    alt="AUSTRC App Main View"
                    className="w-[250px] sm:w-[280px] drop-shadow-[0_0_60px_rgba(46,204,113,0.4)]"
                  />
                </motion.div>
                
                {/* Left Mockup (Tilted) */}
                <motion.div
                  initial={{ opacity: 0, x: -50, rotateY: 25 }}
                  whileInView={{ opacity: 0.7, x: 0, rotateY: 25 }}
                  viewport={{ once: true }}
                  animate={{ y: [-15, 5, -15] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
                  style={{ perspective: 1000 }}
                >
                  <img
                    src="/src/assets/mockup.png"
                    alt="AUSTRC App Side View"
                    className="w-[180px] sm:w-[200px] opacity-60 blur-[1px]"
                  />
                </motion.div>
                
                {/* Right Mockup (Tilted) */}
                <motion.div
                  initial={{ opacity: 0, x: 50, rotateY: -25 }}
                  whileInView={{ opacity: 0.7, x: 0, rotateY: -25 }}
                  viewport={{ once: true }}
                  animate={{ y: [5, -15, 5] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
                  style={{ perspective: 1000 }}
                >
                  <img
                    src="/src/assets/mockup.png"
                    alt="AUSTRC App Side View"
                    className="w-[180px] sm:w-[200px] opacity-60 blur-[1px]"
                  />
                </motion.div>
                
                {/* Decorative Dots */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-[#2ECC71]' : 'bg-gray-600'}`}
                      animate={i === 0 ? { scale: [1, 1.3, 1] } : {}}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Right - Content */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-10"
                >
                  <span className="text-[#2ECC71] text-sm font-semibold tracking-wider uppercase">App Features</span>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3">
                    Designed for
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2ECC71] to-[#27AE60]"> Members</span>
                  </h2>
                  <p className="text-gray-400 mt-4 text-lg leading-relaxed">
                    Every feature is crafted with our community in mind, making it easier than ever to stay connected and engaged.
                  </p>
                </motion.div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {appFeatures.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="group flex items-start gap-4 p-4 rounded-2xl bg-gray-900/30 border border-gray-800/50 hover:border-[#2ECC71]/30 hover:bg-gray-900/50 transition-all duration-300"
                    >
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className="w-12 h-12 bg-[#2ECC71]/10 border border-[#2ECC71]/30 rounded-xl flex items-center justify-center text-[#2ECC71] flex-shrink-0 group-hover:bg-[#2ECC71]/20 transition-colors duration-300"
                      >
                        <feature.icon className="w-5 h-5" />
                      </motion.div>
                      <div>
                        <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Installation Guide Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="py-32"
        >
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-[#2ECC71] text-sm font-semibold tracking-wider uppercase">Installation</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3">
                Get Started in
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2ECC71] to-[#27AE60]"> 4 Easy Steps</span>
              </h2>
            </motion.div>

            <div className="relative">
              {/* Connection Line */}
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute left-8 lg:left-1/2 lg:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#2ECC71] via-[#2ECC71]/50 to-transparent origin-top hidden sm:block"
              />

              <div className="space-y-8 lg:space-y-0">
                {[
                  {
                    step: 1,
                    title: "Download the APK",
                    description: "Click the download button to get the latest version of AUSTRC app",
                    icon: Download
                  },
                  {
                    step: 2,
                    title: "Enable Unknown Sources",
                    description: "Go to Settings → Security → Enable 'Install from Unknown Sources'",
                    icon: Shield
                  },
                  {
                    step: 3,
                    title: "Open the APK File",
                    description: "Find the downloaded file in your Downloads folder and tap to open",
                    icon: Smartphone
                  },
                  {
                    step: 4,
                    title: "Install & Enjoy",
                    description: "Tap 'Install' and start exploring the AUSTRC app!",
                    icon: Sparkles
                  }
                ].map((item, index) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className={`relative flex items-center gap-6 lg:gap-12 ${
                      index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                    }`}
                  >
                    {/* Step Number */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="relative z-10 w-16 h-16 bg-gradient-to-br from-[#2ECC71] to-[#27AE60] rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-[0_0_40px_0_rgba(46,204,113,0.4)] flex-shrink-0"
                    >
                      {item.step}
                    </motion.div>

                    {/* Content Card */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className={`flex-1 bg-gradient-to-r ${
                        index % 2 === 0 
                          ? 'from-gray-900/80 to-black/40' 
                          : 'from-black/40 to-gray-900/80'
                      } backdrop-blur-sm p-6 rounded-2xl border border-gray-800/50 hover:border-[#2ECC71]/30 transition-all duration-300 lg:max-w-md ${
                        index % 2 === 0 ? '' : 'lg:ml-auto'
                      }`}
                    >
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-10 h-10 bg-[#2ECC71]/20 rounded-xl flex items-center justify-center">
                          <item.icon className="w-5 h-5 text-[#2ECC71]" />
                        </div>
                        <h3 className="text-white font-bold text-lg">{item.title}</h3>
                      </div>
                      <p className="text-gray-400 leading-relaxed">{item.description}</p>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Security Notice */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="mt-16 p-6 bg-gradient-to-r from-[#2ECC71]/10 via-[#2ECC71]/5 to-[#27AE60]/10 border border-[#2ECC71]/20 rounded-2xl"
            >
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <motion.div 
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-14 h-14 bg-[#2ECC71]/20 rounded-2xl flex items-center justify-center flex-shrink-0"
                >
                  <Shield className="w-7 h-7 text-[#2ECC71]" />
                </motion.div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-2">🔒 100% Safe & Verified</h3>
                  <p className="text-gray-400 leading-relaxed">
                    This app is developed and maintained by the official AUST Robotics Club team. 
                    It's completely safe to install and doesn't contain any malware or harmful code. 
                    Your privacy is our priority.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Final CTA Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="py-32"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="relative max-w-5xl mx-auto"
          >
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#2ECC71]/30 via-transparent to-[#27AE60]/30 rounded-[3rem] blur-[100px]" />
            
            {/* Animated Border */}
            <div className="absolute inset-0 rounded-[3rem] p-[2px] bg-gradient-to-r from-[#2ECC71] via-[#27AE60] to-[#2ECC71] bg-[length:200%_200%] animate-gradient-x">
              <div className="w-full h-full bg-black rounded-[3rem]" />
            </div>
            
            <div className="relative bg-gradient-to-b from-gray-900/90 to-black/95 backdrop-blur-xl p-10 sm:p-16 rounded-[3rem] text-center overflow-hidden">
              {/* Decorative Elements */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-32 -right-32 w-64 h-64 border border-[#2ECC71]/20 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-32 -left-32 w-80 h-80 border border-dashed border-[#2ECC71]/10 rounded-full"
              />
              
              {/* Floating Mockup */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                animate={{ y: [-10, 10, -10] }}
                transition={{ 
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                  opacity: { duration: 0.5 }
                }}
                className="mb-8"
              >
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-[#2ECC71]/30 blur-[60px] rounded-full" />
                  <img
                    src="/src/assets/mockup.png"
                    alt="AUSTRC App"
                    className="relative w-32 sm:w-40 mx-auto drop-shadow-[0_0_40px_rgba(46,204,113,0.4)]"
                  />
                </div>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
              >
                Ready to Experience
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2ECC71] to-[#27AE60]">
                  The Future?
                </span>
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-gray-400 text-lg max-w-2xl mx-auto mb-10"
              >
                Join hundreds of club members who are already enjoying our app. 
                Download now and never miss an update!
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button
                  onClick={handleDownload}
                  className="group relative px-10 py-7 text-lg font-semibold bg-gradient-to-r from-[#2ECC71] to-[#27AE60] hover:from-[#27AE60] hover:to-[#2ECC71] text-white rounded-2xl shadow-[0_0_50px_0_rgba(46,204,113,0.5)] hover:shadow-[0_0_80px_0_rgba(46,204,113,0.7)] transition-all duration-500"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-2xl"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                  <Download className="w-6 h-6 mr-3 group-hover:animate-bounce" />
                  Download Now — It's Free
                </Button>
                
                <Button
                  onClick={handleCopyLink}
                  variant="outline"
                  className="px-10 py-7 text-lg font-semibold border-2 border-gray-700 hover:border-[#2ECC71] text-white hover:bg-[#2ECC71]/10 rounded-2xl transition-all duration-300"
                >
                  {copied ? (
                    <>
                      <Check className="w-5 h-5 mr-2 text-[#2ECC71]" />
                      Link Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5 mr-2" />
                      Share with Friends
                    </>
                  )}
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="mt-10 flex flex-wrap items-center justify-center gap-6 text-gray-500 text-sm"
              >
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4" />
                  <span>Android 7.0+</span>
                </div>
                <div className="w-1 h-1 bg-gray-600 rounded-full" />
                <div className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  <span>15 MB</span>
                </div>
                <div className="w-1 h-1 bg-gray-600 rounded-full" />
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span>100% Secure</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.section>
      </div>

      {/* Modal for non-Android devices */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0, rotateX: -30 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotateX: 30 }}
              transition={{ type: "spring", damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-gradient-to-b from-gray-900 to-black p-8 sm:p-10 rounded-3xl border border-gray-800 max-w-md w-full shadow-[0_0_100px_0_rgba(46,204,113,0.2)]"
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-800/80 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-300"
              >
                <X className="w-5 h-5" />
              </motion.button>

              <div className="text-center">
                {/* Animated Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="relative w-24 h-24 mx-auto mb-6"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-2 border-dashed border-amber-500/30 rounded-full"
                  />
                  <div className="absolute inset-2 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-full flex items-center justify-center border border-amber-500/30">
                    <AlertCircle className="w-10 h-10 text-amber-400" />
                  </div>
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl sm:text-3xl font-bold text-white mb-3"
                >
                  Android Only
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-400 mb-8 leading-relaxed"
                >
                  This app is currently available only for{' '}
                  <span className="text-[#2ECC71] font-semibold">Android devices</span>. 
                  Open this page on your Android phone to download.
                </motion.p>

                {/* Mockup Preview */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mb-8"
                >
                  <img
                    src="/src/assets/mockup.png"
                    alt="AUSTRC App Preview"
                    className="w-24 mx-auto opacity-50"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-col gap-3"
                >
                  <Button
                    onClick={() => {
                      handleCopyLink();
                      setTimeout(() => setShowModal(false), 1000);
                    }}
                    className="w-full py-6 bg-gradient-to-r from-[#2ECC71] to-[#27AE60] hover:from-[#27AE60] hover:to-[#2ECC71] text-white font-semibold rounded-xl transition-all duration-300"
                  >
                    {copied ? (
                      <>
                        <Check className="w-5 h-5 mr-2" />
                        Copied to Clipboard!
                      </>
                    ) : (
                      <>
                        <Copy className="w-5 h-5 mr-2" />
                        Copy Link to Share
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={() => setShowModal(false)}
                    variant="outline"
                    className="w-full py-6 border-gray-700 hover:border-gray-600 text-gray-300 hover:text-white rounded-xl transition-all duration-300"
                  >
                    I Understand
                  </Button>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-gray-600 text-sm mt-6 flex items-center justify-center gap-2"
                >
                  <Smartphone className="w-4 h-4" />
                  Send the link to your Android device
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </main>
  );
}