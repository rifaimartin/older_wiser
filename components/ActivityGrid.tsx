import React from "react";
import ActivityCard from "./ActivityCard";

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
  <div className="mb-16">
    {" "}
    {/* Reduced margin bottom */}
    <h2 className="text-2xl text-center font-bold mb-6 dark:text-white">{title}</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {activities.map((activity, index) => (
        <ActivityCard key={index} {...activity} />
      ))}
    </div>
    <div className="text-right mt-4">
      <button className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 font-semibold transition-colors duration-200">
        See more...
      </button>
    </div>
  </div>
);

export default ActivityGrid;
