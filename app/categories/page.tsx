// app/categories/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';

interface Activity {
  id: string;
  title: string;
  image: string;
  duration: string;
  category: string;
  isVip?: boolean;
}

export default function CategoriesPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('Art & Crafts');
  const [isLoading, setIsLoading] = useState(true);

  // Categories yang sesuai dengan format di database
  const categories = [
    { id: 'health', display: 'HEALTH & WELLNESS', value: 'Health & Wellness' },
    { id: 'cooking', display: 'COOKING', value: 'Cooking' },
    { id: 'art', display: 'ART & CRAFTS', value: 'Art & Crafts' }
  ];

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/activities/user-created`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to fetch activities');

      const { data } = await response.json();
      console.log('Fetched activities:', data); // Debug log
      setActivities(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter activities berdasarkan kategori yang dipilih
  const filteredActivities = activities.filter(activity => {
    console.log('Comparing:', {
      activityCategory: activity.category,
      selectedCategory: selectedCategory,
      isMatch: activity.category.toLowerCase() === selectedCategory.toLowerCase()
    });
    return activity.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-center text-2xl dark:text-white font-semibold mb-8">
        Activity Categories
      </h1>

      {/* Category Tabs */}
      <div className="flex justify-center gap-4 mb-8">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.value)}
            className={`px-6 py-2 rounded-full text-sm transition-all duration-200 
              ${selectedCategory === category.value 
                ? 'bg-[#6A8270] text-white' 
                : 'bg-white border border-[#6A8270] text-[#6A8270] hover:bg-gray-50'}`}
          >
            {category.display}
          </button>
        ))}
      </div>

      {/* Filter Section */}
      <div className="flex justify-end mb-6 ">
        <button className="flex items-center gap-2 text-sm text-gray-600 dark:text-white">
          <svg 
            className="w-5 h-5" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filter by: Single
        </button>
      </div>

      {/* Category Title */}
      <h2 className="text-xl font-semibold dark:text-white mb-6">{selectedCategory}</h2>

      {/* Activities Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6A8270]" />
        </div>
      ) : filteredActivities.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No activities found in this category
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredActivities.map(activity => (
            <Link 
              href={`/activity/${activity.id}`} 
              key={activity.id}
              className="group relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="aspect-square relative">
                <Image
                  src={`${API_BASE_URL}${activity.image}`}
                  alt={activity.title}
                  fill
                  className="object-cover"
                />
                
                {/* VIP Badge if needed */}
                {activity.isVip && (
                  <div className="absolute top-2 right-2">
                    <svg className="w-6 h-6 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                )}
              </div>
              
              {/* Activity Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-[#6A8270] text-white p-4">
                <h3 className="text-lg font-medium truncate">{activity.title}</h3>
                <p className="text-sm opacity-90">Time: {activity.duration}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}