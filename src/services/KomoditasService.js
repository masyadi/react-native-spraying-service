import { Request } from "../helpers";

export const getKomoditas = async ({ page = 1 }) => {
  return Request({
    url: "komoditas",
    data: { page },
  });
};
