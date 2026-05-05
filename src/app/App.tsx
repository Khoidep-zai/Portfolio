import { useState, useEffect, useRef } from 'react';
import { Code, Mail, Github, Linkedin, Book, Briefcase, User, MapPin, Phone, Award, Cpu, Wrench, Terminal, ChevronRight, Star, ExternalLink, Globe, Languages } from 'lucide-react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import avatarImg from '../pic/anh khôi.jpg';

// ─── Translations ────────────────────────────────────────────────────────────
const translations = {
  en: {
    nav: { about: 'about', skills: 'skills', projects: 'projects', contact: 'contact' },
    hero: {
      badge: 'Software Engineer · Van Lang University',
      subtitle: '"Undefeated against every line of code"',
      location: 'Go Vap District, Ho Chi Minh City',
      ctaContact: 'Contact me',
      ctaProjects: 'View projects',
      status: 'Open to internships',
      focus: 'Backend + AI focus',
    },
    about: {
      title: 'About Me',
      eduTitle: 'Education',
      eduSchool: 'Van Lang University',
      eduMajor: 'Software Engineering · 2023 – 2027',
      eduCertLabel: 'Certificates:',
      certs: [
        'Advanced Chatbots with Deep Learning and Python (2025)',
        'AI Workflow: Machine Learning, Visual Recognition and NLP (2025)',
      ],
      languageTitle: 'Language',
      languageLevel: 'English: B1',
      goalTitle: 'Career Objectives',
      goalNow: 'Currently seeking an internship / backend developer position to apply knowledge to real-world projects and accumulate experience with enterprise teams.',
      goalShort: 'Join practical backend development, work in teams to strengthen fundamentals and understand professional software development lifecycle.',
      goalLong: 'Accumulate practical experience to grow every day, aiming for the role of',
      goalLongRole: 'Solution Architect',
      now: 'Now:',
      short: 'Short-term:',
      long: 'Long-term:',
      bio: "I'm a 3rd-year student with a strong passion for backend development and AI/ML. Python is my main strength, and I constantly seek out new technologies. I've led teams to deliver real-world projects — from deep learning-based data analysis systems to AI-powered chess games. I enjoy exploring new GitHub repos and engaging with the developer community.",
    },
    skills: {
      title: 'Skills',
      frontend: 'Frontend / Web',
      backend: 'Backend / Core',
      ai: 'AI / Machine Learning',
      tools: 'Tools & Environment',
      frontendItems: ['HTML, CSS, JavaScript', 'React.js', 'Flask API', 'Winform (.NET)', 'Figma', 'Responsive UI'],
      backendItems: ['Python (Expert)', '.NET Framework', 'MongoDB, PostgreSQL, SQL', 'Express, Mongoose', 'RESTful API, JWT Auth'],
      aiItems: ['PyTorch, TorchVision', 'Deep Learning (CNN)', 'Machine Learning', 'NumPy, Pandas, Matplotlib', 'scikit-learn, Transformers'],
      toolItems: ['Git/GitHub, Docker', 'VMware, Nginx', 'VS/VSC, Cursor, PyCharm, IntelliJ', 'Windows, Linux (Ubuntu, Kali)', 'GPT Codex, Claude, Gemini, Grok'],
    },
    projects: {
      title: 'Featured Projects',
      leader: 'Team Leader',
      team: 'Team',
      github: 'View on GitHub',
      items: [
        {
          period: '12/2025 – 4/2026',
          name: 'Pill Classification with CNN (Deep Learning)',
          team: '1 DA, 1 FE, 1 BE, 1 Tester',
          desc: 'Big data processing and analysis system. Combines Python and Jupyter Notebook for data cleaning, analysis, and visualization. Results displayed online via web interface with automated reporting.',
          tags: ['Python', 'PyTorch', 'Jupyter', 'Flask', 'NumPy', 'Pandas'],
          color: 'emerald',
          link: 'https://github.com/Khoidep-zai/BigData_Vaipe',
        },
        {
          period: '12/2025 – 4/2026',
          name: 'Personal Task Management Web App',
          team: '1 FE, 1 BE, 1 Tester',
          desc: 'Fullstack task management web app for individuals and teams. Create, track, edit tasks with user-friendly interface. Features JWT authentication, MongoDB integration, and Docker deployment.',
          tags: ['React', 'Express', 'MongoDB', 'JWT', 'Docker', 'Nginx'],
          color: 'cyan',
          link: 'https://github.com/Khoidep-zai/Web_QuanlyCongviec',
        },
        {
          period: '6/2025 – 9/2025',
          name: 'Chess Game with AI (Machine Learning)',
          team: '2 FE, 2 BE, 1 Tester',
          desc: 'AI-powered chess game using Minimax and Alpha-Beta pruning algorithms. Features 3 difficulty levels (easy, medium, hard) to challenge players. Built with pygame and tkinter interfaces.',
          tags: ['Python', 'PyGame', 'Tkinter', 'PyTorch', 'Minimax'],
          color: 'purple',
          link: 'https://github.com/Khoidep-zai/Chess_AI',
        },
      ],
    },
    certificates: {
      title: 'Certificates',
      viewLink: 'View certificate on Coursera',
      items: [
        { title: 'Advanced Chatbots with Deep Learning and Python', year: '3-2025', url: 'https://www.coursera.org/account/accomplishments/verify/6M4POO3J60I3' },
        { title: 'AI Workflow: Machine Learning, Visual Recognition and NLP', year: '3-2025', url: 'https://www.coursera.org/account/accomplishments/verify/MNOCTRA21OXG' },
      ],
    },
    contact: {
      title: 'Contact',
      desc: "I'm always open to connecting and discussing internship opportunities, project collaborations, or just talking about tech!",
    },
    footer: {
      rights: 'All rights reserved.',
      tagline: '⚔️ Invincible — Undefeated against every line of code',
    },
  },
  vi: {
    nav: { about: 'Giới thiệu', skills: 'Kỹ năng', projects: 'Dự án', contact: 'Liên hệ' },
    hero: {
      badge: 'Kỹ Sư Phần Mềm · Đại học Văn Lang',
      subtitle: '"Bất bại trước mọi dòng code"',
      location: 'Quận Gò Vấp, TP. HCM',
      ctaContact: 'Liên hệ ngay',
      ctaProjects: 'Xem dự án',
      status: 'Sẵn sàng thực tập',
      focus: 'Tập trung Backend + AI',
    },
    about: {
      title: 'Giới thiệu',
      eduTitle: 'Học vấn',
      eduSchool: 'Đại học Văn Lang',
      eduMajor: 'Công Nghệ Phần mềm · 2023 – 2027',
      eduCertLabel: 'Chứng chỉ:',
      certs: [
        'Advanced Chatbots with Deep Learning and Python (2025)',
        'AI Workflow: Machine Learning, Visual Recognition and NLP (2025)',
      ],
      languageTitle: 'Ngôn ngữ',
      languageLevel: 'Tiếng Anh: B1',
      goalTitle: 'Mục tiêu nghề nghiệp',
      goalNow: 'Tìm kiếm vị trí thực tập / lập trình viên backend để áp dụng kiến thức vào dự án thực tế, rèn luyện kỹ năng và tích lũy kinh nghiệm cùng đội ngũ doanh nghiệp.',
      goalShort: 'Tham gia phát triển backend thực tế, làm việc nhóm để củng cố nền tảng và hiểu rõ quy trình phần mềm chuyên nghiệp.',
      goalLong: 'Tích lũy kinh nghiệm thực tiễn để phát triển từng ngày, hướng tới vị trí',
      goalLongRole: 'Solution Architect',
      now: 'Hiện tại:',
      short: 'Ngắn hạn:',
      long: 'Dài hạn:',
      bio: 'Tôi là sinh viên năm 3 với đam mê mạnh mẽ về lập trình backend và AI/ML. Thế mạnh Python và luôn chủ động học hỏi công nghệ mới. Từng dẫn dắt nhóm hoàn thành nhiều dự án thực tế từ hệ thống phân tích dữ liệu lớn đến game cờ vua với AI. Sở thích khám phá các repo GitHub mới lạ và trao đổi với cộng đồng lập trình viên.',
    },
    skills: {
      title: 'Kỹ năng',
      frontend: 'Frontend / Web',
      backend: 'Backend / Core',
      ai: 'AI / Machine Learning',
      tools: 'Công cụ & Môi trường',
      frontendItems: ['HTML, CSS, JavaScript', 'React.js', 'Flask API', 'Winform (.NET)', 'Figma', 'Responsive UI'],
      backendItems: ['Python (Chuyên sâu)', '.NET Framework', 'MongoDB, PostgreSQL, SQL', 'Express, Mongoose', 'RESTful API, JWT Auth'],
      aiItems: ['PyTorch, TorchVision', 'Deep Learning (CNN)', 'Machine Learning', 'NumPy, Pandas, Matplotlib', 'scikit-learn, Transformers'],
      toolItems: ['Git/GitHub, Docker', 'VMware, Nginx', 'VS/VSC, Cursor, PyCharm, IntelliJ', 'Windows, Linux (Ubuntu, Kali)', 'GPT Codex, Claude, Gemini, Grok'],
    },
    projects: {
      title: 'Dự án nổi bật',
      leader: 'Trưởng nhóm',
      team: 'Nhóm',
      github: 'Xem trên GitHub',
      items: [
        {
          period: '12/2025 – 4/2026',
          name: 'Phân loại viên thuốc bằng CNN (Deep Learning)',
          team: '1 DA, 1 FE, 1 BE, 1 Tester',
          desc: 'Hệ thống xử lý và phân tích dữ liệu lớn. Kết hợp Python và Jupyter Notebook để làm sạch, phân tích, trực quan hóa dữ liệu. Kết quả hiển thị trực tuyến qua giao diện web với báo cáo tự động.',
          tags: ['Python', 'PyTorch', 'Jupyter', 'Flask', 'NumPy', 'Pandas'],
          color: 'emerald',
          link: 'https://github.com/Khoidep-zai/BigData_Vaipe',
        },
        {
          period: '12/2025 – 4/2026',
          name: 'Web Quản lý Công việc Cá nhân',
          team: '1 FE, 1 BE, 1 Tester',
          desc: 'Ứng dụng web Fullstack quản lý công việc cá nhân/nhóm. Tạo, theo dõi, chỉnh sửa công việc với giao diện thân thiện. Tích hợp JWT authentication, MongoDB và triển khai Docker.',
          tags: ['React', 'Express', 'MongoDB', 'JWT', 'Docker', 'Nginx'],
          color: 'cyan',
          link: 'https://github.com/Khoidep-zai/Web_QuanlyCongviec',
        },
        {
          period: '6/2025 – 9/2025',
          name: 'Trò chơi Cờ vua với AI (Machine Learning)',
          team: '2 FE, 2 BE, 1 Tester',
          desc: 'Game cờ vua AI sử dụng thuật toán Minimax và Alpha-Beta pruning. Có 3 cấp độ khó (dễ, trung bình, khó) để thử thách người chơi. Xây dựng với giao diện pygame và tkinter.',
          tags: ['Python', 'PyGame', 'Tkinter', 'PyTorch', 'Minimax'],
          color: 'purple',
          link: 'https://github.com/Khoidep-zai/Chess_AI',
        },
      ],
    },
    certificates: {
      title: 'Chứng chỉ',
      viewLink: 'Xem chứng chỉ trên Coursera',
      items: [
        { title: 'Advanced Chatbots with Deep Learning and Python', year: '3-2025', url: 'https://www.coursera.org/account/accomplishments/verify/6M4POO3J60I3' },
        { title: 'AI Workflow: Machine Learning, Visual Recognition and NLP', year: '3-2025', url: 'https://www.coursera.org/account/accomplishments/verify/MNOCTRA21OXG' },
      ],
    },
    contact: {
      title: 'Liên hệ',
      desc: 'Tôi luôn sẵn sàng kết nối và trao đổi về cơ hội thực tập, hợp tác dự án, hoặc chỉ đơn giản là nói chuyện về công nghệ!',
    },
    footer: {
      rights: 'All rights reserved.',
      tagline: '⚔️ Invincible — Bất bại trước mọi dòng code',
    },
  },
};

