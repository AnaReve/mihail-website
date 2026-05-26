import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { Menu, X, ArrowRight, ArrowUpRight, Calendar, Mail, Linkedin, MapPin, Globe, Award, Users, Target, Zap, BookOpen, Briefcase, GraduationCap, Heart, Sparkles, CheckCircle2, Building2, Rocket, Brain, Compass, Mountain, Mic2, ChevronRight, Star, TrendingUp, Layers, Plus, Minus, Quote, Send, ChevronUp } from 'lucide-react';
import translations, { type Lang } from '../../i18n';

// ─── Types ────────────────────────────────────────────────────────────────────
type NavItem = {
  label: string;
  href: string;
};
type ServiceCategory = {
  icon: React.ElementType;
  title: string;
  tagline: string;
  items: string[];
};
type SafeAccordionItem = {
  id: string;
  title: string;
  level: string;
  description: string;
};
type CustomTraining = {
  name: string;
  icon: React.ElementType;
};
type CaseStudy = {
  sector: string;
  challenge: string;
  outcome: string;
  metric: string;
  label: string;
};
type Insight = {
  category: string;
  title: string;
  excerpt: string;
  read: string;
};
type TimelineItem = {
  year: string;
  label: string;
};
type Faq = {
  q: string;
  a: string;
};
type Testimonial = {
  quote: string;
  name: string;
  role: string;
  photo: string;
};
type AnaReve = {
  k: string;
  title: string;
  body: string;
};
type ContactInfo = {
  icon: React.ElementType;
  label: string;
  value: string;
  href: string;
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const navItems: NavItem[] = [{
  label: 'About',
  href: '#about'
}, {
  label: 'Services',
  href: '#services'
}, {
  label: 'Trainings',
  href: '#trainings'
}, {
  label: 'Offsites',
  href: '#offsites'
}, {
  label: 'Testimonials',
  href: '#testimonials'
}, {
  label: 'Insights',
  href: '#insights'
}, {
  label: 'Contact',
  href: '#contact'
}];
const enterpriseLogos: string[] = ['AXA', 'STELLANTIS', 'DEUTSCHE BANK', 'DEVOTEAM', 'PARADOX CAT', 'ANA RÊVE'];
const serviceCategories: ServiceCategory[] = [{
  icon: Compass,
  title: 'Executive Advisory',
  tagline: 'Transformation strategy & leadership alignment',
  items: ['Transformation strategy', 'Leadership alignment', 'Operating model redesign', 'Executive coaching', 'Change acceleration']
}, {
  icon: Layers,
  title: 'Agile at Scale / SAFe',
  tagline: 'Scaling delivery without losing direction',
  items: ['Leading SAFe', 'PI Planning facilitation', 'ART launch', 'Lean Portfolio Management', 'Agile PMO evolution']
}, {
  icon: Users,
  title: 'Team Performance',
  tagline: 'High-performing teams, built fast',
  items: ['Build new teams rapidly', 'Recover struggling teams', 'Product/IT collaboration', 'Delivery acceleration', 'Culture of ownership']
}, {
  icon: Target,
  title: 'Strategic Workshops',
  tagline: 'Decisions that move organizations',
  items: ['Value Stream Identification', 'Product Vision workshops', 'Strategy execution', 'Leadership offsites', 'Prioritization sessions']
}, {
  icon: Brain,
  title: 'AI Transformation',
  tagline: 'From ambition to real AI adoption',
  items: ['AI adoption for leaders', 'AI operating model', 'AI + Agile integration', 'Upskilling teams for the AI era', 'Responsible AI governance']
}, {
  icon: Rocket,
  title: 'Product Leadership',
  tagline: 'Building product-led organizations',
  items: ['Product operating model', 'Product vision & strategy', 'Discovery practices', 'Outcome-based roadmaps', 'Product leadership coaching']
}];
const safeAccordionItems: SafeAccordionItem[] = [{
  id: 'leading-safe',
  title: 'AI-Empowered Leading SAFe',
  level: 'Executive',
  description: 'The definitive program for executives and senior leaders navigating enterprise agility at scale. Blending AI fluency with SAFe® principles, this training equips leaders to drive meaningful transformation from the top — with clarity, speed and confidence.'
}, {
  id: 'scrum-master',
  title: 'AI-Empowered SAFe Scrum Master',
  level: 'Leadership',
  description: 'Elevate servant leadership in an AI-augmented environment. Equip Scrum Masters with the coaching skills and AI-enhanced practices to unblock teams, sustain flow and become the engine of continuous improvement across Agile Release Trains.'
}, {
  id: 'advanced-sm',
  title: 'Advanced SAFe Scrum Master',
  level: 'Advanced',
  description: 'For experienced Scrum Masters ready to operate at the next level. Build mastery in PI execution, ART event facilitation and complex team dynamics — the skills that distinguish exceptional coaches from competent ones.'
}, {
  id: 'popm',
  title: 'AI-Empowered SAFe Product Owner / Product Manager',
  level: 'Product',
  description: 'Transform how your product teams discover, prioritize and deliver value. This AI-powered program sharpens the skills of Product Owners and Product Managers to build compelling backlogs, connect features to strategic outcomes, and lead product discovery in the age of AI.'
}, {
  id: 'teams',
  title: 'AI-Empowered SAFe for Teams',
  level: 'Team',
  description: 'The essential onboarding for Agile team members joining or forming within a SAFe® environment. Integrating AI-enabled practices from day one, teams gain the shared language and execution habits to deliver high-quality increments — sprint after sprint.'
}, {
  id: 'hardware',
  title: 'SAFe for Hardware',
  level: 'Engineering',
  description: 'A specialized program for hardware and systems engineering teams operating in complex product environments. Apply Lean-Agile principles to physical product development — shortening feedback loops, managing dependencies and aligning hardware with software delivery rhythms.'
}, {
  id: 'lpm',
  title: 'Lean Portfolio Management',
  level: 'Executive',
  description: 'Align strategy with execution at the portfolio level. This program equips portfolio leaders to govern investment decisions with agility, connect business outcomes to value streams, and replace waterfall governance with a dynamic, hypothesis-driven planning model.'
}, {
  id: 'rte',
  title: 'SAFe Release Train Engineer',
  level: 'Leadership',
  description: 'The RTE is the most critical role in a SAFe® enterprise. This intensive program prepares candidates to lead Agile Release Trains — orchestrating PI Planning, coaching across teams, and acting as the chief servant-leader of the entire train.'
}, {
  id: 'others',
  title: 'Additional SAFe® Courses',
  level: 'Various',
  description: 'A curated set of specialist programs for architects, DevOps engineers, government leaders and contracting specialists. Each brings SAFe® rigour to a specific professional context — expanding enterprise agility across every dimension of your organization.'
}];
const customTrainings: CustomTraining[] = [{
  name: 'Executive Agile',
  icon: Briefcase
}, {
  name: 'Product Leadership',
  icon: Rocket
}, {
  name: 'AI for Managers',
  icon: Brain
}, {
  name: 'High Performance Teams',
  icon: Users
}, {
  name: 'Change Leadership',
  icon: Zap
}];
const caseStudies: CaseStudy[] = [{
  sector: 'Global Insurance Group',
  challenge: 'Complex multi-stream delivery model slowing execution across 12 product areas.',
  outcome: 'Re-established planning cadence and enterprise alignment within 30 days.',
  metric: '12',
  label: 'Streams Realigned'
}, {
  sector: 'Financial Services Leader',
  challenge: 'Leadership lacked shared clarity on future operating model and governance evolution.',
  outcome: 'Designed target model endorsed by executive leadership within one quarter.',
  metric: '90',
  label: 'Days to Board Endorsement'
}, {
  sector: 'Industrial Manufacturer',
  challenge: 'Fragmented roadmaps and competing priorities across a large delivery ecosystem.',
  outcome: 'Facilitated enterprise PI Planning, aligning 150 stakeholders behind one execution plan.',
  metric: '150',
  label: 'Leaders Aligned'
}, {
  sector: 'Product Organisations & Business Schools',
  challenge: 'Product leaders required stronger capabilities in scaled product management and value delivery.',
  outcome: 'Trained more than 100 Product Managers, Product Owners and executives in scaled agile practices.',
  metric: '100+',
  label: 'Product Leaders Enabled'
}];
const insights: Insight[] = [{
  category: 'Transformation',
  title: 'Why Most Enterprise Transformations Quietly Fail',
  excerpt: 'It is rarely the framework. It is the way leaders hold the space between ambition and reality.',
  read: '6 min read'
}, {
  category: 'AI & Leadership',
  title: 'The Executive Playbook for AI Adoption',
  excerpt: 'A pragmatic operating model that turns AI curiosity into measurable enterprise outcomes.',
  read: '8 min read'
}, {
  category: 'Teams',
  title: 'Building Elite Teams in 90 Days',
  excerpt: 'The four levers that separate fast-forming teams from endlessly storming ones.',
  read: '5 min read'
}];
const timeline: TimelineItem[] = [{
  year: '2007',
  label: 'Engineering, delivery & project leadership roles in European technology environments'
}, {
  year: '2014',
  label: 'Transition into Agile coaching and enterprise transformation missions'
}, {
  year: '2020',
  label: 'Major transformation engagements with leaders such as AXA and Stellantis'
}, {
  year: '2022',
  label: 'Advanced Scaled Agile certifications & training delivery across international audiences'
}, {
  year: '2024',
  label: 'Professor in Digital Transformation, Leadership & Business Agility'
}, {
  year: 'Today',
  label: 'Founder · Executive Consultant · Trainer supporting organizations across Europe'
}];
const faqs: Faq[] = [{
  q: 'Who do you typically work with?',
  a: 'Executives and senior leaders in complex European enterprises — insurance, industrial, financial services, technology — navigating scale, product transformation, or AI adoption.'
}, {
  q: 'Do you deliver in English and French?',
  a: 'Yes. All consulting, coaching and training is delivered fluently in English and French.'
}, {
  q: 'How are engagements structured?',
  a: 'Most engagements begin with a strategic diagnostic, followed by a tailored program: advisory, training cohorts, executive coaching, or blended offsite experiences.'
}, {
  q: 'Do you travel across Europe?',
  a: 'Based in Paris, I work on-site across Europe and remotely worldwide. Premium offsites are held in curated European locations.'
}];
const testimonials: Testimonial[] = [{
  quote: 'I had the privilege of having Mihail as both my Agile coach and SAFe trainer. At first, I struggled with Agile, but Mihail\'s professionalism and effective teaching completely transformed my mindset. Together, we successfully implemented Agile in a highly challenging team. Mihail has a unique ability to engage with his audience and possesses a deep knowledge that keeps them captivated. I look forward to the opportunity of working with Mihail again in the near future.',
  name: 'Fabrice Astier',
  role: 'Storage Global Product Manager · AXA Group Operations',
  photo: '/Fabrice_Astier.jpg'
}, {
  quote: 'I\'ve worked for many years with Mihail in his different roles. He managed in just 4 months to establish a fully functional SAFe environment involving over 30 people. Mihail is tremendously resourceful and skilled in helping teams and individuals adopt and apply SAFe principles. His ability to align strategic goals with team execution is unmatched. Any team fortunate enough to have Mihail on board will benefit greatly, not just in efficiency, but also in team dynamics and growth.',
  name: 'Fernando J. Lardo',
  role: 'Certified Cloud Engineer · Technical Product Management',
  photo: '/Fernando_J_Lardo.jpeg'
}, {
  quote: 'I am pleased to recommend Mihail as an Agile Transformation Coach. Mihail\'s expertise in SAFe methodologies and dedication to improvement enabled our successful transition to SAFe Agile. He modelled servant leadership, empowered teams to own their processes, and fostered psychological safety. Under his guidance, we achieved faster production, higher quality, and greater employee engagement.',
  name: 'Amine Hafid',
  role: 'EMEA Global Engagement Manager for GFS · Amazon Web Services',
  photo: '/Amine_Hafid.jpeg'
}, {
  quote: 'I worked with Mihail for a year. His deep knowledge of Agile Frameworks and practices helped our client moved forward on many topics. Thanks to his expertise, patience and kindness, he made all of us grow and gain agile maturity. He was the main driver of the change and trained all of us on SAFe framework. Thanks Mihail for the huge help, it was an honour working with you.',
  name: 'Hélène André',
  role: 'Agile Coach',
  photo: '/Helene_Andre.jpeg'
}, {
  quote: 'Mihail is an exceptional Agile coach who played a pivotal role in AXA\'s transformation journey towards an Agile mindset. His brilliant training on the Scaled Agile Framework (SAFe) equipped the team with necessary skills. Mihail fostered trust and effective collaboration, generously shared knowledge, and paved the way for new cloud products, making him an invaluable asset to any enterprise organization.',
  name: 'Charles Teboul',
  role: 'Senior Global Engagement Manager & Sustainability Expert',
  photo: '/Charles_Teboul.jpeg'
}, {
  quote: 'I had the good fortune to meet and work with Mihail at a mutual customer. His efforts accelerated my adoption of SAFe and provided a powerful tailwind to propel my project forward. Mihail demonstrated that he is knowledgeable, pragmatic, collaborative, and approachable. I can recommend him very highly and hope to work with him again.',
  name: 'David Knight',
  role: 'Product Owner · AWS Migration Specialist',
  photo: '/David_Knight.jpeg'
}];
const anaReveItems: AnaReve[] = [{
  k: 'Mission',
  title: 'Families at the center',
  body: 'Built around the belief that no family should face serious challenges without meaningful support — digital, human, and practical.'
}, {
  k: 'Platform',
  title: 'Innovation for impact',
  body: 'A purpose-built platform where innovation is designed to serve people, connecting families, resources and support pathways for those facing serious challenges.'
}, {
  k: 'Purpose',
  title: 'Humanity first',
  body: 'Every framework, tool and methodology Mihail brings to enterprise clients is tested against a deeper question: does it actually help people?'
}];
const contactInfoItems: ContactInfo[] = [{
  icon: Mail,
  label: 'Email',
  value: 'contact@mochiviva.com',
  href: 'mailto:contact@mochiviva.com'
}, {
  icon: Linkedin,
  label: 'LinkedIn',
  value: '/in/mihailolteanu',
  href: 'https://linkedin.com/in/mihailolteanu'
}, {
  icon: MapPin,
  label: 'Based',
  value: 'Paris · Europe',
  href: '#'
}];

// ─── Component ────────────────────────────────────────────────────────────────
export const MihailOlteanuWebsite = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState<Lang>('en');
  const i = translations[lang];
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [openSafeItem, setOpenSafeItem] = useState<string | null>('leading-safe');
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [husserenImageIndex, setHusserenImageIndex] = useState(0);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showLegal, setShowLegal] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    company: '',
    message: '',
    submitted: false
  });
  const testimonialRef = useRef<HTMLDivElement>(null);
  const {
    scrollYProgress
  } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -60]);
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      setShowBackToTop(window.scrollY > 600);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setHusserenImageIndex(prev => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState(prev => ({
      ...prev,
      submitted: true
    }));
  };
  const nextTestimonial = () => setActiveTestimonial(p => (p + 1) % i.data.testimonials.length);
  const prevTestimonial = () => setActiveTestimonial(p => (p - 1 + i.data.testimonials.length) % i.data.testimonials.length);
  return <div className="min-h-screen w-full bg-[#0B1628] text-white font-sans antialiased overflow-x-hidden">

    {/* SCROLL PROGRESS BAR */}
    <motion.div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-[#D4A84B] origin-left" style={{
      scaleX
    }} />

    {/* NAV */}
    <motion.header initial={{
      y: -40,
      opacity: 0
    }} animate={{
      y: 0,
      opacity: 1
    }} transition={{
      duration: 0.6
    }} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#0B1628]/95 backdrop-blur-md border-b border-white/5' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-5 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-sm bg-gradient-to-br from-[#D4A84B] to-[#B8852A] flex items-center justify-center text-[#0B1628] font-bold text-sm tracking-tight">
            MO
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-semibold tracking-wide">Mihail Olteanu</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-white/50">Transformation · Leadership · AI</div>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {[
            { label: i.nav.about, href: '#about' },
            { label: i.nav.services, href: '#services' },
            { label: i.nav.trainings, href: '#trainings' },
            { label: i.nav.offsites, href: '#offsites' },
            { label: i.nav.testimonials, href: '#testimonials' },
            { label: i.nav.contact, href: '#contact' },
          ].map(item => <a key={item.href} href={item.href} className="text-sm text-white/60 hover:text-white transition-colors relative group">
            {item.label}
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#D4A84B] group-hover:w-full transition-all duration-300" />
          </a>)}
        </nav>

        <div className="flex items-center gap-3">
          {/* Language toggle */}
          <div className="flex items-center border border-white/15 rounded-sm overflow-hidden">
            {(['en', 'fr'] as Lang[]).map(l => (
              <button key={l} onClick={() => setLang(l)}
                className={`px-3 py-1.5 text-xs font-medium tracking-widest uppercase transition-all ${
                  lang === l ? 'bg-[#D4A84B] text-[#0B1628]' : 'text-white/50 hover:text-white'
                }`}>{l.toUpperCase()}</button>
            ))}
          </div>
          <a href="#contact" className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-[#D4A84B] text-[#0B1628] rounded-sm hover:bg-[#E6BC5E] transition-colors">
            <span>{i.nav.contact}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden w-10 h-10 flex items-center justify-center rounded-sm border border-white/10" aria-label="Toggle menu">
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && <motion.div initial={{
          height: 0,
          opacity: 0
        }} animate={{
          height: 'auto',
          opacity: 1
        }} exit={{
          height: 0,
          opacity: 0
        }} className="lg:hidden overflow-hidden bg-[#0B1628] border-t border-white/5">
          <div className="px-6 py-6 flex flex-col gap-3">
            {i.data.navMobileItems.map(item => <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="text-white/80 text-base py-2.5 border-b border-white/5">
              {item.label}
            </a>)}
            <a href="#contact" onClick={() => setMenuOpen(false)} className="mt-2 inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium bg-[#D4A84B] text-[#0B1628] rounded-sm">
              <span>{i.mobile.bookCall}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#contact" onClick={() => setMenuOpen(false)} className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium border border-white/20 text-white rounded-sm">
              <span>{i.mobile.partnerWithMe}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>}
      </AnimatePresence>
    </motion.header>

    {/* HERO */}
    <section id="top" className="relative pt-36 md:pt-44 pb-24 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle at 20% 20%, #D4A84B 0%, transparent 40%), radial-gradient(circle at 80% 60%, #4A90E2 0%, transparent 50%)'
      }} />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }} />
      </div>

      <motion.div style={{
        y: heroY
      }} className="relative max-w-7xl mx-auto px-6 md:px-10 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#D4A84B]/30 bg-[#D4A84B]/5 text-[#D4A84B] text-xs tracking-[0.18em] uppercase mb-8">
            <Sparkles className="w-3 h-3" />
            <span>{i.header.tagline}</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
            {i.hero.h1a}{' '}
            <span className="italic text-[#D4A84B]">{i.hero.h1b}</span>{' '}
            {i.hero.h1c}
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25 }} className="mt-8 text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed">
            {i.hero.body}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="mt-10 flex flex-wrap gap-4">
            <a href="#contact" className="group inline-flex items-center gap-3 px-7 py-4 bg-[#D4A84B] text-[#0B1628] font-medium rounded-sm hover:bg-[#E6BC5E] transition-all">
              <span>{i.hero.ctaPrimary}</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <a href="#services" className="inline-flex items-center gap-3 px-7 py-4 border border-white/20 text-white font-medium rounded-sm hover:bg-white/5 transition-all">
              <span>{i.hero.ctaSecondary}</span>
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.6 }} className="mt-14 grid grid-cols-3 gap-6 max-w-xl">
            {i.hero.stats.map(s => <div key={s.v} className="border-l border-[#D4A84B]/40 pl-4">
              <div className="text-2xl md:text-3xl font-serif text-white" style={{ fontFamily: 'Georgia, serif' }}>{s.k}</div>
              <div className="text-xs text-white/50 mt-1 leading-snug">{s.v}</div>
            </div>)}
          </motion.div>
        </div>

        {/* HERO PHOTO — real image from mihailolteanu.com */}
        <motion.div initial={{
          opacity: 0,
          scale: 0.95
        }} animate={{
          opacity: 1,
          scale: 1
        }} transition={{
          duration: 0.9,
          delay: 0.2
        }} className="lg:col-span-5 relative">
          <div className="relative aspect-[4/5] rounded-sm overflow-hidden">
            <div className="absolute -inset-4 border border-[#D4A84B]/20 rounded-sm pointer-events-none" />
            <div className="absolute -inset-4 border border-[#D4A84B]/10 rounded-sm translate-x-4 translate-y-4 pointer-events-none" />
            <img src="/Mihail_Olteanu_1.jpg" alt="Mihail Olteanu — Enterprise Transformation Partner, Paris" className="w-full h-full object-cover object-center" />
            <div className="absolute inset-0 pointer-events-none" style={{
              background: 'linear-gradient(to top, rgba(11,22,40,0.7) 0%, rgba(11,22,40,0.1) 50%, transparent 100%)'
            }} />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center gap-2 text-xs text-white/80">
                <MapPin className="w-3 h-3 text-[#D4A84B]" />
                <span>Paris · Operating across Europe</span>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-6 -left-6 bg-[#0B1628] border border-white/10 rounded-sm p-4 shadow-2xl hidden md:block">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#D4A84B]/10 flex items-center justify-center">
                <Award className="w-5 h-5 text-[#D4A84B]" />
              </div>
              <div>
                <div className="text-xs text-white/50">{i.hero.certified}</div>
                <div className="text-sm font-medium">SAFe® Advanced SPC</div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>

    {/* LOGOS */}
    <section className="relative py-12 border-y border-white/5 bg-[#0A1424]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 text-center mb-7">
          Trusted through missions with European enterprises
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-5">
          {enterpriseLogos.map(logo => <div key={logo} className="text-white/35 hover:text-white/70 transition-colors text-sm md:text-base font-serif tracking-[0.25em]" style={{
            fontFamily: 'Georgia, serif'
          }}>
            {logo}
          </div>)}
        </div>
        <div className="mt-8 text-center text-3xl font-serif text-[#D4A84B]" style={{ fontFamily: 'Georgia, serif' }}>
          {i.logos.claim}
        </div>
      </div>
    </section>

    {/* ABOUT */}
    <section id="about" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid lg:grid-cols-12 gap-14">
        <div className="lg:col-span-5">
          <div className="sticky top-32">
            <div className="text-[11px] uppercase tracking-[0.3em] text-[#D4A84B] mb-4">{i.about.label}</div>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
              {i.about.heading}
            </h2>
            <p className="mt-6 text-white/60 leading-relaxed">{i.about.body}</p>
            <div className="mt-10 flex flex-wrap gap-2">
              {i.about.langs.map(l => <span key={l} className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-white/10 rounded-full text-xs text-white/70">
                <Globe className="w-3 h-3 text-[#D4A84B]" />
                <span>{l}</span>
              </span>)}
            </div>

            {/* Secondary photo in about */}
            <div className="mt-10 rounded-sm overflow-hidden border border-white/10">
              <img src="/Mihail_Olteanu_2.jpg" alt="Mihail Olteanu at La Défense, Paris after guiding Stellantis Big Data & AI PI Planning" className="w-full aspect-[4/5] object-cover object-center" />
              <div className="p-4 bg-[#0A1424]">
              <p className="text-xs text-white/50 leading-relaxed italic">{i.about.photoCaption}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-10">
          <div className="max-w-none">
            <p className="text-lg text-white/80 leading-relaxed">{i.about.rightBody1}</p>
            <p className="text-white/60 leading-relaxed mt-5">{i.about.rightBody2}</p>
            <p className="text-white/60 leading-relaxed mt-5">{i.about.rightBody3}</p>
          </div>

          <div className="border-t border-white/10 pt-10">
            <div className="text-xs uppercase tracking-[0.25em] text-white/40 mb-6">{i.about.careerLabel}</div>
            <div className="space-y-0">
              {i.data.timeline.map((t, idx) => <motion.div key={t.year} initial={{
                opacity: 0,
                x: -10
              }} whileInView={{
                opacity: 1,
                x: 0
              }} viewport={{
                once: true
              }} transition={{
                delay: idx * 0.08
              }} className="flex gap-6 py-4 border-b border-white/5 group">
                <div className="text-[#D4A84B] font-serif text-xl w-24 shrink-0" style={{
                  fontFamily: 'Georgia, serif'
                }}>
                  {t.year}
                </div>
                <div className="text-white/70 group-hover:text-white transition-colors pt-1">{t.label}</div>
              </motion.div>)}
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: Briefcase, label: i.about.roles[0] },
              { icon: GraduationCap, label: i.about.roles[1] },
              { icon: Award, label: i.about.roles[2] },
            ].map(r => <div key={r.label} className="p-5 border border-white/10 rounded-sm hover:border-[#D4A84B]/40 transition-colors">
              <r.icon className="w-5 h-5 text-[#D4A84B] mb-3" />
              <div className="text-sm font-medium">{r.label}</div>
            </div>)}
          </div>
        </div>
      </div>
    </section>

    {/* SERVICES */}
    <section id="services" className="relative py-24 md:py-32 bg-[#0A1424] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="max-w-3xl mb-16">
          <div className="text-[11px] uppercase tracking-[0.3em] text-[#D4A84B] mb-4">{i.services.label}</div>
          <h2 className="text-4xl md:text-5xl font-serif leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
            {i.services.heading}{' '}
            <span className="italic text-[#D4A84B]">{i.services.headingItalic}</span>.
          </h2>
          <p className="mt-6 text-white/60 text-lg leading-relaxed">{i.services.body}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5">
          {i.data.serviceCategories.map((svc, idx) => {
            const IconMap: Record<string, React.ElementType> = {
              'advisory': Compass,
              'agile': Layers,
              'teams': Users,
              'workshops': Target,
              'ai': Brain,
              'product': Rocket
            };
            const Icon = IconMap[svc.id] || Compass;
            return (
              <motion.div key={svc.title} initial={{
                opacity: 0,
                y: 20
              }} whileInView={{
                opacity: 1,
                y: 0
              }} viewport={{
                once: true
              }} transition={{
                delay: idx * 0.06
              }} className="group relative bg-[#0A1424] p-8 lg:p-10 hover:bg-[#0E1A2E] transition-all">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-sm bg-[#D4A84B]/10 border border-[#D4A84B]/20 flex items-center justify-center group-hover:bg-[#D4A84B] group-hover:border-[#D4A84B] transition-all">
                    <Icon className="w-5 h-5 text-[#D4A84B] group-hover:text-[#0B1628] transition-colors" />
                  </div>
                  <div className="text-[10px] text-white/30 tracking-[0.2em]">0{idx + 1}</div>
                </div>
            <h3 className="text-xl font-serif mb-2" style={{
              fontFamily: 'Georgia, serif'
            }}>{svc.title}</h3>
            <p className="text-sm text-[#D4A84B]/80 mb-5">{svc.tagline}</p>
            <ul className="space-y-2">
              {svc.items.map(item => <li key={item} className="flex items-start gap-2 text-sm text-white/60">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#D4A84B]/70 mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>)}
            </ul>
            <div className="mt-6 pt-6 border-t border-white/5">
              <a href="#contact" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/50 group-hover:text-[#D4A84B] transition-colors">
                <span>{i.services.cta}</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </motion.div>); })}
        </div>
      </div>
    </section>

    {/* TRAININGS */}
    <section id="trainings" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-12 gap-14 mb-16">
          <div className="lg:col-span-6">
            <div className="text-[11px] uppercase tracking-[0.3em] text-[#D4A84B] mb-4">{i.trainings.label}</div>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
              {i.trainings.heading}
            </h2>
          </div>
          <div className="lg:col-span-6 lg:pt-8">
            <p className="text-white/60 leading-relaxed">{i.trainings.body}</p>
          </div>
        </div>

        {/* 65/35 layout */}
        <div className="flex flex-col lg:flex-row gap-8">

          {/* SAFe Official — 65% */}
          <div className="lg:w-[65%] bg-gradient-to-br from-[#0E1A2E] to-[#0A1424] border border-white/10 rounded-sm p-8 md:p-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="px-2 py-1 bg-[#D4A84B] text-[#0B1628] text-[10px] font-bold tracking-widest rounded-sm">SAFe®</div>
              <span className="text-xs text-white/40 uppercase tracking-[0.2em]">Scaled Agile Inc.</span>
            </div>
            <h3 className="text-2xl font-serif mb-6" style={{ fontFamily: 'Georgia, serif' }}>{i.trainings.safeLabel}</h3>
            <div className="space-y-2">
              {i.data.safeAccordionItems.map(item => (
                <div key={item.id} className="border border-white/10 rounded-sm overflow-hidden hover:border-[#D4A84B]/30 transition-colors">
                  <button
                    onClick={() => setOpenSafeItem(openSafeItem === item.id ? null : item.id)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-sm font-medium text-white/85 truncate">{item.title}</span>
                      <span className="text-[10px] uppercase tracking-[0.15em] text-white/35 shrink-0 hidden sm:block">{item.level}</span>
                    </div>
                    {openSafeItem === item.id
                      ? <Minus className="w-4 h-4 text-[#D4A84B] shrink-0" />
                      : <Plus className="w-4 h-4 text-white/30 shrink-0" />}
                  </button>
                  <AnimatePresence>
                    {openSafeItem === item.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 text-sm text-white/55 leading-relaxed border-t border-white/5">
                          <p className="pt-4">{item.description}</p>
                          <a href="#contact" className="mt-4 inline-flex items-center gap-2 text-xs text-[#D4A84B] hover:gap-3 transition-all">
                            <span>{i.trainings.enquire}</span>
                            <ArrowRight className="w-3 h-3" />
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Custom Programs — 35% */}
          <div className="lg:w-[35%] bg-gradient-to-br from-[#1A1410] to-[#0F0B08] border border-[#D4A84B]/20 rounded-sm p-8 md:p-10">
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="w-4 h-4 text-[#D4A84B]" />
              <span className="text-xs text-[#D4A84B] uppercase tracking-[0.2em]">{i.trainings.customTag}</span>
            </div>
            <h3 className="text-2xl font-serif mb-2 flex items-center flex-wrap gap-3" style={{ fontFamily: 'Georgia, serif' }}>
              {i.trainings.customLabel}
            </h3>
            <div className="mb-6">
              <span className="text-[10px] font-sans tracking-[0.2em] uppercase bg-[#D4A84B]/20 text-[#D4A84B] px-2 py-1 rounded-sm border border-[#D4A84B]/30 whitespace-nowrap">
                {i.trainings.customBadge}
              </span>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {i.data.customTrainings.map(t => {
                const IconMap: Record<string, React.ElementType> = {
                  'exec': Briefcase,
                  'prod': Rocket,
                  'ai': Brain,
                  'team': Users,
                  'change': Zap
                };
                const Icon = IconMap[t.id] || Briefcase;
                return (
                  <div key={t.id} className="flex items-center gap-4 p-4 border border-white/5 rounded-sm hover:border-[#D4A84B]/40 hover:bg-[#D4A84B]/5 transition-all">
                    <div className="w-10 h-10 rounded-sm bg-[#D4A84B]/10 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-[#D4A84B]" />
                    </div>
                    <div className="text-sm text-white/80">{t.name}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {i.trainings.formats.map((label, idx) => {
            const icons = [Building2, Globe, Mountain, Users];
            const Icon = icons[idx];
            return <div key={label} className="flex items-center gap-3 p-4 border border-white/10 rounded-sm">
              <Icon className="w-4 h-4 text-[#D4A84B]" />
              <span className="text-sm text-white/70">{label}</span>
            </div>;
          })}
        </div>
      </div>
    </section>


    {/* OFFSITE */}
    <section id="offsites" className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-[#0B1628] via-[#0A1424] to-[#0B1628]">
      <div className="absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: 'radial-gradient(circle at 70% 30%, #D4A84B 0%, transparent 50%)'
      }} />
      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-12 gap-14 items-center">
          <div className="lg:col-span-6">
            <div className="text-[11px] uppercase tracking-[0.3em] text-[#D4A84B] mb-4">{i.offsite.label}</div>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
              {i.offsite.heading} <span className="italic text-[#D4A84B]">{i.offsite.headingItalic}</span> {i.offsite.headingSuffix}
            </h2>
            <p className="mt-6 text-white/70 text-lg leading-relaxed">{i.offsite.body}</p>

            <div className="mt-10 grid grid-cols-2 gap-4">
              {i.offsite.features.map(f => <div key={f} className="flex items-center gap-3 p-4 bg-white/[0.03] border border-white/10 rounded-sm">
                <Award className="w-4 h-4 text-[#D4A84B] shrink-0" />
                <span className="text-sm text-white/80">{f}</span>
              </div>)}
            </div>

            <a href="#contact" className="mt-10 inline-flex items-center gap-3 px-7 py-4 bg-transparent border border-[#D4A84B] text-[#D4A84B] font-medium rounded-sm hover:bg-[#D4A84B] hover:text-[#0B1628] transition-all">
              <span>{i.offsite.cta}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[5/6] rounded-sm overflow-hidden border border-[#D4A84B]/20 bg-[#0B1628]">
              <AnimatePresence mode="popLayout">
                <motion.img
                  key={husserenImageIndex}
                  src={[`/Husseren_Retreat1.jpg`, `/Husseren_Retreat2.jpg`, `/Husseren_Retreat3.jpg`][husserenImageIndex]}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1628] via-[#0B1628]/40 to-transparent opacity-80" />
              <div className="absolute inset-0 opacity-40 z-10 pointer-events-none" style={{
                backgroundImage: 'linear-gradient(135deg, rgba(212,168,75,0.15) 0%, transparent 40%, rgba(212,168,75,0.1) 100%)'
              }} />
              <div className="absolute inset-0 flex flex-col justify-between p-10 z-20">
                <div>
                  <Mountain className="w-10 h-10 text-[#D4A84B]/60" />
                  <div className="mt-6 text-xs tracking-[0.3em] text-white/40 uppercase">{i.offsite.loc}</div>
                  <div className="mt-2 text-3xl md:text-4xl font-serif text-white" style={{ fontFamily: 'Georgia, serif' }}>{i.offsite.title}</div>
                </div>
                <div className="border-t border-white/10 pt-6 space-y-2">
                  <div className="flex items-center justify-between text-xs text-white/50">
                    <span>{i.offsite.formatLabel}</span><span className="text-white">{i.offsite.formatVal}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-white/50">
                    <span>{i.offsite.cohortLabel}</span><span className="text-white">{i.offsite.cohortVal}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-white/50">
                    <span>{i.offsite.langsLabel}</span><span className="text-white">{i.offsite.langsVal}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* GRAHAM SHELBY COLLAB */}
    <section className="relative py-24 md:py-32 bg-[#0A1424] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-12 gap-14 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative aspect-[4/5] rounded-sm overflow-hidden border border-white/10 bg-[#0B1628]">
              <img src="/Graham_Shelby.jpg" alt="Graham Shelby" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[#0B1628] via-[#0B1628]/80 to-transparent z-10">
                <div className="text-xs tracking-[0.3em] text-[#D4A84B] uppercase mb-2">{i.collab.collabWith}</div>
                <div className="text-2xl font-serif text-white" style={{
                  fontFamily: 'Georgia, serif'
                }}>Graham Shelby</div>
                <div className="text-sm text-white/70 mt-1">{i.collab.collabRole}</div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="text-[11px] uppercase tracking-[0.3em] text-[#D4A84B] mb-4">{i.collab.label}</div>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
              {i.collab.heading}{' '}
              <span className="italic text-[#D4A84B]">{i.collab.headingItalic}</span>{i.collab.headingSuffix}
            </h2>
            <p className="mt-6 text-white/70 text-lg leading-relaxed">{i.collab.body}</p>
            <div className="mt-8 grid sm:grid-cols-2 gap-3">
              {i.collab.features.map(f => <div key={f} className="flex items-start gap-2 text-sm text-white/70">
                <Star className="w-3.5 h-3.5 text-[#D4A84B] mt-0.5 shrink-0" />
                <span>{f}</span>
              </div>)}
            </div>
            <a href="#contact" className="mt-8 inline-flex items-center gap-3 px-6 py-3 border border-white/20 text-white text-sm font-medium rounded-sm hover:bg-white/5 transition-all">
              <span>{i.collab.cta}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>

    {/* EDUCATION */}
    <section className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-12 gap-14">
          <div className="lg:col-span-5">
            <div className="text-[11px] uppercase tracking-[0.3em] text-[#D4A84B] mb-4">{i.education.label}</div>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
              {i.education.heading}
            </h2>
            <p className="mt-6 text-white/60 leading-relaxed">{i.education.body1}</p>
            <p className="mt-4 text-white/50 leading-relaxed text-sm">{i.education.body2}</p>
          </div>
          <div className="lg:col-span-7">
            <div className="border border-white/10 rounded-sm p-8 bg-gradient-to-br from-[#0E1A2E] to-[#0A1424]">
              <div className="flex items-start justify-between mb-6">
                <GraduationCap className="w-8 h-8 text-[#D4A84B]" />
                <div className="text-xs text-white/40 uppercase tracking-[0.2em]">{i.education.tag}</div>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                {i.education.courses.map(c => <div key={c} className="p-5 border border-white/5 rounded-sm hover:border-[#D4A84B]/30 transition-colors">
                  <BookOpen className="w-4 h-4 text-[#D4A84B] mb-3" />
                  <div className="font-medium">{c}</div>
                  <div className="text-xs text-white/40 mt-1">{i.education.courseTag}</div>
                </div>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* CASE STUDIES */}
    <section className="relative py-24 md:py-32 bg-[#0A1424] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="max-w-3xl mb-14">
          <div className="text-[11px] uppercase tracking-[0.3em] text-[#D4A84B] mb-4">{i.results.label}</div>
          <h2 className="text-4xl md:text-5xl font-serif leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
            {i.results.heading}
          </h2>
          <p className="mt-6 text-white/60 text-lg">{i.results.body}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {i.data.caseStudies.map((c, idx) => <motion.div key={c.sector} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: idx * 0.08
          }} className="relative p-8 border border-white/10 rounded-sm hover:border-[#D4A84B]/40 transition-all group">
            <div className="flex items-start justify-between mb-6">
              <div className="text-xs uppercase tracking-[0.2em] text-[#D4A84B]">{c.sector}</div>
              <TrendingUp className="w-4 h-4 text-white/30 group-hover:text-[#D4A84B] transition-colors" />
            </div>
            <div className="mb-4 text-white/50 text-sm">{c.challenge}</div>
            <div className="text-white/90 leading-relaxed mb-8">{c.outcome}</div>
            <div className="flex items-end justify-between pt-6 border-t border-white/5">
              <div>
                <div className="text-4xl font-serif text-[#D4A84B]" style={{
                  fontFamily: 'Georgia, serif'
                }}>{c.metric}</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mt-1">{c.label}</div>
              </div>
            </div>
          </motion.div>)}
        </div>
      </div>
    </section>

    {/* ANA RÊVE — expanded */}
    <section className="relative py-28 md:py-36 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.05]" style={{
        backgroundImage: 'radial-gradient(circle at 30% 70%, #E8C4A0 0%, transparent 50%), radial-gradient(circle at 80% 20%, #D4A84B 0%, transparent 40%)'
      }} />
      <div className="relative max-w-6xl mx-auto px-6 md:px-10">
        <div className="text-center mb-16">
          <div className="text-[11px] uppercase tracking-[0.3em] text-[#D4A84B] mb-4">{i.anaReve.label}</div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
            {i.anaReve.heading} <span className="italic text-[#D4A84B]">{i.anaReve.headingItalic}</span> {i.anaReve.headingSuffix}
          </h2>
          <p className="mt-8 text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">{i.anaReve.body}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {i.data.anaReveItems.map(s => <div key={s.k} className="p-8 border border-white/10 rounded-sm hover:border-[#D4A84B]/30 transition-colors bg-white/[0.01]">
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#D4A84B] mb-3">{s.k}</div>
            <h3 className="text-lg font-serif mb-3" style={{
              fontFamily: 'Georgia, serif'
            }}>{s.title}</h3>
            <p className="text-sm text-white/55 leading-relaxed">{s.body}</p>
          </div>)}
        </div>

        <div className="border border-[#D4A84B]/20 rounded-sm p-8 md:p-10 bg-gradient-to-br from-[#D4A84B]/5 to-transparent text-center">
          <p className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto italic" style={{ fontFamily: 'Georgia, serif' }}>
            {i.anaReve.quote}
          </p>
          <div className="mt-4 text-sm text-[#D4A84B]">— Mihail Olteanu</div>
        </div>
      </div>
    </section>

    {/* TESTIMONIALS */}
    <section id="testimonials" className="relative py-24 md:py-32 bg-[#0A1424] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="max-w-2xl mb-14">
          <div className="text-[11px] uppercase tracking-[0.3em] text-[#D4A84B] mb-4">{i.testimonials.label}</div>
          <h2 className="text-4xl md:text-5xl font-serif leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
            {i.testimonials.heading}
          </h2>
          <p className="mt-4 text-white/55 leading-relaxed">{i.testimonials.body}</p>
        </div>

        <div ref={testimonialRef} className="relative">
          {/* Large featured testimonial */}
          <AnimatePresence mode="wait">
            <motion.div key={activeTestimonial} initial={{
              opacity: 0,
              y: 16
            }} animate={{
              opacity: 1,
              y: 0
            }} exit={{
              opacity: 0,
              y: -16
            }} transition={{
              duration: 0.4
            }} className="grid lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-8">
                <Quote className="w-10 h-10 text-[#D4A84B]/30 mb-6" />
                <blockquote className="text-xl md:text-2xl text-white/85 leading-relaxed font-serif" style={{
                  fontFamily: 'Georgia, serif'
                }}>
                  &ldquo;{i.data.testimonials[activeTestimonial].quote}&rdquo;
                </blockquote>
                <div className="mt-8 flex items-center gap-4">
                  <img src={i.data.testimonials[activeTestimonial].photo} alt={`Portrait of ${i.data.testimonials[activeTestimonial].name}`} className="w-14 h-14 rounded-full object-cover border-2 border-[#D4A84B]/30" />
                  <div>
                    <div className="font-semibold text-white">{i.data.testimonials[activeTestimonial].name}</div>
                    <div className="text-sm text-white/50 mt-0.5">{i.data.testimonials[activeTestimonial].role}</div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-4 flex flex-col gap-3">
                {i.data.testimonials.map((t, idx) => <button key={t.name} onClick={() => setActiveTestimonial(idx)} className={`flex items-center gap-3 p-3 rounded-sm border text-left transition-all ${idx === activeTestimonial ? 'border-[#D4A84B]/50 bg-[#D4A84B]/5' : 'border-white/5 hover:border-white/20'}`}>
                  <img src={t.photo} alt={`Portrait of ${t.name}`} className={`w-9 h-9 rounded-full object-cover shrink-0 transition-opacity ${idx === activeTestimonial ? 'opacity-100' : 'opacity-40'}`} />
                  <div className="min-w-0">
                    <div className={`text-xs font-medium truncate transition-colors ${idx === activeTestimonial ? 'text-white' : 'text-white/40'}`}>
                      {t.name}
                    </div>
                    <div className="text-[10px] text-white/30 truncate mt-0.5">{t.role.split('·')[0].trim()}</div>
                  </div>
                </button>)}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation arrows */}
          <div className="mt-10 flex items-center gap-3">
            <button onClick={prevTestimonial} className="w-10 h-10 border border-white/15 rounded-sm flex items-center justify-center hover:border-[#D4A84B]/50 hover:text-[#D4A84B] transition-colors" aria-label="Previous testimonial">
              <ChevronRight className="w-4 h-4 rotate-180" />
            </button>
            <button onClick={nextTestimonial} className="w-10 h-10 border border-white/15 rounded-sm flex items-center justify-center hover:border-[#D4A84B]/50 hover:text-[#D4A84B] transition-colors" aria-label="Next testimonial">
              <ChevronRight className="w-4 h-4" />
            </button>
            <div className="flex gap-1.5 ml-2">
              {i.data.testimonials.map((_, idx) => <button key={idx} onClick={() => setActiveTestimonial(idx)} aria-label={`Go to testimonial ${idx + 1}`} className={`h-1 rounded-full transition-all ${idx === activeTestimonial ? 'w-6 bg-[#D4A84B]' : 'w-1.5 bg-white/20'}`} />)}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* INSIGHTS — hidden */}
    {false && <section id="insights" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <div className="text-[11px] uppercase tracking-[0.3em] text-[#D4A84B] mb-4">10 · Insights</div>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight" style={{
              fontFamily: 'Georgia, serif'
            }}>
              Notes from the field.
            </h2>
          </div>
          <a href="https://www.mihailolteanu.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-[#D4A84B] hover:gap-3 transition-all">
            <span>{i.insights.all}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {insights.map((p, idx) => <motion.a key={p.title} href="https://www.mihailolteanu.com" target="_blank" rel="noopener noreferrer" initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: idx * 0.08
          }} className="group block p-7 border border-white/10 rounded-sm hover:border-[#D4A84B]/40 hover:bg-[#0E1A2E] transition-all">
            <div className="text-[10px] uppercase tracking-[0.25em] text-[#D4A84B] mb-4">{p.category}</div>
            <h3 className="text-xl font-serif leading-snug mb-4 group-hover:text-[#D4A84B] transition-colors" style={{
              fontFamily: 'Georgia, serif'
            }}>
              {p.title}
            </h3>
            <p className="text-sm text-white/60 leading-relaxed mb-6">{p.excerpt}</p>
            <div className="flex items-center justify-between text-xs text-white/40">
              <span>{p.read}</span>
              <ArrowUpRight className="w-4 h-4 group-hover:text-[#D4A84B] transition-colors" />
            </div>
          </motion.a>)}
        </div>
      </div>
    </section>}

    {/* FAQ */}
    <section className="relative py-24 md:py-32 bg-[#0A1424] border-y border-white/5">
      <div className="max-w-4xl mx-auto px-6 md:px-10">
        <div className="text-center mb-14">
          <div className="text-[11px] uppercase tracking-[0.3em] text-[#D4A84B] mb-4">{i.faq.label}</div>
          <h2 className="text-4xl md:text-5xl font-serif" style={{ fontFamily: 'Georgia, serif' }}>
            {i.faq.heading}
          </h2>
        </div>
        <div className="space-y-3">
          {i.data.faqs.map((f, idx) => <div key={f.q} className="border border-white/10 rounded-sm overflow-hidden">
            <button onClick={() => setOpenFaq(openFaq === idx ? null : idx)} className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.02] transition-colors">
              <span className="text-base md:text-lg font-medium pr-6">{f.q}</span>
              {openFaq === idx ? <Minus className="w-5 h-5 text-[#D4A84B] shrink-0" /> : <Plus className="w-5 h-5 text-[#D4A84B] shrink-0" />}
            </button>
            <AnimatePresence>
              {openFaq === idx && <motion.div initial={{
                height: 0,
                opacity: 0
              }} animate={{
                height: 'auto',
                opacity: 1
              }} exit={{
                height: 0,
                opacity: 0
              }} transition={{
                duration: 0.3
              }} className="overflow-hidden">
                <div className="px-6 pb-6 text-white/60 leading-relaxed">{f.a}</div>
              </motion.div>}
            </AnimatePresence>
          </div>)}
        </div>
      </div>
    </section>

    {/* CONTACT */}
    <section id="contact" className="relative py-28 md:py-40 overflow-hidden bg-gradient-to-b from-[#0B1628] to-[#080F1C]">
      <div className="absolute inset-0 opacity-[0.08]" style={{
        backgroundImage: 'radial-gradient(ellipse at 50% 0%, #D4A84B 0%, transparent 55%)'
      }} />
      <div className="relative max-w-5xl mx-auto px-6 md:px-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <div className="text-[11px] uppercase tracking-[0.3em] text-[#D4A84B] mb-6">{i.contact.label}</div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif leading-[1.05]" style={{ fontFamily: 'Georgia, serif' }}>
            {i.contact.heading}{' '}
            <span className="italic text-[#D4A84B]">{i.contact.headingItalic}</span>.
          </h2>
          <p className="mt-8 text-lg md:text-xl text-white/60 max-w-xl mx-auto leading-relaxed">{i.contact.body}</p>
        </div>

        {/* Primary CTA */}
        <div className="flex justify-center mb-16">
          <a href="https://calendly.com/mihailolteanu" target="_blank" rel="noopener noreferrer"
            className="group inline-flex items-center gap-4 px-10 py-5 bg-[#D4A84B] text-[#0B1628] font-semibold rounded-sm hover:bg-[#E6BC5E] transition-all text-base shadow-[0_0_40px_rgba(212,168,75,0.25)] hover:shadow-[0_0_60px_rgba(212,168,75,0.4)]">
            <Calendar className="w-5 h-5" />
            <span>{i.contact.cta}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Contact cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {contactInfoItems.map(c => (
            <a key={c.label} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined}
              rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="flex flex-col items-center gap-3 p-7 border border-white/10 rounded-sm hover:border-[#D4A84B]/40 hover:bg-[#D4A84B]/[0.03] transition-all group text-center">
              <div className="w-11 h-11 rounded-sm bg-[#D4A84B]/10 flex items-center justify-center">
                <c.icon className="w-5 h-5 text-[#D4A84B]" />
              </div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-white/40">{c.label}</div>
              <div className="text-sm text-white/80 group-hover:text-white transition-colors">{c.value}</div>
            </a>
          ))}
        </div>

        {/* Languages */}
        <div className="flex flex-col items-center gap-4 pt-10 border-t border-white/10">
          <div className="text-[10px] uppercase tracking-[0.3em] text-white/30">{i.contact.availIn}</div>
          <div className="flex gap-3 flex-wrap justify-center">
            {i.contact.langs.map(l => (
              <span key={l} className="inline-flex items-center gap-1.5 px-4 py-2 border border-white/10 rounded-full text-xs text-white/60">
                <Globe className="w-3 h-3 text-[#D4A84B]" />
                <span>{l}</span>
              </span>
            ))}
          </div>
          <p className="text-xs text-white/30">{i.contact.presence}</p>
        </div>
      </div>
    </section>

    {/* FOOTER */}
    <footer className="relative border-t border-white/5 py-12 bg-[#080F1C]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-[#D4A84B] to-[#B8852A] flex items-center justify-center text-[#0B1628] font-bold text-xs">
              MO
            </div>
            <div>
              <div className="text-sm font-medium">Mihail Olteanu</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/40">{i.footer.role}</div>
            </div>
          </div>
          <div className="text-xs text-white/40 text-center">
            © {new Date().getFullYear()} Mihail Olteanu · {i.footer.rights}
          </div>
          <div className="flex items-center gap-4 text-xs text-white/50">
            <button onClick={() => setShowPrivacy(true)} className="hover:text-white transition-colors cursor-pointer">{i.footer.privacy}</button>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <button onClick={() => setShowLegal(true)} className="hover:text-white transition-colors cursor-pointer">{i.footer.legal}</button>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="text-white/30">EN · FR</span>
          </div>
        </div>
      </div>
    </footer>

    {/* PRIVACY MODAL */}
    <AnimatePresence>
      {showPrivacy && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/70 backdrop-blur-sm"
          onClick={() => setShowPrivacy(false)}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            className="relative max-w-2xl w-full bg-[#0E1A2E] border border-white/10 rounded-sm p-8 md:p-10 max-h-[80vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowPrivacy(false)} className="absolute top-5 right-5 text-white/40 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#D4A84B] mb-4">{i.footer.legal}</div>
            <h2 className="text-2xl font-serif mb-6" style={{ fontFamily: 'Georgia, serif' }}>{i.footer.privacy}</h2>
            <div className="space-y-5 text-sm text-white/60 leading-relaxed">
              <p><strong className="text-white/80">Last updated:</strong> May 2026</p>
              <p>Mihail Olteanu (&quot;we&quot;, &quot;our&quot;) is committed to protecting your personal data. This policy explains how we collect, use and safeguard information you provide through this website.</p>
              <h3 className="text-white/80 font-semibold">Data We Collect</h3>
              <p>We may collect your name, email address, organization, and any information you voluntarily share when booking a call or reaching out via contact links. We do not collect data automatically beyond standard server logs.</p>
              <h3 className="text-white/80 font-semibold">How We Use Your Data</h3>
              <p>Your data is used solely to respond to your inquiry and, where you have consented, to send relevant updates about services. We do not sell, rent or share your data with third parties for marketing purposes.</p>
              <h3 className="text-white/80 font-semibold">Data Retention</h3>
              <p>Contact information is retained only as long as necessary to fulfil the purpose for which it was collected, or as required by applicable law.</p>
              <h3 className="text-white/80 font-semibold">Your Rights</h3>
              <p>Under GDPR and applicable European law, you have the right to access, correct, delete or restrict processing of your personal data. To exercise these rights, contact: <a href="mailto:contact@mochiviva.com" className="text-[#D4A84B] hover:underline">contact@mochiviva.com</a>.</p>
              <h3 className="text-white/80 font-semibold">Cookies</h3>
              <p>This website does not use tracking cookies. We may use session cookies strictly necessary for basic site functionality.</p>
              <h3 className="text-white/80 font-semibold">Contact</h3>
              <p>For any privacy-related questions: <a href="mailto:contact@mochiviva.com" className="text-[#D4A84B] hover:underline">contact@mochiviva.com</a></p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>

    {/* LEGAL MODAL */}
    <AnimatePresence>
      {showLegal && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/70 backdrop-blur-sm"
          onClick={() => setShowLegal(false)}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            className="relative max-w-2xl w-full bg-[#0E1A2E] border border-white/10 rounded-sm p-8 md:p-10 max-h-[80vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowLegal(false)} className="absolute top-5 right-5 text-white/40 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#D4A84B] mb-4">{i.footer.legal}</div>
            <h2 className="text-2xl font-serif mb-6" style={{ fontFamily: 'Georgia, serif' }}>{i.footer.legal}</h2>
            <div className="space-y-5 text-sm text-white/60 leading-relaxed">
              <p><strong className="text-white/80">Last updated:</strong> May 2026</p>
              <h3 className="text-white/80 font-semibold">Publisher</h3>
              <p>This website is published by Mihail Olteanu, independent executive consultant and trainer, operating under the trade name <strong className="text-white/70">Ana Rêve Consulting</strong>, registered in France.</p>
              <p>Contact: <a href="mailto:contact@mochiviva.com" className="text-[#D4A84B] hover:underline">contact@mochiviva.com</a></p>
              <h3 className="text-white/80 font-semibold">Intellectual Property</h3>
              <p>All content on this website — including text, structure, design and methodology descriptions — is the exclusive property of Mihail Olteanu. Reproduction, distribution or use without prior written consent is prohibited.</p>
              <h3 className="text-white/80 font-semibold">Limitation of Liability</h3>
              <p>Information on this site is provided for general informational purposes only. While every effort is made to ensure accuracy, no warranty is given regarding completeness or fitness for a particular purpose.</p>
              <h3 className="text-white/80 font-semibold">External Links</h3>
              <p>This website may contain links to third-party sites. We have no control over and accept no responsibility for the content of those sites.</p>
              <h3 className="text-white/80 font-semibold">Applicable Law</h3>
              <p>This website is governed by French law. Any dispute shall be subject to the exclusive jurisdiction of the courts of Paris, France.</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>

    {/* BACK TO TOP */}
    <AnimatePresence>
      {showBackToTop && <motion.a href="#top" initial={{
        opacity: 0,
        y: 10
      }} animate={{
        opacity: 1,
        y: 0
      }} exit={{
        opacity: 0,
        y: 10
      }} className="fixed bottom-8 right-6 z-40 w-11 h-11 bg-[#D4A84B] text-[#0B1628] rounded-sm flex items-center justify-center shadow-lg hover:bg-[#E6BC5E] transition-colors" aria-label="Back to top">
        <ChevronUp className="w-5 h-5" />
      </motion.a>}
    </AnimatePresence>
  </div>;
};