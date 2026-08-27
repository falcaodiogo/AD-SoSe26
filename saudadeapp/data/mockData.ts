import { Entry } from "../types";

export const entries: Entry[] = [
  {
    id: "julia",
    type: "person",
    name: "Julia",
    images: [
      "https://placekitten.com/200/200",
      "https://placekitten.com/201/200",
    ],
    note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "beatrice",
    type: "person",
    name: "Beatrice",
    latitude: 50.8759,
    longitude: 8.0231,
  },
  {
    id: "cameron",
    type: "person",
    name: "Cameron",
  },

  // Places in Siegen, Germany
  {
    id: "siegen-hauptbahnhof",
    type: "place",
    name: "Siegen Hauptbahnhof",
    latitude: 50.8748,
    longitude: 8.0243,
    note: "The main train station in Siegen and a central meeting point.",
  },
  {
    id: "oberes-schloss",
    type: "place",
    name: "Oberes Schloss",
    latitude: 50.8728,
    longitude: 8.0245,
    note: "A historic castle overlooking the city of Siegen.",
  },
  {
    id: "unteres-schloss",
    type: "place",
    name: "Unteres Schloss",
    latitude: 50.8744,
    longitude: 8.0218,
    note: "A historic palace located in the centre of Siegen.",
  },
  {
    id: "university-siegen",
    type: "place",
    name: "University of Siegen",
    latitude: 50.9064,
    longitude: 8.0271,
    note: "University campus in Siegen.",
  },
];
