import React from "react";
import Image from "next/image";

interface ActivityCardProps {
  title: string;
  image: string;
  duration: string;
  category: string;
}

// ActivityCard.tsx
// ActivityCard.tsx
const ActivityCard: React.FC<ActivityCardProps> = ({
  title,
  image,
  duration,
  category,
}) => (
  <div className="relative h-[320px] w-full filter drop-shadow-xl hover:drop-shadow-2xl transition-all duration-300 cursor-pointer hover:scale-105">
  <div className="absolute inset-0 bg-white rounded-[30px] overflow-hidden shadow-[rgba(0,_0,_0,_0.15)_0px_8px_24px]">
    {/* Crown icon */}
    <div className="absolute top-3 left-3 z-20">
      <div className="bg-yellow-400 rounded-full w-6 h-6 flex items-center justify-center">
        <span className="text-white text-sm font-bold">👑</span>
      </div>  
    </div>
 
    {/* Image */}
    <Image
      src={image}
      alt={title} 
      fill
      className="object-cover"
    />
 
    {/* Label */}
    <div className="absolute bottom-10 left-0 right-0 bg-[#6A8270] p-2">
      <div className="max-w-[200px] mx-auto text-left">
        <h3 className="text-white font-medium text-lg">{title}</h3>
        <p className="text-white/90 font-medium">Time: {duration}</p>
      </div>
    </div>
  </div>
 </div>
);

export default ActivityCard;
