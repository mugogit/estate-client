import { clientFree } from "./";

const getEstates = (data: any) => {
  return clientFree.get("/", { params: data });
};

export { getEstates };
