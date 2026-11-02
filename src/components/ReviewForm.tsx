import { useState } from "react";
import { useAppContext } from "../context/AppContext";

// rating is stored as 1-10 (so 7 = 3.5 stars), shown as 5 stars with half steps
const StarRating = ({
  value,
  onChange,
}: {
  value: number | null;
  onChange: (value: number | null) => void;
}) => {
  const [hover, setHover] = useState<number | null>(null);
  const shown = hover ?? value ?? 0;

  return (
    <div className="star-rating" onMouseLeave={() => setHover(null)}>
      {[1, 2, 3, 4, 5].map((star) => {
        const left = star * 2 - 1;
        const right = star * 2;
        const fill = Math.max(0, Math.min(2, shown - (star - 1) * 2));
        return (
          <span className="star" key={star}>
            <span className="star-base">★</span>
            <span className="star-fill" style={{ width: `${fill * 50}%` }}>
              ★
            </span>
            <button
              type="button"
              className="star-half star-half-left"
              aria-label={`${star - 0.5} stars`}
              onMouseEnter={() => setHover(left)}
              onClick={() => onChange(value === left ? null : left)}
            />
            <button
              type="button"
              className="star-half star-half-right"
              aria-label={`${star} stars`}
              onMouseEnter={() => setHover(right)}
              onClick={() => onChange(value === right ? null : right)}
            />
          </span>
        );
      })}
      {value !== null && <span className="star-value">{value / 2}</span>}
    </div>
  );
};

const ReviewForm = ({ movieId }: { movieId: number }) => {
  const { getReview, setReview } = useAppContext();
  const review = getReview(movieId);
  const [opinion, setOpinion] = useState(review.opinion);
  const [saved, setSaved] = useState(false);

  return (
    <div className="review-form">
      <label className="review-watched">
        <input
          type="checkbox"
          checked={review.watched}
          onChange={(e) => setReview(movieId, { watched: e.target.checked })}
        />
        Watched
      </label>

      <StarRating
        value={review.rating}
        onChange={(rating) => setReview(movieId, { rating })}
      />

      <textarea
        placeholder="What did you think?"
        value={opinion}
        maxLength={500}
        onChange={(e) => {
          setOpinion(e.target.value);
          setSaved(false);
        }}
      />

      <div className="review-actions">
        <button
          type="button"
          className="btn-secondary"
          onClick={() => {
            setReview(movieId, { opinion: opinion.trim() });
            setSaved(true);
          }}
        >
          Save opinion
        </button>
        {saved && <span className="review-saved">Saved ✓</span>}
      </div>
    </div>
  );
};

export default ReviewForm;