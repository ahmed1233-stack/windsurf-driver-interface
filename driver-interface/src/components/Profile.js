import React from 'react';
import { 
  StarIcon,
  TrophyIcon,
  DocumentCheckIcon,
  ClockIcon,
  MapPinIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

function Profile() {
  const achievements = [
    { id: 1, name: "5-Star Driver", description: "Maintained 5-star rating for 3 months", icon: StarIcon, progress: 85 },
    { id: 2, name: "Speed Champion", description: "Completed 500 deliveries on time", icon: TrophyIcon, progress: 60 },
    { id: 3, name: "Perfect Record", description: "Zero cancellations this month", icon: DocumentCheckIcon, progress: 100 }
  ];

  const stats = [
    { id: 1, name: "Total Hours", value: "380h", icon: ClockIcon },
    { id: 2, name: "Areas Covered", value: "12", icon: MapPinIcon },
    { id: 3, name: "Completion Rate", value: "98%", icon: ShieldCheckIcon }
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
          <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-neutral-400">JD</span>
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold text-neutral-900">John Doe</h1>
            <p className="text-neutral-500">Professional Driver since 2022</p>
            <div className="flex items-center justify-center md:justify-start mt-2">
              <StarIcon className="w-5 h-5 text-yellow-400" />
              <span className="ml-1 font-medium">4.8</span>
              <span className="text-neutral-500 text-sm ml-1">(142 reviews)</span>
            </div>
          </div>
          <div className="flex-1"></div>
          <button className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
            Edit Profile
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map(stat => (
          <div key={stat.id} className="bg-white p-4 rounded-xl shadow-sm border border-neutral-200">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary-100 rounded-lg">
                <stat.icon className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <p className="text-neutral-500 text-sm">{stat.name}</p>
                <p className="text-xl font-bold text-neutral-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
        <h2 className="text-lg font-semibold mb-4">Achievements</h2>
        <div className="space-y-6">
          {achievements.map(achievement => (
            <div key={achievement.id} className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <achievement.icon className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-medium text-neutral-900">{achievement.name}</h3>
                  <p className="text-sm text-neutral-500">{achievement.description}</p>
                </div>
              </div>
              <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary-500 rounded-full transition-all duration-500"
                  style={{ width: `${achievement.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Documents and Verification */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
        <h2 className="text-lg font-semibold mb-4">Documents & Verification</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-neutral-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-neutral-900">Driver's License</h3>
                <p className="text-sm text-neutral-500">Expires in 8 months</p>
              </div>
              <ShieldCheckIcon className="w-6 h-6 text-green-500" />
            </div>
          </div>
          <div className="p-4 border border-neutral-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-neutral-900">Vehicle Insurance</h3>
                <p className="text-sm text-neutral-500">Expires in 3 months</p>
              </div>
              <ShieldCheckIcon className="w-6 h-6 text-green-500" />
            </div>
          </div>
          <div className="p-4 border border-neutral-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-neutral-900">Background Check</h3>
                <p className="text-sm text-neutral-500">Last updated 2 months ago</p>
              </div>
              <ShieldCheckIcon className="w-6 h-6 text-green-500" />
            </div>
          </div>
          <div className="p-4 border border-neutral-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-neutral-900">Vehicle Registration</h3>
                <p className="text-sm text-neutral-500">Expires in 5 months</p>
              </div>
              <ShieldCheckIcon className="w-6 h-6 text-green-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
