import { useState } from "react";
import type { Horse, UpdateHorseRequest, CreateHorseRequest } from "../../types/horse";
import "./HorseForm.css";

interface HorseFormProps {
  initialHorse: Horse;
  onSave: (data: UpdateHorseRequest | CreateHorseRequest) => Promise<void>;
  onCancel: () => void;
}

export function HorseForm({ initialHorse, onSave, onCancel }: HorseFormProps) {

  const [formData, setFormData] = useState({
    name: initialHorse.name || "",
    weight: initialHorse.profile?.physical?.weight ?? undefined,
    height: initialHorse.profile?.physical?.height ?? undefined,
    favouriteFood: initialHorse.profile?.favouriteFood || ""
  });

  const [errors, setErrors] = useState<{
    name?: string,
    weight?: string,
    height?: string
  }>({});

  const isCreateMode = !initialHorse.id;

  const validate = () => {
    const newErrors: {
      name?: string,
      weight?: string,
      height?: string
    } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    const payload: UpdateHorseRequest = {
      name: formData.name,
      profile: {
        favouriteFood: formData.favouriteFood,
        physical: {
          height: formData.height,
          weight: formData.weight
        }
      }
    };
    
    onSave(payload);
  };

  return (
    <form className="horse-form" onSubmit={handleSubmit}>
      <h2>{isCreateMode ? "Add Horse" : "Edit Horse"}</h2>

      <div className="form-group">
        <label>Name</label>
        <input
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
        />
        {errors.name && <div className="form-error">{errors.name}</div>}
      </div>

      <div className="form-group">
        <label>Favourite Food</label>
        <input
          value={formData.favouriteFood}
          onChange={(e) => setFormData({ ...formData, favouriteFood: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>Height</label>
        <input
          type="number"
          value={formData.height}
          onChange={(e) =>
            setFormData({
              ...formData,
              height: e.target.value === "" ? undefined : Number(e.target.value)
            })
          }
        />
        {errors.height && <div className="form-error">{errors.height}</div>}
      </div>

      <div className="form-group">
        <label>Weight</label>
        <input
          type="number"
          value={formData.weight}
          onChange={(e) =>
            setFormData({
              ...formData,
              weight: e.target.value === "" ? undefined : Number(e.target.value)
            })
          }
        />
        {errors.weight && <div className="form-error">{errors.weight}</div>}
      </div>


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