// ─── Animation Variants ──────────────────────────────────────────────────────
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
};

// ─── Color map helpers ───────────────────────────────────────────────────────
const projectStyles: Record<string, { border: string; shadow: string; gradient: string; icon: string; badge: string; link: string }> = {
  emerald: {
    border: 'hover:border-emerald-500/60',
    shadow: 'hover:shadow-emerald-500/10',
    gradient: 'from-emerald-900 to-teal-900',
    icon: 'text-emerald-400',
    badge: 'text-emerald-400 bg-emerald-500/10',
    link: 'text-emerald-400 hover:text-emerald-300',
  },
  cyan: {
    border: 'hover:border-cyan-500/60',
    shadow: 'hover:shadow-cyan-500/10',
    gradient: 'from-cyan-900 to-blue-900',
    icon: 'text-cyan-400',
    badge: 'text-cyan-400 bg-cyan-500/10',
    link: 'text-cyan-400 hover:text-cyan-300',
  },
  purple: {
    border: 'hover:border-purple-500/60',
    shadow: 'hover:shadow-purple-500/10',
    gradient: 'from-purple-900 to-indigo-900',
    icon: 'text-purple-400',
    badge: 'text-purple-400 bg-purple-500/10',
    link: 'text-purple-400 hover:text-purple-300',
  },
};

