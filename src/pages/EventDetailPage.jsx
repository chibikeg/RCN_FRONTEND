import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, ArrowLeft, Share2, PlayCircle } from 'lucide-react';
import PublicLayout from '../components/layout/PublicLayout';
import { Badge, EmptyState } from '../components/ui';
import { mockEvents } from '../services/mock/mockData';

const EventDetailPage = () => {
  const { id } = useParams();
  const event = mockEvents.find((e) => e.id === id);

  if (!event) {
    return (
      <PublicLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <EmptyState
            icon={Calendar}
            title="Event Not Found"
            message="This event may have been archived or does not exist."
            action={<Link to="/events" className="btn-primary">View All Events</Link>}
          />
        </div>
      </PublicLayout>
    );
  }

  const formatDate = (d) =>
    new Date(d).toLocaleDateString('en-GB', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    });
  const formatTime = (d) =>
    new Date(d).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

  const related = mockEvents.filter((e) => e.id !== id && e.category === event.category).slice(0, 3);

  return (
    <PublicLayout>
      {/* Hero */}
      <div
        className="relative pt-20 h-96 md:h-[500px] bg-cover bg-center"
        style={{ backgroundImage: `url(${event.imageUrl})` }}
      >
        <div className="hero-overlay absolute inset-0" />
        <div className="relative container-custom h-full flex flex-col justify-end pb-10">
          <Badge variant="accent" className="mb-3 self-start">{event.category}</Badge>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-white max-w-3xl leading-tight">
            {event.title}
          </h1>
        </div>
      </div>

      <section className="section-padding bg-white">
        <div className="container-custom grid lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Link to="/events" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-accent mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" /> All Events
            </Link>
            <h2 className="font-display text-2xl font-bold text-primary mb-4">About This Event</h2>
            <p className="text-gray-600 leading-relaxed text-base mb-6">{event.description}</p>
            <p className="text-gray-600 leading-relaxed">
              This event is part of RCN's annual calendar of gatherings designed to build up the body of Christ,
              strengthen the faith of believers, and equip ministers for the work of the Kingdom.
            </p>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-5">
            {/* Event Details Card */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <h3 className="font-semibold text-primary mb-4">Event Details</h3>
              <div className="space-y-4 text-sm text-gray-600">
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-800">Date</div>
                    <div>{formatDate(event.startDate)}</div>
                    {event.endDate && event.endDate !== event.startDate && (
                      <div className="text-gray-400">to {formatDate(event.endDate)}</div>
                    )}
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-800">Time</div>
                    <div>{formatTime(event.startDate)}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-800">Location</div>
                    <div>{event.location}</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Link to="/register" className="btn-primary w-full justify-center">
                  Register for Event
                </Link>
                <button
                  onClick={() => navigator.share?.({ title: event.title, url: window.location.href })}
                  className="btn-secondary w-full justify-center"
                >
                  <Share2 className="w-4 h-4" /> Share
                </button>
              </div>
            </div>

            {/* Give Card */}
            <div className="bg-primary-gradient rounded-2xl p-6 text-white text-center">
              <h3 className="font-semibold mb-2">Support This Event</h3>
              <p className="text-white/70 text-sm mb-4">Your giving enables us to host life-changing gatherings</p>
              <Link to="/give" className="bg-accent text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-accent-dark transition-colors inline-block">
                Give Now
              </Link>
            </div>
          </div>
        </div>

        {/* Related Events */}
        {related.length > 0 && (
          <div className="container-custom mt-16">
            <h2 className="font-display text-2xl font-bold text-primary mb-6">Related Events</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((e) => (
                <Link key={e.id} to={`/events/${e.id}`} className="group">
                  <div className="flex gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-accent/5 transition-colors border border-gray-100">
                    <div
                      className="w-20 h-20 rounded-xl bg-cover bg-center flex-shrink-0"
                      style={{ backgroundImage: `url(${e.imageUrl})` }}
                    />
                    <div>
                      <h4 className="font-medium text-gray-900 text-sm group-hover:text-accent transition-colors line-clamp-2">{e.title}</h4>
                      <p className="text-xs text-gray-400 mt-1">{formatDate(e.startDate)}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </PublicLayout>
  );
};

export default EventDetailPage;
