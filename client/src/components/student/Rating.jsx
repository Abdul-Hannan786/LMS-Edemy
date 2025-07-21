import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";

const Rating = ({ initiallRating, onRate }) => {
  const [rating, setRating] = useState(initiallRating || 0);

  const handleRating = (value) => {
    setRating(value);
    if (onRate) onRate(value);
  };

  useEffect(() => {
    if (initiallRating) {
      setRating(initiallRating);
    }
  }, [initiallRating]);

  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }, (_, index) => {
        const starValue = index + 1;
        const isActive = starValue <= rating;

        return (
          <span
            onClick={() => handleRating(starValue)}
            key={index}
            className={`cursor-pointer transition-colors ${
              isActive ? "text-yellow-500" : "text-gray-400"
            }`}
          >
            <Star size={24} fill={isActive ? "currentColor" : "none"} />
          </span>
        );
      })}
    </div>
  );
};

export default Rating;