const projectGlow: Record<string, string> = {
  emerald: '16, 185, 129',
  cyan: '6, 182, 212',
  purple: '139, 92, 246',
};

const projectIcons = [Cpu, Code, Terminal];

// ─── Animated Section Component ──────────────────────────────────────────────
function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useState<'en' | 'vi'>('en');
  const t = translations[lang];
  const heroRef = useRef<HTMLElement | null>(null);
  const projectsRef = useRef<HTMLDivElement | null>(null);
  const projectsInView = useInView(projectsRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  // Smooth scroll behavior
  useEffect(() => {
    const anchors = Array.from(document.querySelectorAll('a[href^="#"]'));
    const handleClick = (event: Event) => {
      event.preventDefault();
      const link = event.currentTarget as HTMLAnchorElement | null;
      const href = link?.getAttribute('href');
      if (!href) {
        return;
      }
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    anchors.forEach(anchor => anchor.addEventListener('click', handleClick));

    return () => {
      anchors.forEach(anchor => anchor.removeEventListener('click', handleClick));
    };
  }, []);

  useEffect(() => {
    const section = heroRef.current;
    if (!section) {
      return;
    }

    const updateSpotlight = (event: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      section.style.setProperty('--mx', `${x}px`);
      section.style.setProperty('--my', `${y}px`);
    };

    const resetSpotlight = () => {
      section.style.setProperty('--mx', '50%');
      section.style.setProperty('--my', '30%');
    };

    resetSpotlight();
    section.addEventListener('mousemove', updateSpotlight);
    section.addEventListener('mouseleave', resetSpotlight);

    return () => {
      section.removeEventListener('mousemove', updateSpotlight);
      section.removeEventListener('mouseleave', resetSpotlight);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">

      {/* ── Header ── */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="bg-gray-900/80 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50"
      >
        <nav className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-emerald-400 font-mono text-lg">&lt;</span>
              <span className="font-bold text-white">NBAK</span>
              <span className="text-emerald-400 font-mono text-lg">/&gt;</span>
            </motion.div>

            <div className="flex items-center gap-4 md:gap-6">
              {/* Nav links */}
              <div className="hidden md:flex gap-6">
                {(['about', 'skills', 'projects', 'contact'] as const).map((key, i) => (
                  <motion.a
                    key={key}
                    href={`#${key}`}
                    className="text-gray-400 hover:text-emerald-400 transition font-mono text-sm relative group"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    {t.nav[key]}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 transition-all group-hover:w-full"></span>
                  </motion.a>
                ))}
              </div>

              {/* Language switcher */}
              <div className="flex items-center gap-1 bg-gray-800 border border-gray-700 rounded-lg p-1">
                <Globe className="w-3.5 h-3.5 text-gray-400 ml-1 mr-0.5" />
                <motion.button
                  onClick={() => setLang('en')}
                  whileTap={{ scale: 0.95 }}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition ${
                    lang === 'en'
                      ? 'bg-emerald-500 text-gray-950'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  EN
                </motion.button>
                <motion.button
                  onClick={() => setLang('vi')}
                  whileTap={{ scale: 0.95 }}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition ${
                    lang === 'vi'
                      ? 'bg-emerald-500 text-gray-950'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  VI
                </motion.button>
              </div>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* ── Hero ── */}
      <motion.section
        ref={heroRef}
        className="relative overflow-hidden hero-spotlight hero-grid"
        style={{ opacity, scale }}
      >
        <div className="absolute inset-0 pointer-events-none z-0">
          <motion.div
            className="absolute top-20 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute bottom-10 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"
            animate={{
              x: [0, -50, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900/70 border border-emerald-500/30 text-emerald-200 text-xs font-semibold backdrop-blur-md shadow-lg absolute left-10 top-24 float-slow z-10 pointer-events-none"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
          {t.hero.status}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900/70 border border-cyan-500/30 text-cyan-100 text-xs font-semibold backdrop-blur-md shadow-lg absolute right-12 bottom-20 float-slower z-10 pointer-events-none"
        >
          <Cpu className="w-4 h-4 text-cyan-400" />
          {t.hero.focus}
        </motion.div>

        <div className="container mx-auto px-6 py-24 text-center relative z-10">
          <motion.div
            className="max-w-4xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div
              variants={scaleIn}
              className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-2 rounded-full text-sm mb-8"
            >
              <Star className="w-4 h-4" />
              <span>{t.hero.badge}</span>
            </motion.div>

            <motion.div
              variants={scaleIn}
              whileHover={{ scale: 1.05 }}
              className="w-32 h-32 rounded-full mx-auto mb-6 overflow-hidden ring-4 ring-emerald-500/30 avatar-glow"
            >
              <img src={avatarImg} alt="Nguyễn Bá Anh Khôi" className="w-full h-full object-cover object-top" />
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              className="text-5xl md:text-6xl font-bold text-white mb-3"
            >
              Nguyễn Bá Anh Khôi
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-2xl md:text-3xl font-bold mb-4"
            >
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent text-shimmer">
                ⚔️ INVINCIBLE
              </span>
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-gray-400 italic mb-8"
            >
              {t.hero.subtitle}
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap justify-center gap-3 mb-10 text-sm"
            >
              <span className="flex items-center gap-1 text-gray-400 bg-gray-800 px-3 py-1.5 rounded-full">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" /> {t.hero.location}
              </span>
              <span className="flex items-center gap-1 text-gray-400 bg-gray-800 px-3 py-1.5 rounded-full">
                <Phone className="w-3.5 h-3.5 text-emerald-400" /> +84 902 094 421
              </span>
              <span className="flex items-center gap-1 text-gray-400 bg-gray-800 px-3 py-1.5 rounded-full">
                <Mail className="w-3.5 h-3.5 text-emerald-400" /> khoibadk2005@gmail.com
              </span>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex gap-4 justify-center flex-wrap"
            >
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(16, 185, 129, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-emerald-500 text-gray-950 px-8 py-3 rounded-lg hover:bg-emerald-400 transition font-semibold btn-shine"
              >
                {t.hero.ctaContact}
              </motion.a>
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-emerald-500/50 text-emerald-400 px-8 py-3 rounded-lg hover:bg-emerald-500/10 transition font-semibold btn-shine"
              >
                {t.hero.ctaProjects}
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* ── About ── */}
      <section id="about" className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <SectionTitle>{t.about.title}</SectionTitle>
            </AnimatedSection>

            <motion.div
              className="grid md:grid-cols-2 gap-6 mb-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.div
                variants={fadeInUp}
                whileHover={{ y: -5, borderColor: "rgba(16, 185, 129, 0.5)" }}
                className="bg-gray-800 border border-gray-700 p-6 rounded-xl transition-all"
              >
                <Book className="w-10 h-10 text-emerald-400 mb-4" />
                <h4 className="text-xl font-bold text-white mb-2">{t.about.eduTitle}</h4>
                <p className="text-emerald-400 font-semibold">{t.about.eduSchool}</p>
                <p className="text-gray-400 text-sm mb-2">{t.about.eduMajor}</p>
                <div className="mt-3 pt-3 border-t border-gray-700">
                  <p className="text-gray-400 text-sm font-medium mb-1">{t.about.eduCertLabel}</p>
                  <ul className="text-gray-400 text-sm space-y-1">
                    {t.about.certs.map(c => (
                      <li key={c} className="flex items-start gap-1">
                        <ChevronRight className="w-3.5 h-3.5 mt-0.5 text-emerald-400 shrink-0" />{c}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-700">
                  <p className="text-gray-400 text-sm font-medium mb-1">{t.about.languageTitle}</p>
                  <p className="flex items-center gap-2 text-gray-400 text-sm">
                    <Languages className="w-4 h-4 text-emerald-400" />{t.about.languageLevel}
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                whileHover={{ y: -5, borderColor: "rgba(16, 185, 129, 0.5)" }}
                className="bg-gray-800 border border-gray-700 p-6 rounded-xl transition-all"
              >
                <Briefcase className="w-10 h-10 text-emerald-400 mb-4" />
                <h4 className="text-xl font-bold text-white mb-3">{t.about.goalTitle}</h4>
                <div className="space-y-3 text-sm text-gray-400">
                  <div><span className="text-emerald-400 font-semibold">{t.about.now} </span>{t.about.goalNow}</div>
                  <div><span className="text-cyan-400 font-semibold">{t.about.short} </span>{t.about.goalShort}</div>
                  <div>
                    <span className="text-purple-400 font-semibold">{t.about.long} </span>
                    {t.about.goalLong} <span className="text-white font-semibold">{t.about.goalLongRole}</span>.
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <AnimatedSection>
              <p className="text-gray-400 text-center bg-gray-800/50 border border-gray-700 p-6 rounded-xl">{t.about.bio}</p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Skills ── */}
      <section id="skills" className="py-20 bg-gray-950">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <AnimatedSection>
              <SectionTitle>{t.skills.title}</SectionTitle>
            </AnimatedSection>
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <SkillCard icon={<Code className="w-9 h-9 text-emerald-400 mb-4" />} title={t.skills.frontend} items={t.skills.frontendItems} dot="bg-emerald-400" border="hover:border-emerald-500/50" glow="16, 185, 129" />
              <SkillCard icon={<Terminal className="w-9 h-9 text-cyan-400 mb-4" />} title={t.skills.backend} items={t.skills.backendItems} dot="bg-cyan-400" border="hover:border-cyan-500/50" glow="6, 182, 212" />
              <SkillCard icon={<Cpu className="w-9 h-9 text-purple-400 mb-4" />} title={t.skills.ai} items={t.skills.aiItems} dot="bg-purple-400" border="hover:border-purple-500/50" glow="139, 92, 246" />
              <SkillCard icon={<Wrench className="w-9 h-9 text-orange-400 mb-4" />} title={t.skills.tools} items={t.skills.toolItems} dot="bg-orange-400" border="hover:border-orange-500/50" glow="249, 115, 22" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Projects ── */}
      <section id="projects" className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <AnimatedSection>
              <SectionTitle>{t.projects.title}</SectionTitle>
            </AnimatedSection>
            <motion.div
              ref={projectsRef}
              className="grid md:grid-cols-3 gap-7"
              initial="hidden"
              animate={projectsInView ? "visible" : "hidden"}
              variants={staggerContainer}
            >
              {t.projects.items.map((proj, i) => {
                const s = projectStyles[proj.color];
                const Icon = projectIcons[i];
                const glow = projectGlow[proj.color] ?? '16, 185, 129';
                return (
                  <motion.div
                    key={proj.name}
                    variants={fadeInUp}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className={`bg-gray-800 border border-gray-700 rounded-xl overflow-hidden glow-card ${s.border} hover:shadow-lg ${s.shadow} transition-all`}
                    style={{ '--glow': glow } as React.CSSProperties}
                  >
                    <div className={`h-44 bg-gradient-to-br ${s.gradient} flex items-center justify-center relative overflow-hidden`}>
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Icon className={`w-20 h-20 ${s.icon} opacity-80`} />
                      </motion.div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-xs font-mono px-2 py-0.5 rounded ${s.badge}`}>{proj.period}</span>
                        <span className="text-xs text-gray-500 bg-gray-700 px-2 py-0.5 rounded">{t.projects.leader}</span>
                      </div>
                      <h4 className="text-lg font-bold text-white mb-2 leading-snug">{proj.name}</h4>
                      <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                        <User className="w-3 h-3" /> {t.projects.team}: {proj.team}
                      </p>
                      <p className="text-gray-400 text-sm mb-4">{proj.desc}</p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {proj.tags.map(tag => (
                          <span key={tag} className="bg-gray-700 text-gray-300 px-2 py-0.5 rounded text-xs">{tag}</span>
                        ))}
                      </div>
                      <motion.a
                        href={proj.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ x: 5 }}
                        className={`${s.link} text-sm font-medium flex items-center gap-1`}
                      >
                        {t.projects.github} <ChevronRight className="w-4 h-4" />
                      </motion.a>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Certificates ── */}
      <section className="py-16 bg-gray-950">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <AnimatedSection>
              <SectionTitle>{t.certificates.title}</SectionTitle>
            </AnimatedSection>
            <motion.div
              className="grid sm:grid-cols-2 gap-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              {t.certificates.items.map(cert => (
                <motion.a
                  key={cert.title}
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={fadeInUp}
                  whileHover={{ y: -5, borderColor: "rgba(16, 185, 129, 0.5)" }}
                  className="bg-gray-900 border border-gray-700 p-5 rounded-xl flex gap-4 items-start transition-all group"
                >
                  <Award className="w-8 h-8 text-emerald-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <div className="flex-1">
                    <p className="text-white font-semibold text-sm leading-snug">{cert.title}</p>
                    <p className="text-emerald-400 text-xs mt-1 font-mono">{cert.year}</p>
                    <p className="text-gray-500 text-xs mt-1 flex items-center gap-1 group-hover:text-emerald-400 transition">
                      <ExternalLink className="w-3 h-3" /> {t.certificates.viewLink}
                    </p>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <AnimatedSection>
              <SectionTitle>{t.contact.title}</SectionTitle>
              <p className="text-gray-400 mb-10">{t.contact.desc}</p>
            </AnimatedSection>
            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.a
                href="mailto:khoibadk2005@gmail.com"
                variants={fadeInUp}
                whileHover={{ scale: 1.05, borderColor: "rgba(16, 185, 129, 0.6)" }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-gray-800 border border-gray-700 px-6 py-3 rounded-xl transition-all group"
              >
                <Mail className="w-5 h-5 text-emerald-400" />
                <span className="text-gray-300 group-hover:text-white transition">khoibadk2005@gmail.com</span>
              </motion.a>
              <motion.a
                href="https://github.com/Khoidep-zai"
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeInUp}
                whileHover={{ scale: 1.05, borderColor: "rgba(16, 185, 129, 0.6)" }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-gray-800 border border-gray-700 px-6 py-3 rounded-xl transition-all group"
              >
                <Github className="w-5 h-5 text-gray-300" />
                <span className="text-gray-300 group-hover:text-white transition">Khoidep-zai</span>
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/nguyễn-bá-anh-khôi-896574356"
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeInUp}
                whileHover={{ scale: 1.05, borderColor: "rgba(6, 182, 212, 0.6)" }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-gray-800 border border-gray-700 px-6 py-3 rounded-xl transition-all group"
              >
                <Linkedin className="w-5 h-5 text-cyan-400" />
                <span className="text-gray-300 group-hover:text-white transition">linkedin.com/in/NBAK</span>
              </motion.a>
              <motion.a
                href="tel:+84902094421"
                variants={fadeInUp}
                whileHover={{ scale: 1.05, borderColor: "rgba(16, 185, 129, 0.6)" }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-gray-800 border border-gray-700 px-6 py-3 rounded-xl transition-all group"
              >
                <Phone className="w-5 h-5 text-emerald-400" />
                <span className="text-gray-300 group-hover:text-white transition">+84 902 094 421</span>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-gray-950 border-t border-gray-800 py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-500 text-sm">
            © 2026 <span className="text-emerald-400 font-semibold">Nguyễn Bá Anh Khôi</span>. {t.footer.rights}
          </p>
          <p className="text-gray-600 text-sm mt-1">{t.footer.tagline}</p>
        </div>
      </footer>

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-purple-500 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />
    </div>
  );
}

// ─── Small reusable components ───────────────────────────────────────────────
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-10 justify-center">
      <div className="h-px w-12 bg-emerald-500"></div>
      <h3 className="text-3xl font-bold text-white">{children}</h3>
      <div className="h-px w-12 bg-emerald-500"></div>
    </div>
  );
}

function SkillCard({ icon, title, items, dot, border, glow }: { icon: React.ReactNode; title: string; items: string[]; dot: string; border: string; glow: string }) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -5, scale: 1.02 }}
      className={`bg-gray-900 border border-gray-700 p-6 rounded-xl glow-card ${border} transition-all group`}
      style={{ '--glow': glow } as React.CSSProperties}
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {icon}
      </motion.div>
      <h4 className="text-lg font-bold text-white mb-3">{title}</h4>
      <ul className="space-y-1.5 text-sm text-gray-400">
        {items.map(s => (
          <li key={s} className="flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 ${dot} rounded-full shrink-0`}></span>{s}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
