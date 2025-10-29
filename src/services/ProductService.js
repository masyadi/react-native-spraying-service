import { Request } from "../helpers";

export const getProduct = async () => {
  return Request({
    url: "product",
  });
};
