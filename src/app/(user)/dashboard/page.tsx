import Link from "next/link";

// Mock user data
const mockUser = {
  id: "user123",
  name: "John Doe",
  email: "john@zimdevelopers.com",
  username: "johndoe",
  avatar: "https://placekitten.com/200/200",
  whatsAppNumber: "+263 123 456 789",
  city: "Harare",
  speciality: "Frontend Developer",
  totalPoints: 1250,
  role: "developer",
  createdAt: new Date("2023-01-15"),
  idVerified: true,
  whatsappNumberVerified: true,
  profileCompleted: false
};

// Mock events data
const upcomingEvents = [
  {
    id: "event1",
    title: "JavaScript Meetup",
    date: new Date("2023-12-15T18:00:00"),
    location: "Tech Hub Harare",
    attendees: 56
  },
  {
    id: "event2",
    title: "Fullstack Workshop",
    date: new Date("2023-12-22T09:00:00"),
    location: "Innovation Space",
    attendees: 32
  }
];

// Mock projects data
const recentProjects = [
  {
    id: "proj1",
    title: "E-commerce Platform",
    description: "A marketplace for local artisans",
    technologies: ["Next.js", "Node.js", "Postgres"],
    collaborators: 4,
    lastUpdated: new Date("2023-12-01")
  },
  {
    id: "proj2",
    title: "Health Tracking App",
    description: "Mobile app for tracking medication and appointments",
    technologies: ["React Native", "Firebase"],
    collaborators: 2,
    lastUpdated: new Date("2023-11-25")
  }
];

// Mock forum data
const recentDiscussions = [
  {
    id: "disc1",
    title: "Best practices for state management in React",
    author: "sarahcoder",
    replies: 23,
    lastActivity: new Date("2023-12-05")
  },
  {
    id: "disc2",
    title: "Getting started with open source contributions",
    author: "newdev",
    replies: 17,
    lastActivity: new Date("2023-12-03")
  },
  {
    id: "disc3",
    title: "Job market for developers in Zimbabwe",
    author: "techrecruiter",
    replies: 42,
    lastActivity: new Date("2023-12-07")
  }
];

// Format date to readable string
function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(date);
}

// Format time to readable string
function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('en-GB', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }).format(date);
}

export default function DashboardPage() {
  const user = mockUser;

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user.name}</p>
        </div>
        <div className="flex gap-3">
          <Link 
            href="/profile" 
            className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            View Profile
          </Link>
          <button 
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Create New Project
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-500 text-sm mb-1">Total Points</p>
          <p className="text-2xl font-bold">{user.totalPoints}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-500 text-sm mb-1">Community Rank</p>
          <p className="text-2xl font-bold">#42</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-500 text-sm mb-1">Contributions</p>
          <p className="text-2xl font-bold">17</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-500 text-sm mb-1">Projects</p>
          <p className="text-2xl font-bold">3</p>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upcoming Events */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Upcoming Events</h2>
          </div>
          <div className="p-4">
            {upcomingEvents.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No upcoming events</p>
            ) : (
              <div className="space-y-4">
                {upcomingEvents.map(event => (
                  <div key={event.id} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                    <h3 className="font-medium">{event.title}</h3>
                    <div className="text-sm text-gray-500 mt-1">
                      <p className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line></svg>
                        {formatDate(event.date)} at {formatTime(event.date)}
                      </p>
                      <p className="flex items-center gap-1 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                        {event.location}
                      </p>
                      <p className="flex items-center gap-1 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                        {event.attendees} attendees
                      </p>
                    </div>
                    <div className="mt-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        RSVP
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-4 text-center">
              <Link href="/events" className="text-blue-600 hover:underline text-sm">
                View all events
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Projects */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Your Projects</h2>
          </div>
          <div className="p-4">
            {recentProjects.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No projects yet</p>
            ) : (
              <div className="space-y-4">
                {recentProjects.map(project => (
                  <div key={project.id} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                    <h3 className="font-medium">{project.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{project.description}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {project.technologies.map(tech => (
                        <span key={tech} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-xs text-gray-500">
                        Updated {formatDate(project.lastUpdated)}
                      </span>
                      <span className="text-xs text-gray-500">
                        {project.collaborators} collaborators
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-4 text-center">
              <Link href="/projects" className="text-blue-600 hover:underline text-sm">
                View all projects
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Forum Activity */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Community Forum</h2>
          </div>
          <div className="p-4">
            {recentDiscussions.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No recent discussions</p>
            ) : (
              <div className="space-y-4">
                {recentDiscussions.map(discussion => (
                  <div key={discussion.id} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                    <h3 className="font-medium">{discussion.title}</h3>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-gray-500">
                        Started by @{discussion.author}
                      </span>
                      <span className="text-xs text-gray-500">
                        {discussion.replies} replies
                      </span>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      Last activity: {formatDate(discussion.lastActivity)}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-4 text-center">
              <Link href="/forum" className="text-blue-600 hover:underline text-sm">
                Visit forum
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Quick Links</h2>
        </div>
        <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link 
            href="/projects/new" 
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center"
          >
            <div className="flex justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            </div>
            <span className="text-sm font-medium">New Project</span>
          </Link>
          
          <Link 
            href="/events/calendar" 
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center"
          >
            <div className="flex justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line></svg>
            </div>
            <span className="text-sm font-medium">Events Calendar</span>
          </Link>
          
          <Link 
            href="/mentorship" 
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center"
          >
            <div className="flex justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 14c-1.37 2.63-3.28 4.46-5.73 5.63"></path><path d="M19.38 13.88A15.24 15.24 0 0 0 21 8.38a15.24 15.24 0 0 0-2.38-2.75"></path><path d="M10.24 20.72 8.4 16.56a5.5 5.5 0 0 1-1.4-3.7v-2"></path><path d="M13.76 7.23A5.5 5.5 0 0 0 12 7a5.5 5.5 0 0 0-5 7.92"></path><path d="M3 3 21 21"></path></svg>
            </div>
            <span className="text-sm font-medium">Find Mentor</span>
          </Link>
          
          <Link 
            href="/jobs" 
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center"
          >
            <div className="flex justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
            </div>
            <span className="text-sm font-medium">Job Board</span>
          </Link>
        </div>
      </div>
      
      {/* Learning Section */}
      <div className="mt-8 bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Continue Learning</h2>
        </div>
        <div className="p-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="flex gap-4 items-center">
              <div className="bg-blue-100 rounded-full p-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
              </div>
              <div>
                <h3 className="font-medium">Web Development Track</h3>
                <p className="text-sm text-gray-600">Continue with &quot;Advanced React Patterns&quot; (75% complete)</p>
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "75%" }}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <Link 
                href="/learning/react/advanced-patterns" 
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm"
              >
                Continue Learning
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 