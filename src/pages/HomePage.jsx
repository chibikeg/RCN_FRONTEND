import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  PlayCircle, ChevronRight, Calendar, BookOpen,
  Heart, Globe, Mic, Users, Star, ArrowRight,
  MonitorPlay, Radio, Tv, Send, Smartphone
} from 'lucide-react';
import PublicLayout from '../components/layout/PublicLayout';
import { SectionHeader, Card, Badge } from '../components/ui';
import {
  mockSermons, mockEvents, mockAnnouncements
} from '../services/mock/mockData';

// ─── Hero Section ─────────────────────────────────────────────────────────

const Hero = () => {
  const slides = [
    {
      title: 'Welcome to',
      boldTitle: 'Remnant Christian Network',
      subtitle: 'Striving toward the rebirth of Apostolic Christianity',
      image: '/hero-bg.jpg',
      cta: { label: 'Join Our Community', path: '/register' },
      ctaSecondary: { label: 'Watch Sermons', path: '/sermons' },
    },
    {
      title: 'Apostolic',
      boldTitle: 'Christianity Restored',
      subtitle: 'Prayers · Study of the Word · Breaking of Bread',
      image: '/sermon-bg.jpg',
      cta: { label: 'Explore Sermons', path: '/sermons' },
      ctaSecondary: { label: 'Prayer Request', path: '/prayer' },
    },
    {
      title: 'Upcoming',
      boldTitle: 'Kingdom Come Conference',
      subtitle: 'Experience a gathering of the saints like never before',
      image: '/conference-bg.jpg',
      cta: { label: 'View Events', path: '/events' },
      ctaSecondary: { label: 'Give', path: '/give' },
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[current];

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Background Images */}
      {slides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === current ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url(${s.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      ))}

      {/* Gradient Overlay */}
      <div className="hero-overlay absolute inset-0" />

      {/* Content */}
      <div className="relative h-full container-custom flex flex-col justify-center items-center text-center pt-20">
        <div key={current} className="animate-fade-in-up max-w-4xl">
          <p className="text-accent text-sm font-semibold uppercase tracking-[0.25em] mb-4">
            Remnant Christian Network
          </p>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-6">
            {slide.title}{' '}
            <span className="text-gradient block">{slide.boldTitle}</span>
          </h1>
          <p className="text-white/75 text-lg md:text-xl max-w-xl mx-auto mb-10">
            {slide.subtitle}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to={slide.cta.path} className="btn-primary text-base px-8 py-4">
              {slide.cta.label}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to={slide.ctaSecondary.path} className="btn-ghost border border-white/30 text-base px-8 py-4">
              <PlayCircle className="w-4 h-4" />
              {slide.ctaSecondary.label}
            </Link>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`transition-all duration-300 rounded-full ${
                i === current ? 'w-8 h-2 bg-accent' : 'w-2 h-2 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Stats Bar ────────────────────────────────────────────────────────────

const StatsBar = () => {
  const stats = [
    { value: '30+', label: 'Years of Ministry' },
    { value: '100K+', label: 'Global Members' },
    { value: '50+', label: 'Nations Reached' },
    { value: '1000+', label: 'Sermon Messages' },
  ];

  return (
    <section className="bg-primary py-10 border-b border-white/5">
      <div className="container-custom grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {stats.map((stat) => (
          <div key={stat.label} className="group">
            <div className="text-3xl md:text-4xl font-display font-bold text-accent mb-1 group-hover:scale-110 transition-transform">
              {stat.value}
            </div>
            <div className="text-xs text-white/50 uppercase tracking-wider">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

// ─── About Section ────────────────────────────────────────────────────────

const AboutSection = () => (
  <section className="section-padding bg-white">
    <div className="container-custom grid lg:grid-cols-2 gap-16 items-center">
      {/* Images Grid */}
      <div className="grid grid-cols-2 gap-4 h-[500px]">
        <div
          className="rounded-2xl overflow-hidden row-span-2 bg-cover bg-center shadow-2xl"
          style={{ backgroundImage: 'url(/hero-bg.jpg)' }}
        />
        <div
          className="rounded-2xl overflow-hidden bg-cover bg-center shadow-xl"
          style={{ backgroundImage: 'url(/sermon-bg.jpg)' }}
        />
        <div
          className="rounded-2xl overflow-hidden bg-cover bg-center shadow-xl"
          style={{ backgroundImage: 'url(/community-bg.jpg)' }}
        />
      </div>

      {/* Content */}
      <div>
        <p className="text-accent text-xs font-semibold uppercase tracking-[0.2em] mb-4">
          About RCN
        </p>
        <h2 className="font-display text-4xl font-bold text-primary mb-6 leading-tight">
          Remnant Christian Network
        </h2>
        <p className="text-gray-600 text-base leading-relaxed mb-5">
          RCN is an interdenominational and non-denominational international Ministry to the body of Christ with the mandate of restoring the apostolic order and Christianity as was seen in the days of the first generation of apostles of Jesus Christ.
        </p>
        <p className="text-gray-600 text-base leading-relaxed mb-8">
          We seek only to see the coming of the King and His Kingdom until His reality is furnished in the hearts of the sons of men. Our major instruments of realizing this vision are <strong className="text-primary">Prayers</strong>, the <strong className="text-primary">Study of the Word</strong>, and <strong className="text-primary">Breaking of Bread</strong> with one another.
        </p>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {[
            { icon: Heart, label: 'Apostolic Christianity' },
            { icon: Globe, label: 'International Reach' },
            { icon: BookOpen, label: 'Word-Centred Teaching' },
            { icon: Users, label: 'Kingdom Community' },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3 text-sm text-gray-700">
              <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-accent" />
              </div>
              {label}
            </div>
          ))}
        </div>

        <Link to="/about" className="btn-primary">
          Learn More <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  </section>
);

// ─── Latest Sermons Section ───────────────────────────────────────────────

const SermonsSection = () => {
  const sermons = mockSermons.slice(0, 3);

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Audio & Video"
          title="Latest Sermons"
          description="Dive deep into the Word of God through messages from Dr. Arome Osaghae and ministers of the RCN network."
          className="mb-12"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sermons.map((sermon) => (
            <Link key={sermon.id} to={`/sermons/${sermon.id}`}>
              <Card hover className="group h-full">
                <div
                  className="relative h-48 bg-cover bg-center overflow-hidden"
                  style={{ backgroundImage: `url(${sermon.thumbnailUrl})` }}
                >
                  <div className="absolute inset-0 bg-primary/50 group-hover:bg-primary/30 transition-all duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-accent/80 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
                      <PlayCircle className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <div className="absolute top-3 left-3">
                    <Badge variant="accent">{sermon.series}</Badge>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-accent transition-colors line-clamp-2">
                    {sermon.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">{sermon.speaker}</p>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>{new Date(sermon.preachedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    <span>{Math.floor(sermon.duration / 60)} min</span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/sermons" className="btn-secondary">
            View All Sermons <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

// ─── Upcoming Events Section ──────────────────────────────────────────────

const EventsSection = () => {
  const events = mockEvents.slice(0, 3);

  return (
    <section className="section-padding bg-primary-gradient text-white">
      <div className="container-custom">
        <SectionHeader
          eyebrow="What's Coming"
          title="Upcoming Events"
          description="Join us at our conferences, conventions, and gatherings across the globe."
          light
          className="mb-12"
        />

        <div className="grid md:grid-cols-3 gap-6">
          {events.map((event) => (
            <Link key={event.id} to={`/events/${event.id}`}>
              <div className="glass rounded-2xl overflow-hidden group card-hover h-full">
                <div
                  className="h-44 bg-cover bg-center relative overflow-hidden"
                  style={{ backgroundImage: `url(${event.imageUrl})` }}
                >
                  <div className="absolute inset-0 bg-primary/40 group-hover:bg-primary/20 transition-all" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full bg-accent text-white text-xs font-semibold">
                      {event.category}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-white mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                    {event.title}
                  </h3>
                  <div className="flex items-center gap-2 text-white/60 text-xs">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>
                      {new Date(event.startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                  <p className="text-white/50 text-xs mt-1 line-clamp-1">{event.location}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/events" className="btn-ghost border border-white/30 hover:border-white">
            View All Events <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

// ─── Media Channels Section ───────────────────────────────────────────────

const MediaSection = () => {
  const channels = [
    {
      icon: MonitorPlay,
      title: 'YouTube Channel',
      description: "Don't miss a service. Subscribe to our YouTube channel to get notifications of our programs.",
      link: 'https://youtube.com',
      cta: 'Subscribe Now',
      color: 'bg-red-50 text-red-500',
    },
    {
      icon: Globe,
      title: 'Facebook',
      description: 'Join our Facebook community. Get updates and watch Facebook streams with any device.',
      link: 'https://facebook.com',
      cta: 'Follow Us',
      color: 'bg-blue-50 text-blue-500',
    },
    {
      icon: Tv,
      title: 'Satellite TV',
      description: 'We are closer than you think. Watch us on satellite or download the Voice of One TV mobile app.',
      link: '#',
      cta: 'Watch Now',
      color: 'bg-purple-50 text-purple-500',
    },
    {
      icon: Send,
      title: 'Telegram',
      description: 'Join our Telegram community to download our audio sermons and get daily updates.',
      link: 'https://t.me',
      cta: 'Join Channel',
      color: 'bg-sky-50 text-sky-500',
    },
    {
      icon: Radio,
      title: 'Internet Radio',
      description: 'Listen to our 24/7 Internet radio station from anywhere in the world.',
      link: '#',
      cta: 'Listen Live',
      color: 'bg-green-50 text-green-500',
    },
    {
      icon: Smartphone,
      title: 'Mobile App',
      description: 'Access RCN resources, sermons, and events on the go with our mobile application.',
      link: '#',
      cta: 'Download App',
      color: 'bg-amber-50 text-amber-500',
    },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <SectionHeader
          eyebrow="We Are Closer Than You Think"
          title="Connect With Us"
          description="Reach us across multiple platforms and never miss a teaching, event, or update."
          className="mb-12"
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {channels.map(({ icon: Icon, title, description, link, cta, color }) => (
            <a key={title} href={link} target="_blank" rel="noopener noreferrer">
              <Card hover className="p-5 h-full group">
                <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-accent transition-colors">
                  {title}
                </h3>
                <p className="text-sm text-gray-500 mb-4 leading-relaxed line-clamp-3">
                  {description}
                </p>
                <span className="text-xs font-semibold text-accent flex items-center gap-1 group-hover:gap-2 transition-all">
                  {cta} <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Announcements Section ────────────────────────────────────────────────

const AnnouncementsSection = () => {
  const announcements = mockAnnouncements.slice(0, 3);
  const priorityColors = { HIGH: 'danger', MEDIUM: 'warning', LOW: 'accent' };

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom grid lg:grid-cols-3 gap-10 items-start">
        <div className="lg:col-span-1">
          <p className="text-accent text-xs font-semibold uppercase tracking-[0.2em] mb-3">
            Latest Updates
          </p>
          <h2 className="font-display text-3xl font-bold text-primary mb-4">
            Church Announcements
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            Stay up to date with the latest news, schedules, and important information from RCN.
          </p>
          <Link to="/announcements" className="btn-primary inline-flex">
            All Announcements <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="lg:col-span-2 space-y-4">
          {announcements.map((ann) => (
            <Card key={ann.id} className="p-5 hover:border-accent/30 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={priorityColors[ann.priority] || 'accent'}>{ann.priority}</Badge>
                    <span className="text-xs text-gray-400">{ann.category}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{ann.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2">{ann.content}</p>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap flex-shrink-0">
                  {new Date(ann.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Give Section ─────────────────────────────────────────────────────────

const GiveSection = () => (
  <section
    className="relative section-padding overflow-hidden"
    style={{
      backgroundImage: 'url(/community-bg.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
    <div className="hero-overlay absolute inset-0" />
    <div className="relative container-custom text-center max-w-2xl mx-auto">
      <div className="w-16 h-16 rounded-full bg-accent-gradient mx-auto flex items-center justify-center mb-6">
        <Heart className="w-8 h-8 text-white" />
      </div>
      <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-5">
        Partner with the Vision
      </h2>
      <p className="text-white/75 text-lg mb-8 leading-relaxed">
        Your giving fuels the mission of RCN — reaching nations, training workers, and establishing the Kingdom of God in the earth.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link to="/give" className="btn-primary text-base px-8 py-4">
          <Heart className="w-5 h-5" /> Give Today
        </Link>
        <Link to="/about" className="btn-ghost border border-white/30 text-base px-8 py-4">
          Learn More
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-3 gap-6 text-white text-center">
        {[
          { label: 'Tithe & Offering', icon: '🙏' },
          { label: 'Building Fund', icon: '🏛️' },
          { label: 'Missions Support', icon: '🌍' },
        ].map((item) => (
          <div key={item.label} className="glass rounded-xl py-4 px-2">
            <div className="text-2xl mb-1">{item.icon}</div>
            <div className="text-xs text-white/70">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─── Testimonials Section ─────────────────────────────────────────────────

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Pastor Emmanuel O.',
      role: 'Minister, Lagos',
      text: "The teachings from RCN have fundamentally transformed my understanding of the Kingdom of God. Dr. Arome's sermons are a treasure.",
      stars: 5,
    },
    {
      name: 'Sister Grace A.',
      role: 'Member, Abuja',
      text: 'Being part of the RCN community has deepened my prayer life and hunger for the Word. I am forever grateful for this ministry.',
      stars: 5,
    },
    {
      name: 'Brother Daniel M.',
      role: 'Worker, Kano',
      text: 'IEC 2024 was a life-changing experience. The presence of God was tangible throughout the conference.',
      stars: 5,
    },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Testimonies"
          title="What the Community Says"
          className="mb-12"
        />
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <Card key={t.name} className="p-6">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <blockquote className="text-gray-600 text-sm leading-relaxed mb-5 italic">
                "{t.text}"
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent-gradient flex items-center justify-center text-white font-bold text-sm">
                  {t.name[0]}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{t.name}</div>
                  <div className="text-xs text-gray-500">{t.role}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Main HomePage ─────────────────────────────────────────────────────────

const HomePage = () => {
  return (
    <PublicLayout>
      <Hero />
      <StatsBar />
      <AboutSection />
      <SermonsSection />
      <EventsSection />
      <MediaSection />
      <AnnouncementsSection />
      <TestimonialsSection />
      <GiveSection />
    </PublicLayout>
  );
};

export default HomePage;
