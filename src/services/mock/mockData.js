// Mock data for development use before backend integration
// All mock data follows the API response structure: { success, message, data, pagination }

// ─── Mock Users / Auth ────────────────────────────────────────────────────

export const mockUsers = [
  {
    id: 'usr-001',
    email: 'admin@church.org',
    role: 'SUPER_ADMIN',
    isActive: true,
    isEmailVerified: true,
    profile: {
      id: 'prof-001',
      firstName: 'Admin',
      lastName: 'User',
      phone: '+234-800-000-0001',
      gender: 'MALE',
      avatarUrl: null,
    },
  },
  {
    id: 'usr-002',
    email: 'pastor@church.org',
    role: 'PASTOR',
    isActive: true,
    isEmailVerified: true,
    profile: {
      id: 'prof-002',
      firstName: 'Pastor',
      lastName: 'Arome',
      phone: '+234-800-000-0002',
      gender: 'MALE',
      avatarUrl: null,
    },
  },
  {
    id: 'usr-003',
    email: 'alice@church.org',
    role: 'MEMBER',
    isActive: true,
    isEmailVerified: true,
    profile: {
      id: 'prof-003',
      firstName: 'Alice',
      lastName: 'Johnson',
      phone: '+234-800-000-0003',
      gender: 'FEMALE',
      avatarUrl: null,
    },
  },
];

// ─── Mock Events ──────────────────────────────────────────────────────────

export const mockEvents = [
  {
    id: 'evt-001',
    title: 'Kingdom Come Conference 2025',
    description: 'Annual kingdom conference with teachings from Dr. Arome Osaghae and guest ministers from across the globe.',
    startDate: '2025-01-15T09:00:00Z',
    endDate: '2025-01-18T21:00:00Z',
    location: 'RCN International Centre, Abuja',
    status: 'PUBLISHED',
    imageUrl: '/conference-bg.jpg',
    category: 'CONFERENCE',
  },
  {
    id: 'evt-002',
    title: 'IEC 2025 — International Evangelism Conference',
    description: 'A gathering of believers for evangelism training, prayer and awakening for the nations.',
    startDate: '2025-02-20T08:00:00Z',
    endDate: '2025-02-23T18:00:00Z',
    location: 'National Stadium, Abuja',
    status: 'PUBLISHED',
    imageUrl: '/hero-bg.jpg',
    category: 'CONFERENCE',
  },
  {
    id: 'evt-003',
    title: 'Eaglets Conference 2025',
    description: 'A youth-focused conference for young believers and students.',
    startDate: '2025-03-10T09:00:00Z',
    endDate: '2025-03-12T17:00:00Z',
    location: 'RCN Headquarters, Makurdi',
    status: 'PUBLISHED',
    imageUrl: '/community-bg.jpg',
    category: 'YOUTH',
  },
  {
    id: 'evt-004',
    title: 'Festival of Glory 2025',
    description: 'A night of praise, worship and thanksgiving to God for His faithfulness.',
    startDate: '2025-04-05T18:00:00Z',
    endDate: '2025-04-05T23:00:00Z',
    location: 'Eagle Square, Abuja',
    status: 'PUBLISHED',
    imageUrl: '/conference-bg.jpg',
    category: 'WORSHIP',
  },
  {
    id: 'evt-005',
    title: "Lioness Conference 2025",
    description: 'A powerful gathering for women in ministry and the marketplace.',
    startDate: '2025-05-08T09:00:00Z',
    endDate: '2025-05-10T18:00:00Z',
    location: 'RCN International Centre, Abuja',
    status: 'PUBLISHED',
    imageUrl: '/prayer-bg.jpg',
    category: 'WOMEN',
  },
  {
    id: 'evt-006',
    title: 'Ministers Conference 2025',
    description: 'Exclusive gathering for pastors and ministers in the RCN network.',
    startDate: '2025-06-15T08:00:00Z',
    endDate: '2025-06-17T17:00:00Z',
    location: 'RCN Headquarters, Makurdi',
    status: 'PUBLISHED',
    imageUrl: '/sermon-bg.jpg',
    category: 'MINISTERS',
  },
];

// ─── Mock Announcements ───────────────────────────────────────────────────

