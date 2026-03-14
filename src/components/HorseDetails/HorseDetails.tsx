import { useState, useEffect } from "react";
import { HorseForm } from "../HorseForm/HorseForm";
import { horseApi } from "../../api/horses";
import { classifyAnimal } from "../../utils/classifyAnimal";
import type { Horse } from "../../types/horse";
import "./HorseDetails.css";

interface HorseDetailsProps {
  horse: Horse | null;
  onHorseUpdated: (horse: Horse) => void;  
}

function display(value: unknown): string {
  if (value === null || value === undefined || value === "") {
    return "-";
  }
  return String(value);
}

export function HorseDetails({ horse, onHorseUpdated }: HorseDetailsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const isNewHorse = !horse?.id;

  useEffect(() => {
    setIsEditing(false);
  }, [horse?.id]);

  if (!horse) {
    return <div className="horse-details">Select a horse to view details</div>;
  }

  if (isEditing || isNewHorse) {
    return (
      <HorseForm
        initialHorse={horse}
        onCancel={() => setIsEditing(false)}
        onSave={async (data) => {
          let result;

          if (!horse.id) {
            const created = await horseApi.createHorse(data);
            result = await horseApi.getHorse(created);
          } else {
            result = await horseApi.updateHorse(horse.id, data);
          }
          onHorseUpdated(result);
          setIsEditing(false);
        }}
      />
    );
  }

  const { name, profile } = horse;

  return (
    <div className="horse-details">
      <div className="horse-details__head">
        <h2>{name}</h2>
        <button className="button" onClick={() => setIsEditing(true)}>
          Edit
        </button>
      </div>

      <div className="horse-details__row">
        <span className="horse-details__row-label">Type:</span>
        <span className="horse-details__row-value">{classifyAnimal(profile?.physical?.weight)}</span>
      </div>

      <div className="horse-details__row">
        <span className="horse-details__row-label">Favourite Food:</span>
        <span className="horse-details__row-value">{display(profile?.favouriteFood)}</span>
      </div>

      <div className="horse-details__row">
        <span className="horse-details__row-label">Height:</span>
        <span className="horse-details__row-value">{display(profile?.physical?.height)}</span>
      </div>

      <div className="horse-details__row">
        <span className="horse-details__row-label">Weight:</span>
        <span className="horse-details__row-value">{display(profile?.physical?.weight)}</span>
      </div>
    </div>
  );
}