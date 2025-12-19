const RatingStars = ({ value }: { value: number }) => {
  return (
    <div className="flex gap-1">
      {[1,2,3,4,5].map(n => (
        <span key={n}>
          {n <= value ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
};

export default RatingStars;
