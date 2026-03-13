import { useEffect, useState } from "react";
import type { Horse } from "../../types/horse";
import { horseApi } from "../../api/horses";
import "./HorseList.css";

const PAGE_SIZE = 10;

export function HorseList() {
  const [horses, setHorses] = useState<Horse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);

  useEffect(() => {
    horseApi.getHorses()
      .then((data) => setHorses(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const start = page * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const visibleHorses = horses.slice(start, end);

  const hasNextPage = end < horses.length;
  const hasPrevPage = page > 0;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="horse-list">
      <h2 className="horse-list__title">Horses</h2>
			<div className="horse-list__items">
				{visibleHorses.map((horse) => (
          <div key={horse.id} className="horse-list__item">
            {horse.name}
          </div>
        ))}
			</div>
			{/* In a production app, we would want to fetch only the horses for the current page instead of fetching all and slicing on the client */}
      <div className="horse-list__pagination">
				<button disabled={!hasPrevPage} onClick={() => setPage((p) => p - 1)}>
					Previous
				</button>
				<span>Page {page + 1} / {Math.ceil(horses.length / PAGE_SIZE)}</span>
				<button disabled={!hasNextPage} onClick={() => setPage((p) => p + 1)}>
					Next
				</button>
			</div>
    </div>
  );
}