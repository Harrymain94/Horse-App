import { useState, useEffect } from 'react';
import { HorseList } from './components/HorseList/HorseList';
import { HorseDetails } from './components/HorseDetails/HorseDetails';
import { horseApi } from "./api/horses";
import type { Horse } from "./types/horse";

function App() {
  const [selectedHorseId, setSelectedHorseId] = useState<number | null>(null);
  const [selectedHorse, setSelectedHorse] = useState<Horse | null>(null);

  useEffect(() => {
    if (!selectedHorseId) return;

    horseApi.getHorse(selectedHorseId).then(setSelectedHorse);
  }, [selectedHorseId]);

  return (
    <>
      <section id="center">
        <h1 className='text-center'>Harry's Horses</h1>
        <div className="horses">
          <HorseList onSelectHorse={setSelectedHorseId} />
          <HorseDetails horse={selectedHorse} />
        </div>
      </section>
    </>
  )
}

export default App
