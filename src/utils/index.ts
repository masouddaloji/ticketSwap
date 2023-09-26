import { axiosInstance } from "@/lib/axios/axiosInstance";

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
type currencyOptions = {
  name: string
  code: string
  symbol: string
}
type getCurrencyProps=React.Dispatch<React.SetStateAction<currencyOptions[] | null | undefined>>
export const getCurrency = async (setMainCurrency:getCurrencyProps) => {
  const response = await axiosInstance.get("currencies");
  setMainCurrency(response?.data?.resp?.data);
};