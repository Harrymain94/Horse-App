import { useState, useEffect } from 'react';
import { HorseList } from './components/HorseList/HorseList';
import { HorseDetails } from './components/HorseDetails/HorseDetails';
import { horseApi } from "./api/horses";
import type { Horse } from "./types/horse";
import { Pagination } from './components/Pagination/Pagination';

const PAGE_SIZE = 10;

function App() {
  const [horses, setHorses] = useState<Horse[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedHorseId, setSelectedHorseId] = useState<number | null>(null);
  const [selectedHorse, setSelectedHorse] = useState<Horse | null>(null);

  useEffect(() => {
    horseApi.getHorses()
      .then((data) => setHorses(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!selectedHorseId) return;
    horseApi.getHorse(selectedHorseId).then(setSelectedHorse);
  }, [selectedHorseId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  {/* In a production app, we would want to fetch only the horses for the current page instead of fetching all and slicing on the client */}
  const start = page * PAGE_SIZE;
  const visibleHorses = horses.slice(start, start + PAGE_SIZE);

  return (
    <>
      <section id="center">
        <h1 className='text-center'>Harry's Horses</h1>
        <div className="horses">
          <HorseList horses={visibleHorses} onSelectHorse={setSelectedHorseId} />
          <HorseDetails horse={selectedHorse} />
        </div>
        <Pagination
          page={page}
          totalItems={horses.length}
          pageSize={PAGE_SIZE}
          onPageChange={setPage}
        />
      </section>
    </>
  )
}

export default App
