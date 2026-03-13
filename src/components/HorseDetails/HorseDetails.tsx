import type { Horse } from "../../types/horse";
import  { classifyAnimal } from "../../utils/classifyAnimal";
import "./HorseDetails.css";

interface HorseDetailsProps {
  horse: Horse | null;
}

function display(value: unknown): string {
  if (value === null || value === undefined || value === "") {
    return "-";
  }
  return String(value);
}

export function HorseDetails({ horse }: HorseDetailsProps) {
  if (!horse) {
    return <div className="horse-details">Select a horse to view details</div>;
  }

  const { name, profile } = horse;

  return (
    <div className="horse-details">
      <h2>{name}</h2>

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