import React from "react";
import { Star, StarHalf } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: number;
}

export function StarRating({
  rating,
  maxRating = 5,
  size = 16,
}: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="flex items-center">
      {[...Array(maxRating)].map((_, i) => {
        if (i < fullStars) {
          return (
            <Star
              key={i}
              className="fill-primary text-primary"
              style={{ width: size, height: size }}
            />
          );
        } else if (i === fullStars && hasHalfStar) {
          return (
            <StarHalf
              key={i}
              className="fill-primary text-primary"
              style={{ width: size, height: size }}
            />
          );
        } else {
          return (
            <Star
              key={i}
              className="text-muted-foreground"
              style={{ width: size, height: size }}
            />
          );
        }
      })}
      <span className="ml-2 text-xs text-muted-foreground">
        ({rating.toFixed(1)})
      </span>
    </div>
  );
}
