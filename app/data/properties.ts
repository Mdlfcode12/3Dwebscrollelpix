export interface Property {
  id: string;
  badge: string;
  name: string;
  category: string;
  image: string;
  description: string;
}

export const PROPERTIES: Property[] = [
  {
    id: "01",
    badge: "PROPERTY 01",
    name: "Social Kitchen",
    category: "Shared living",
    image: "/images/property-01.webp",
    description:
      "A generous communal kitchen designed for practical daily living and a refined shared experience.",
  },
  {
    id: "02",
    badge: "PROPERTY 02",
    name: "Private Residence",
    category: "Modern living",
    image: "/images/property-02.webp",
    description:
      "A compact private room resolved with integrated storage, warm detailing, and a calm palette.",
  },
  {
    id: "03",
    badge: "PROPERTY 03",
    name: "Communal Heart",
    category: "Shared living",
    image: "/images/property-03.webp",
    description:
      "An open kitchen and dining zone that gives the property a welcoming social centre.",
  },
  {
    id: "04",
    badge: "PROPERTY 04",
    name: "Everyday Living",
    category: "Hospitality",
    image: "/images/property-04.webp",
    description:
      "Bright, flexible communal space shaped by natural light and considered circulation.",
  },
  {
    id: "05",
    badge: "PROPERTY 05",
    name: "Clear Circulation",
    category: "Residence",
    image: "/images/property-05.webp",
    description:
      "Clean, well-lit circulation designed to make the daily experience feel safe and composed.",
  },
  {
    id: "06",
    badge: "PROPERTY 06",
    name: "Open Courtyard",
    category: "Communal space",
    image: "/images/property-06.webp",
    description:
      "A large multi-purpose shared area with room for gathering, movement, and everyday activity.",
  },
  {
    id: "07",
    badge: "PROPERTY 07",
    name: "Arrival Experience",
    category: "Interior",
    image: "/images/property-07.webp",
    description:
      "A softened entrance composition that creates a distinct sense of arrival.",
  },
  {
    id: "08",
    badge: "PROPERTY 08",
    name: "Urban Property",
    category: "Exterior",
    image: "/images/property-08.webp",
    description:
      "A visible urban asset positioned through a clear facade identity and street presence.",
  },
];
