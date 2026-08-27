export type EntryType = 'person' | 'place';

export interface AudioNote {
  uri: string;
}

export interface Entry {
  id: string;
  type: EntryType;
  name: string;
  // Places only
  latitude?: number;
  longitude?: number;
  // Optional content — every entry (person or place) can have any, all, or none of these
  images?: string[];
  note?: string;
  audio?: AudioNote;
}