export const mockAnnouncements = [
  {
    id: 'ann-001',
    title: 'Weekly Prayer Meeting Update',
    content: 'Our weekly prayer meeting holds every Wednesday from 6:00 PM at the main auditorium. All members are encouraged to attend.',
    publishedAt: '2025-01-10T08:00:00Z',
    priority: 'HIGH',
    category: 'PRAYER',
  },
  {
    id: 'ann-002',
    title: 'New Members Orientation',
    content: 'New members orientation is scheduled for the last Saturday of every month. If you recently joined the church, please register through the E-Church portal.',
    publishedAt: '2025-01-08T08:00:00Z',
    priority: 'MEDIUM',
    category: 'MEMBERSHIP',
  },
  {
    id: 'ann-003',
    title: 'Sunday Service Times',
    content: 'First service: 8:00 AM | Second service: 10:30 AM | Third service: 1:00 PM. Children\'s church runs concurrently with all services.',
    publishedAt: '2025-01-05T08:00:00Z',
    priority: 'LOW',
    category: 'SERVICE',
  },
  {
    id: 'ann-004',
    title: 'RCN App Now Available',
    content: 'Download the RCN mobile application from the Google Play Store or Apple App Store to access sermons, events, and more.',
    publishedAt: '2025-01-03T08:00:00Z',
    priority: 'MEDIUM',
    category: 'TECHNOLOGY',
  },
];

// ─── Mock Sermons ─────────────────────────────────────────────────────────

export const mockSermons = [
  {
    id: 'ser-001',
    title: 'The Mystery of the Kingdom',
    speaker: 'Dr. Arome Osaghae',
    series: 'Kingdom Mysteries',
    preachedAt: '2025-01-05T10:00:00Z',
    duration: 5400,
    audioUrl: '#',
    videoUrl: 'https://www.youtube.com/embed/placeholder',
    thumbnailUrl: '/sermon-bg.jpg',
    description: 'A deep exploration into the hidden treasures of the Kingdom of God.',
    tags: ['Kingdom', 'Apostolic', 'Prayer'],
    status: 'PUBLISHED',
    hasTranscript: true,
  },
  {
    id: 'ser-002',
    title: 'Apostolic Order in the Church',
    speaker: 'Dr. Arome Osaghae',
    series: 'Apostolic Christianity',
    preachedAt: '2024-12-29T10:00:00Z',
    duration: 6300,
    audioUrl: '#',
    videoUrl: 'https://www.youtube.com/embed/placeholder',
    thumbnailUrl: '/hero-bg.jpg',
    description: 'Understanding the importance of apostolic order in the modern church.',
    tags: ['Apostolic', 'Church', 'Order'],
    status: 'PUBLISHED',
    hasTranscript: false,
  },
  {
    id: 'ser-003',
    title: 'Prayer — The Heartbeat of Revival',
    speaker: 'Dr. Arome Osaghae',
    series: 'Prayer and Revival',
    preachedAt: '2024-12-22T10:00:00Z',
    duration: 4800,
    audioUrl: '#',
    videoUrl: 'https://www.youtube.com/embed/placeholder',
    thumbnailUrl: '/prayer-bg.jpg',
    description: 'How fervent prayer births true revival in the earth.',
    tags: ['Prayer', 'Revival', 'Kingdom'],
    status: 'PUBLISHED',
    hasTranscript: true,
  },
  {
    id: 'ser-004',
    title: 'The Coming of the King',
    speaker: 'Dr. Arome Osaghae',
    series: 'End Times',
    preachedAt: '2024-12-15T10:00:00Z',
    duration: 7200,
    audioUrl: '#',
    videoUrl: 'https://www.youtube.com/embed/placeholder',
    thumbnailUrl: '/community-bg.jpg',
    description: 'Preparing the church for the glorious return of Jesus Christ.',
    tags: ['Eschatology', 'Return of Christ', 'Preparation'],
    status: 'PUBLISHED',
    hasTranscript: false,
  },
  {
    id: 'ser-005',
    title: 'Breaking of Bread — The Power of Communion',
    speaker: 'Dr. Arome Osaghae',
    series: 'Sacraments',
    preachedAt: '2024-12-08T10:00:00Z',
    duration: 5100,
    audioUrl: '#',
    videoUrl: 'https://www.youtube.com/embed/placeholder',
    thumbnailUrl: '/sermon-bg.jpg',
    description: 'Rediscovering the profound significance of Holy Communion.',
    tags: ['Communion', 'Sacrament', 'Presence'],
    status: 'PUBLISHED',
    hasTranscript: true,
  },
  {
    id: 'ser-006',
    title: 'The Remnant in the Last Days',
    speaker: 'Dr. Arome Osaghae',
    series: 'End Times',
    preachedAt: '2024-12-01T10:00:00Z',
    duration: 6600,
    audioUrl: '#',
    videoUrl: 'https://www.youtube.com/embed/placeholder',
    thumbnailUrl: '/conference-bg.jpg',
    description: 'God\'s strategy for preserving a holy people in the end times.',
    tags: ['Remnant', 'Holiness', 'End Times'],
    status: 'PUBLISHED',
    hasTranscript: false,
  },
];

// ─── Mock Departments ─────────────────────────────────────────────────────

