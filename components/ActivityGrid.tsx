import React from 'react';
import ActivityCard from './ActivityCard';

interface Activity {
  title: string;
  image: string;
  duration: string;
  category: string;
}

interface ActivityGridProps {
  title: string;
  activities: Activity[];
}

const ActivityGrid: React.FC<ActivityGridProps> = ({ title, activities }) => (
  <div className="my-8">
    <h2 className="text-2xl font-bold mb-4">{title}</h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {activities.map((activity, index) => (
        <ActivityCard key={index} {...activity} />
      ))}
    </div>
  </div>
);

export default ActivityGrid;