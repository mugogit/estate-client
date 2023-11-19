export type EstateFeatures =
  | "Security"
  | "Parking"
  | "Elevator"
  | "Garden"
  | "Pool"
  | "Furniture";

export type EstateModelTypes =
  | "Apartment"
  | "House"
  | "Office"
  | "Land"
  | "New Building"
  | "Old Building";

export type MainEstate = {
  _id: string;
  createdAt: Date;
  title: string;
  price: number;
  images: string[];
  city: string;
  street: string;
  totalFloor: Number;
  currentFloor: number;
  rooms: number;
  area: number;
};

export type Estate = MainEstate & {
  description: string;
  features: EstateFeatures[];
  type: EstateModelTypes;
};

export type PriceRange = {
  minPrice: number;
  maxPrice: number;
};

export type FilterState = {
  title: string;
  roomCount: number[];
  limit?: number;
  page?: number;
  type?: EstateModelTypes;
  price: PriceRange;
};
