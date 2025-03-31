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

// Get name initials for avatar fallback
function getNameInitials(name: string) {
  const nameParts = name.split(' ');
  if (nameParts.length >= 2) {
    return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
}

// Get role badge color
function getRoleBadgeColor(role?: string) {
  switch (role) {
    case "admin":
      return "bg-red-500";
    case "moderator":
      return "bg-yellow-500";
    default:
      return "bg-blue-500";
  }
}

export default function ProfilePage({ 
  searchParams 
}: { 
  searchParams: { username?: string; viewMode?: string } 
}) {
  // This would normally come from authentication
  const isOwnProfile = searchParams.viewMode !== 'visitor';
  const userDetails = mockUser;

  return (
    <div className="w-full py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-3 bg-white rounded-lg shadow overflow-hidden w-full">
          {/* Header */}
          <div className="flex flex-col items-center text-center p-6 border-b w-full">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100">
              {userDetails.avatar ? (
                <img 
                  src={userDetails.avatar} 
                  alt={userDetails.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-500 text-xl font-semibold">
                  {getNameInitials(userDetails.name)}
                </div>
              )}
            </div>
            <h2 className="mt-4 text-xl font-bold">{userDetails.name}</h2>
            <p className="text-sm text-gray-500">@{userDetails.username}</p>
            {userDetails.role && (
              <span className={`mt-2 px-2 py-1 text-xs rounded-full text-white ${getRoleBadgeColor(userDetails.role)}`}>
                {userDetails.role}
              </span>
            )}
            {userDetails.speciality && (
              <span className="mt-2 px-2 py-1 text-xs rounded-full border border-gray-300">
                {userDetails.speciality}
              </span>
            )}
          </div>
          
          {/* User Info */}
          <div className="w-full py-6">
            <div className="space-y-4 flex flex-col items-center text-center">
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                <span className="text-sm">Member since {userDetails.createdAt.toLocaleDateString()}</span>
              </div>
              
              {isOwnProfile && userDetails.email && (
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                  <span className="text-sm">{userDetails.email}</span>
                </div>
              )}
              
              {userDetails.whatsAppNumber && (
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  <span className="text-sm">{userDetails.whatsAppNumber}</span>
                  {userDetails.whatsappNumberVerified && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="m9 12 2 2 4-4"></path></svg>
                  )}
                </div>
              )}
              
              {userDetails.city && (
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  <span className="text-sm">{userDetails.city}</span>
                </div>
              )}
              
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>
                <span className="text-sm">{userDetails.totalPoints} points</span>
              </div>
              
              {userDetails.idVerified && (
                <div className="flex items-center gap-2 text-green-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="m9 12 2 2 4-4"></path></svg>
                  <span className="text-sm">Verified Profile</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Footer */}
          <div className="p-6 border-t">
            <Link 
              href="/dashboard"
              className="block w-full px-4 py-2 text-center bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Go to Dashboard
            </Link>
            
            {isOwnProfile && !userDetails.profileCompleted && (
              <div className="mt-2 text-center text-sm p-2 border border-yellow-300 rounded bg-yellow-50 text-yellow-700">
                Your profile is incomplete
              </div>
            )}
          </div>
        </div>
        
        <div className="lg:col-span-9 bg-white rounded-lg shadow overflow-hidden">
          {/* Profile Edit Form - Only show for own profile */}
          {isOwnProfile ? (
            <>
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold">Profile Details</h2>
                <p className="text-sm text-gray-500">
                  Update your personal information
                </p>
              </div>
              
              <div className="p-6">
                <form action="#" method="POST" className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-sm font-medium">Full Name</label>
                      <input 
                        id="name" 
                        name="name"
                        defaultValue={userDetails.name}
                        placeholder="John Doe"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                      <p className="text-sm text-gray-500">
                        Your full name will be displayed on your profile.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="username" className="block text-sm font-medium">Username</label>
                      <input 
                        id="username" 
                        name="username"
                        defaultValue={userDetails.username}
                        placeholder="username"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                      <p className="text-sm text-gray-500">
                        This is your public username. It can only contain letters, numbers, underscores, and hyphens.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="whatsAppNumber" className="block text-sm font-medium">WhatsApp Number</label>
                      <input 
                        id="whatsAppNumber" 
                        name="whatsAppNumber"
                        defaultValue={userDetails.whatsAppNumber}
                        placeholder="+263 123 456 789"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <p className="text-sm text-gray-500">
                        Your WhatsApp number for contact purposes.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="city" className="block text-sm font-medium">City</label>
                      <input 
                        id="city" 
                        name="city"
                        defaultValue={userDetails.city}
                        placeholder="Harare"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <p className="text-sm text-gray-500">
                        Your current city of residence.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="avatar" className="block text-sm font-medium">Profile Picture URL</label>
                      <input 
                        id="avatar" 
                        name="avatar"
                        defaultValue={userDetails.avatar}
                        placeholder="https://example.com/avatar.jpg"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <p className="text-sm text-gray-500">
                        Enter a URL for your profile picture.
                      </p>
                    </div>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Update Profile
                  </button>
                </form>
              </div>
            </>
          ) : (
            <>
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold">About {userDetails.name}</h2>
              </div>
              <div className="p-6">
                <div className="text-center space-y-4">
                  <p>You&apos;re viewing {userDetails.name}&apos;s public profile.</p>
                  
                  <div>
                    <p className="mb-4">Sign in to create your own profile!</p>
                    <Link 
                      href="/auth/sign-in"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Sign In
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Toggle between own profile and visitor view for demo purposes */}
      <div className="mt-8 text-center">
        <Link 
          href={isOwnProfile ? "?viewMode=visitor" : "?viewMode=owner"} 
          className="text-blue-600 hover:underline"
        >
          {isOwnProfile ? "View as visitor" : "View as profile owner"}
        </Link>
      </div>
    </div>
  );
}
