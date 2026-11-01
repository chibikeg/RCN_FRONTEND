import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlayCircle, Search, Filter, Clock, Calendar, BookOpen } from 'lucide-react';
import PublicLayout from '../components/layout/PublicLayout';
import {
  PageHero, SectionHeader, Card, Badge, LoadingScreen, Pagination, EmptyState
} from '../components/ui';
import { mockSermons, paginateMock } from '../services/mock/mockData';

const SERIES_OPTIONS = ['All', ...new Set(mockSermons.map((s) => s.series))];

const SermonsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeries, setSelectedSeries] = useState('All');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState({ data: [], pagination: null });

  const PER_PAGE = 9;

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      let filtered = mockSermons;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        filtered = filtered.filter(
          (s) =>
            s.title.toLowerCase().includes(q) ||
            s.speaker.toLowerCase().includes(q) ||
            s.series.toLowerCase().includes(q) ||
            s.tags.some((t) => t.toLowerCase().includes(q))
        );
      }
      if (selectedSeries !== 'All') {
        filtered = filtered.filter((s) => s.series === selectedSeries);
      }
      setResult(paginateMock(filtered, page, PER_PAGE));
      setLoading(false);
    }, 300);
  }, [searchQuery, selectedSeries, page]);

  const formatDuration = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return h > 0 ? `${h}h ${m}m` : `${m} min`;
  };

  return (
    <PublicLayout>
      <PageHero
        title="Sermons & Messages"
        subtitle="Dive deep into the Word of God through teachings from Dr. Arome Osaghae"
        breadcrumb={['Home', 'Sermons']}
        bgImage="/sermon-bg.jpg"
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search sermons, speakers, topics..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
                className="input-base pl-12"
                id="sermon-search"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={selectedSeries}
                onChange={(e) => { setSelectedSeries(e.target.value); setPage(1); }}
                className="input-base pl-11 pr-8 appearance-none min-w-48"
                id="series-filter"
              >
                {SERIES_OPTIONS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          {loading ? (
            <LoadingScreen message="Loading sermons..." />
          ) : result.data.length === 0 ? (
            <EmptyState
              icon={BookOpen}
              title="No sermons found"
              message="Try adjusting your search or filters"
            />
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {result.data.map((sermon) => (
                  <Link key={sermon.id} to={`/sermons/${sermon.id}`}>
                    <Card hover className="group h-full flex flex-col">
                      {/* Thumbnail */}
                      <div
                        className="relative h-48 bg-cover bg-center overflow-hidden"
                        style={{ backgroundImage: `url(${sermon.thumbnailUrl})` }}
                      >
                        <div className="absolute inset-0 bg-primary/50 group-hover:bg-primary/30 transition-all duration-300" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                          <div className="w-14 h-14 rounded-full bg-accent/90 flex items-center justify-center">
                            <PlayCircle className="w-7 h-7 text-white" />
                          </div>
                        </div>
                        <div className="absolute top-3 left-3 flex gap-2">
                          <Badge variant="accent">{sermon.series}</Badge>
                          {sermon.hasTranscript && (
                            <Badge variant="gold">Transcript</Badge>
                          )}
                        </div>
                        <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/60 text-white text-xs px-2.5 py-1 rounded-full">
                          <Clock className="w-3 h-3" />
                          {formatDuration(sermon.duration)}
                        </div>
                      </div>

                      {/* Info */}
                      <div className="p-5 flex-1 flex flex-col">
                        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-accent transition-colors line-clamp-2 flex-1">
                          {sermon.title}
                        </h3>
                        <p className="text-sm text-gray-500 mb-3">{sermon.speaker}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(sermon.preachedAt).toLocaleDateString('en-GB', {
                            day: 'numeric', month: 'short', year: 'numeric',
                          })}
                        </div>
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {sermon.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-full">
                              {tag}
                            </span>
                          ))}
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

export default SermonsPage;
