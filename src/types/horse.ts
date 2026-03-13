export interface Horse {
  id: number;
  name: string;
  profile?: HorseProfile;
}

export interface HorseProfile {
  favouriteFood?: string;
  physical?: HorsePhysical;
}

export interface HorsePhysical {
  height?: number;
  weight?: number;
}

export type CreateHorseRequest = Omit<Horse, "id">;
export type UpdateHorseRequest = Omit<Horse, "id">;