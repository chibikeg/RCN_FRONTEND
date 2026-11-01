import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Search, Filter, Clock, ChevronRight } from 'lucide-react';
import PublicLayout from '../components/layout/PublicLayout';
import {
  PageHero, Card, Badge, LoadingScreen, Pagination, EmptyState
} from '../components/ui';
import { mockEvents, paginateMock } from '../services/mock/mockData';

const CATEGORIES = ['All', 'CONFERENCE', 'YOUTH', 'WOMEN', 'MINISTERS', 'WORSHIP'];

const EventsPage = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState({ data: [], pagination: null });

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      let filtered = mockEvents;
      if (search) {
        const q = search.toLowerCase();
        filtered = filtered.filter(
          (e) =>
            e.title.toLowerCase().includes(q) ||
            e.location.toLowerCase().includes(q) ||
            e.description.toLowerCase().includes(q)
        );
      }
      if (category !== 'All') {
        filtered = filtered.filter((e) => e.category === category);
      }
      setResult(paginateMock(filtered, page, 6));
      setLoading(false);
    }, 300);
  }, [search, category, page]);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('en-GB', {
      weekday: 'short', day: 'numeric', month: 'long', year: 'numeric',
    });

  const formatTime = (dateStr) =>
    new Date(dateStr).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

  const categoryColors = {
    CONFERENCE: 'primary',
    YOUTH: 'accent',
    WOMEN: 'danger',
    MINISTERS: 'gold',
    WORSHIP: 'warning',
  };

  return (
    <PublicLayout>
      <PageHero
        title="Events & Conferences"
        subtitle="Experience the presence of God at our gatherings, conferences, and conventions"
        breadcrumb={['Home', 'Events']}
        bgImage="/conference-bg.jpg"
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search events..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="input-base pl-12"
                id="event-search"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setCategory(cat); setPage(1); }}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    category === cat
                      ? 'bg-accent text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-accent/10 hover:text-accent'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <LoadingScreen message="Loading events..." />
          ) : result.data.length === 0 ? (
            <EmptyState
              icon={Calendar}
              title="No events found"
              message="Check back soon for upcoming events"
            />
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {result.data.map((event) => (
                  <Link key={event.id} to={`/events/${event.id}`}>
                    <Card hover className="group h-full flex flex-col">
                      {/* Image */}
                      <div
                        className="relative h-48 bg-cover bg-center overflow-hidden"
                        style={{ backgroundImage: `url(${event.imageUrl})` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
                        <div className="absolute top-3 left-3">
                          <Badge variant={categoryColors[event.category] || 'accent'}>
                            {event.category}
                          </Badge>
                        </div>
                        {/* Date chip */}
                        <div className="absolute bottom-3 left-3 bg-accent text-white px-3 py-1.5 rounded-lg text-xs font-bold">
                          {new Date(event.startDate).toLocaleDateString('en-GB', {
                            day: 'numeric', month: 'short',
                          })}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 flex-1 flex flex-col">
                        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-accent transition-colors line-clamp-2 flex-1">
                          {event.title}
                        </h3>
                        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{event.description}</p>
                        <div className="space-y-2 text-xs text-gray-400 border-t border-gray-100 pt-3">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                            <span>{formatDate(event.startDate)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                            <span>{formatTime(event.startDate)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                            <span className="line-clamp-1">{event.location}</span>
                          </div>
                        </div>
                        <div className="mt-4 flex items-center text-accent text-xs font-semibold group-hover:gap-2 transition-all gap-1">
                          View Details <ChevronRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>

              <Pagination
                pagination={result.pagination}
                onPageChange={(p) => { setPage(p); window.scrollTo(0, 0); }}
              />
            </>
          )}
        </div>
      </section>
    </PublicLayout>
  );
};

export default EventsPage;
