// Contains shared frontend type definitions

export interface Equipment {
  id: number;
  user_seq: number;
  model: string;
  equipment_type: string;
  location_id: number;
  room_name: string;
  building_type: string;
}

export interface Location {
    id: number;
    room_name: string;
    building_type: string;
}