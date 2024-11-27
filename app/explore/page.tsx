'use client';
import { useState, useEffect } from 'react';

import { UserActivityGrid } from '@/components/UserActivityGrid';
import { API_BASE_URL } from '@/constants';

interface Activity {
  id: string;
  title: string;
  image: string;
  duration: string;
  category: string;
  createdBy: {
    name: string;
    imageUrl?: string;
  };
  likes: number;
  description: string;
  createdAt: string;
}

export default function ExplorePage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchUserCreatedActivities();
  }, []);

  const fetchUserCreatedActivities = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/activities/user-created`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to fetch activities');

      const { data } = await response.json();
      setActivities(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Get unique categories from activities
  const categories = ['all', ...Array.from(new Set(activities.map(activity => activity.category)))];

  // Filter activities based on category and search query
  const filteredActivities = activities.filter(activity => {
    const matchesCategory = selectedCategory === 'all' || activity.category === selectedCategory;
    const matchesSearch = activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         activity.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-scree">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
            Community Activities
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Discover activities shared by our community members
          </p>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  selectedCategory === category
                    ? "bg-[#6A8270] text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="mb-6 text-center">
          <input
            type="text"
            placeholder="Search activities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6A8270] dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>

        {/* Activities Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6A8270]" />
          </div>
        ) : (
          <UserActivityGrid activities={filteredActivities} />
        )}
      </div>
    </div>
  );
}