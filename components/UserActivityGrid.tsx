"use client";
import Image from "next/image";
import { API_BASE_URL } from "@/constants";
import Link from "next/link";

interface UserActivity {
  id: string;
  title: string;
  image: string;
  duration: string;
  category: string;
  createdBy: {
    name: string;
    imageUrl?: string;
  };
  likes?: number;
  description?: string;
}

interface UserActivityGridProps {
  activities: UserActivity[];
}

const UserActivityCard = ({ activity }: { activity: UserActivity }) => {
  return (
    <div className="rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm hover:shadow-md hover:drop-shadow-2xl transition-all duration-300 cursor-pointer hover:scale-105">
      <Link href={`/activities/${activity.id}`}>
        <div className="relative aspect-[4/3]">
          <Image
            src={`${API_BASE_URL}${activity.image}`} // Tambahkan API_BASE_URL
            alt={activity.title}
            fill
            className="object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <span className="inline-block px-2 py-1 bg-[#6A8270] text-white text-xs rounded-full">
              {activity.category}
            </span>
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {activity.title}
          </h3>

          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <span>{activity.duration}</span>
            {activity.likes !== undefined && (
              <span className="flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                {activity.likes}
              </span>
            )}
          </div>

          <div className="mt-4 flex items-center">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
              {activity.createdBy.imageUrl ? (
                <Image
                  src={`${API_BASE_URL}${activity.createdBy.imageUrl}`}
                  alt={activity.createdBy.name}
                  width={32}
                  height={32}
                  className="object-cover"
                />
              ) : (
                <span className="text-sm font-medium text-gray-600">
                  {activity.createdBy.name.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
              {activity.createdBy.name}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export const UserActivityGrid = ({ activities }: UserActivityGridProps) => {
  if (!activities?.length) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400">
          No activities found
        </h3>
        <p className="mt-2 text-sm text-gray-400 dark:text-gray-500">
          Be the first to share an activity!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {activities.map((activity) => (
        <UserActivityCard key={activity.id} activity={activity} />
      ))}
    </div>
  );
};
