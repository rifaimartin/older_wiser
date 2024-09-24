import React from 'react';
import Image from 'next/image';

interface ActivityCardProps {
  title: string;
  image: string;
  duration: string;
  category: string;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ title, image, duration, category }) => (
  <div className="relative rounded-lg overflow-hidden shadow-md">
    <Image
      src={image}
      alt={title}
      width={300}
      height={200}
      layout="responsive"
      className="object-cover"
    />
    <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-80 p-2">
      <h3 className="text-sm font-semibold">{title}</h3>
      <p className="text-xs text-gray-600">{duration}</p>
    </div>
  </div>
);

export default ActivityCard;