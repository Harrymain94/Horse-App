import { useState } from "react";
import type { Horse, UpdateHorseRequest } from "../../types/horse";
import "./HorseForm.css";

interface HorseFormProps {
  initialHorse: Horse;
  onSave: (data: UpdateHorseRequest) => Promise<void>;
  onCancel: () => void;
}

export function HorseForm({ initialHorse, onSave, onCancel }: HorseFormProps) {
  const [name, setName] = useState(initialHorse.name);
  const [favouriteFood, setFavouriteFood] = useState(
    initialHorse.profile?.favouriteFood ?? ""
  );
  const [height, setHeight] = useState(
    initialHorse.profile?.physical?.height ?? ""
  );
  const [weight, setWeight] = useState(
    initialHorse.profile?.physical?.weight ?? ""
  );

  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim()) {
      setError("Name is required");
      return;
    }

    await onSave({
      name,
      profile: {
        favouriteFood,
        physical: {
          height: Number(height) || undefined,
          weight: Number(weight) || undefined,
        },
      },
    });
  }

  return (
    <form className="horse-form" onSubmit={handleSubmit}>
      <h2>Edit Horse</h2>

      {error && <div className="form-error">{error}</div>}

      <label>
        Name
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </label>

      <label>
        Favourite Food
        <input
          value={favouriteFood}
          onChange={(e) => setFavouriteFood(e.target.value)}
        />
      </label>

      <label>
        Height
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
      </label>

      <label>
        Weight
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </label>

      <div className="horse-form__actions">
        <button type="submit" className="button">
          Save
        </button>

        <button type="button" className="button button--secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}