export const mockDepartments = [
  { id: 'dep-001', name: 'Worship & Arts', description: 'Coordinates all worship and creative arts ministry', isActive: true, memberCount: 45 },
  { id: 'dep-002', name: 'Prayer Ministry', description: 'Organizes corporate and intercessory prayer', isActive: true, memberCount: 62 },
  { id: 'dep-003', name: 'Evangelism', description: 'Outreach and evangelism activities', isActive: true, memberCount: 38 },
  { id: 'dep-004', name: 'Ushering', description: 'Service coordination and hospitality', isActive: true, memberCount: 55 },
  { id: 'dep-005', name: 'Media & Technology', description: 'Audio/visual, broadcasting and digital media', isActive: true, memberCount: 28 },
  { id: 'dep-006', name: 'Children Ministry', description: 'Ministry to children and youth', isActive: true, memberCount: 32 },
];

// ─── Mock Members ─────────────────────────────────────────────────────────

export const mockMembers = Array.from({ length: 24 }, (_, i) => ({
  id: `mem-${String(i + 1).padStart(3, '0')}`,
  memberNumber: `RCN${String(i + 1).padStart(4, '0')}`,
  status: i % 7 === 0 ? 'VISITOR' : i % 11 === 0 ? 'INACTIVE' : 'ACTIVE',
  joinedDate: new Date(Date.now() - Math.random() * 3 * 365 * 24 * 3600 * 1000).toISOString(),
  profile: {
    firstName: ['James', 'Mary', 'John', 'Sarah', 'David', 'Grace', 'Daniel', 'Faith', 'Samuel', 'Joy'][i % 10],
    lastName: ['Okafor', 'Adeyemi', 'Ibrahim', 'Nwankwo', 'Aliyu', 'Okonkwo', 'Bello', 'Chukwu', 'Eze', 'Musa'][i % 10],
    phone: `+234-800-000-${String(i + 10).padStart(4, '0')}`,
    gender: i % 2 === 0 ? 'MALE' : 'FEMALE',
    avatarUrl: null,
  },
  department: mockDepartments[i % mockDepartments.length],
}));

// ─── Mock Donations ───────────────────────────────────────────────────────

export const mockDonations = Array.from({ length: 10 }, (_, i) => ({
  id: `don-${String(i + 1).padStart(3, '0')}`,
  amount: [1000, 2500, 5000, 10000, 25000, 50000][i % 6],
  currency: 'NGN',
  purpose: ['Tithe', 'Offering', 'Building Fund', 'Missions', 'Conference'][i % 5],
  status: 'COMPLETED',
  createdAt: new Date(Date.now() - i * 7 * 24 * 3600 * 1000).toISOString(),
  donor: { name: 'Anonymous' },
}));

// ─── Mock Rosters ─────────────────────────────────────────────────────────

export const mockRosters = [
  {
    id: 'ros-001',
    serviceDate: '2025-01-12T08:00:00Z',
    department: mockDepartments[0],
    workers: mockMembers.slice(0, 5),
    notes: 'Regular Sunday service roster',
  },
  {
    id: 'ros-002',
    serviceDate: '2025-01-19T08:00:00Z',
    department: mockDepartments[1],
    workers: mockMembers.slice(5, 10),
    notes: 'Prayer service roster',
  },
];

// ─── Mock First Timers ────────────────────────────────────────────────────

export const mockFirstTimers = Array.from({ length: 8 }, (_, i) => ({
  id: `ft-${String(i + 1).padStart(3, '0')}`,
  firstName: ['Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'William', 'Sophia', 'James'][i],
  lastName: ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'][i],
  phone: `+234-800-111-${String(i + 100).padStart(4, '0')}`,
  email: `visitor${i + 1}@example.com`,
  address: 'Abuja, Nigeria',
  visitDate: new Date(Date.now() - i * 3 * 24 * 3600 * 1000).toISOString(),
  followUpStatus: ['PENDING', 'CONTACTED', 'COMPLETED'][i % 3],
  notes: 'First time visitor',
}));

// ─── Mock Attendance ──────────────────────────────────────────────────────

export const mockAttendanceSummary = {
  totalSessions: 52,
  avgAttendance: 380,
  weeklyBreakdown: [
    { week: 'Week 1', count: 342 },
    { week: 'Week 2', count: 389 },
    { week: 'Week 3', count: 415 },
    { week: 'Week 4', count: 398 },
    { week: 'Week 5', count: 421 },
    { week: 'Week 6', count: 367 },
  ],
  byDepartment: mockDepartments.map((d, i) => ({
    department: d.name,
    count: 30 + i * 8,
  })),
};

// Helper to simulate API delay
export const delay = (ms = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Paginate mock data
export const paginateMock = (data, page = 1, limit = 12) => {
  const total = data.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const items = data.slice(start, start + limit);
  return {
    success: true,
    data: items,
    pagination: { total, page, limit, totalPages },
  };
};
