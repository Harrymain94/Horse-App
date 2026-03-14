import type { Horse } from "../../types/horse";
import "./HorseList.css";

interface HorseListProps {
  horses: Horse[];
	onSelectHorse: (horseId: string) => void;
}

export function HorseList({ horses, onSelectHorse }: HorseListProps) {

  return (
    <div className="horse-list">
			<div className="horse-list__items">
				{horses.map((horse) => (
          <div 
						key={horse.id} 
						className="horse-list__item" 
						onClick={() => onSelectHorse(horse.id!)}
					>
            {horse.name}
          </div>
        ))}
			</div>
    </div>
  );
}