import React from 'react';

interface ReviewCardProps {
  name: string;
  initialLetter: string;
  rating: number;
  daysAgo: number;
  avatarUrl?: string;
  titleComment: string;
  comment: string;
 }
 
 const ReviewCard: React.FC<ReviewCardProps> = ({ 
  name, 
  initialLetter,
  rating, 
  daysAgo, 
  avatarUrl,
  titleComment,
  comment 
 }) => {
  return (
    <div className="bg-[#F5F4EB] rounded-2xl p-6">
      {/* Stars */}
      <div className="flex gap-1 mb-3">
        {[1,2,3,4,5].map((star) => (
          <svg 
            key={star}
            className={`w-5 h-5 ${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
        ))}
      </div>
 
      {/* Name, Avatar and Days */} 
      <div className="flex items-center gap-3 mb-2">
        <div className="flex items-center gap-2">
          {avatarUrl ? (
            <img src={avatarUrl} alt={name} className="w-8 h-8 rounded-full" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-white font-medium">{initialLetter}</span>
            </div>
          )}
          <h3 className="font-bold text-lg">{name}</h3>
        </div>
        <p className="text-gray-600 text-sm">{daysAgo} days ago</p>
      </div>
 
      {/* Title Comment & Comment */}
      <h4 className="font-semibold text-base mb-1">{titleComment}</h4>
      <p className="text-gray-800 leading-relaxed">{comment}</p>
    </div>
  );
 };
 
 export default ReviewCard;