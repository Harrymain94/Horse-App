import { useEffect, useState } from "react";
import type { Horse } from "../../types/horse";
import { horseApi } from "../../api/horses";
import "./HorseList.css";

export function HorseList() {
  const [horses, setHorses] = useState<Horse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    horseApi.getHorses()
      .then((data) => setHorses(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {horses.slice(0, 10).map((horse) => (
        <div key={horse.id} id={`horse-${horse.id}`}>
          {horse.name}
        </div>
      ))}
    </div>
  );
}