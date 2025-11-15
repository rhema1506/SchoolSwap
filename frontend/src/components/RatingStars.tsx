import React from "react";
import { Star } from "lucide-react";

interface RatingStarsProps {
  rating: number;                // current rating (e.g. 3.5)
  onRate?: (value: number) => void; // optional callback for selecting rating
  size?: number;                 // icon size
  readonly?: boolean;            // if true, stars are not clickable
}

const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  onRate,
  size = 24,
  readonly = true,
}) => {
  // Renders 5 stars, some filled, some half-filled, some empty
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= Math.floor(rating);
        const halfFilled = star === Math.ceil(rating) && rating % 1 !== 0;

        return (
          <button
            key={star}
            type="button"
            className={`transition-transform ${
              !readonly ? "hover:scale-110" : ""
            }`}
            onClick={() => {
              if (!readonly && onRate) onRate(star);
            }}
            disabled={readonly}
          >
            <Star
              size={size}
              className={`${
                filled
                  ? "fill-yellow-400 text-yellow-400"
                  : halfFilled
                  ? "fill-yellow-300 text-yellow-400"
                  : "text-gray-400"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
};

export default RatingStars;
