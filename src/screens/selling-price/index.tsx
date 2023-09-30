import { ArrowDownIcon, ArrowLeftIcon, Spinner } from "@/components/icons";
import {
  ActionFunctionArgs,
  Form,
  Link,
  redirect,
  useNavigation,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { Listbox } from "@headlessui/react";
import { classNames, getCurrency } from "@/utils";
import { axiosInstance } from "@/lib/axios/axiosInstance";

export async function action({ params: _, request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const { ticket_seller_id, ticket_id, event_id } = JSON.parse(
    localStorage.getItem("data") ?? "",
  );
  const res = await axiosInstance.post("ticket", {
    uid: 1,
    step: "5",
    event_id,
    ticket_id,
    ticket_seller_id,
    ticket_price: formData.get("price"),
    ticket_currency: formData.get("currency[id]"),
  });
  return redirect("/phone-details");
}

type currencyOptions = {
  name: string;
  code: string;
  symbol: string;
};

type details = {
  buyer: {
    value: number;
    type: string;
  };
  seller: {
    value: number;
    type: string;
  };
};
export default function SellingPrice() {
  const [detailsTransaction, setDetailsTransaction] = useState<details>()
  const [mainCurrency, setMainCurrency] = useState<currencyOptions[] | null>();
  const [selected, setSelected] = useState<currencyOptions | undefined>(mainCurrency?.[0]);
  const [amount, setAmount] = useState<number>(0);
  const navigation = useNavigation();

  const getDetails = async (): Promise<void> => {
    const response = await axiosInstance.get("commission");
    setDetailsTransaction(response?.data?.resp?.data);
  };

  const calculateSellPrice = (): number => {
    if (Number.isNaN(amount)) {
      return 0;
    }
    if (!detailsTransaction) {
      return 0;
    }
    if (detailsTransaction?.seller?.type === "percent") {
      const price =
        amount - ((amount * detailsTransaction?.seller.value) / 100);
      return price;
    } else {
      const price = (amount - detailsTransaction?.seller.value);
      return price;
    }
  };

  const calculateBuyPrice = (): number => {
    if (Number.isNaN(amount)) {
      return 0;
    }
    if (!detailsTransaction) {
      return 0;
    }

    if (detailsTransaction?.buyer?.type === "percent") {
      const price =
        amount +
        ((amount * detailsTransaction?.buyer.value) / 100) +
        ((amount * detailsTransaction?.seller.value) / 100);
      return price;
    } else {
      const price =
        amount +
        detailsTransaction?.buyer.value +
        detailsTransaction?.seller.value;
      return price;
    }
  };
  useEffect(() => {
    getCurrency(setMainCurrency);
    getDetails();
  }, []);

  useEffect(() => {
    if (mainCurrency?.length) setSelected(mainCurrency[0])

  }, [mainCurrency]);

  return (
    <>
      <h1 className="text-color mb-4 text-[2rem] font-bold md:text-[3.5rem] sell-ticket-step4-title">
        Set your ticket price
      </h1>
      <h3 className="mb-6 text-xl !text-foregroundMuted  md:text-2xl sell-ticket-step4-subtitle">
        Enter your price manually or use the price suggestions!
      </h3>
      <Form method="post" className="sell-ticket-step4-form">
        <div className="relative flex justify-between gap-4 mb-6 sell-ticket-currencies">
          <Listbox value={selected} onChange={setSelected} name="currency">
            <Listbox.Button className="text-color flex  h-14 items-center gap-4 rounded-lg bg-elevatedBackground px-4 text-lg focus-within:bg-white focus-within:shadow-[0_1px_2px_#1a21291a,0_4px_12px_#1a21291a] focus:outline-none">
              {selected?.symbol}
              <ArrowDownIcon width={24} height={24} fill="currentColor" />
            </Listbox.Button>
            <Listbox.Options className="absolute top-14 h-48 w-max space-y-4  overflow-y-auto bg-white px-4  py-2 shadow-[0_1px_2px_#1a21291a,0_4px_12px_#1a21291a]">
              {mainCurrency?.length && mainCurrency.map((option) => (
                <Listbox.Option key={option.code} value={option}>
                  {({ selected }) => (
                    <span
                      className={
                        selected ? "text-color font-bold" : "text-color"
                      }
                    >
                      {option.name}
                    </span>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
          <input
            id="number"
            aria-label="number"
            type="number"
            name="price"
            className="text-color h-14 w-full rounded-lg bg-elevatedBackground px-2 text-lg focus:bg-white   focus:shadow-[0_1px_2px_#1a21291a,0_4px_12px_#1a21291a] focus:outline-none sell-ticket-input"
            onChange={(e) => setAmount(e.target.valueAsNumber)}
          />
        </div>
        <div>
          <div>
            <div className="mb-6">
              <div
                className={classNames(
                  "mb-6 flex justify-between border-b pb-6 sell-ticket-total-amount",
                  amount ? "!text-foreground" : "!text-foregroundSubtle",
                )}
              >
                <div className="sell-ticket-step4-amount-text">
                  <p className="text-lg !text-foreground">You'll receive</p>
                  <p className=" !text-foregroundMuted ">
                    Your price minus {detailsTransaction?.seller?.type === "percent" ? `${detailsTransaction?.seller.value}% ` : `${detailsTransaction?.seller.value}`}  service fee
                  </p>
                </div>
                <h4 className="text-lg text-color sell-ticket-step4-total">
                  <span>
                    {" "}
                    {selected?.symbol} {calculateSellPrice()?.toFixed(2)}
                  </span>
                  <span className="text-color sell-ticket-step4-total-text">/ ticket</span>
                </h4>
              </div>
            </div>
            <div className="mb-6">
              <div
                className={classNames(
                  " flex justify-between sell-ticket-subtotal-amount",
                  amount ? "!text-foreground" : "!text-foregroundSubtle",
                )}
              >
                <p className="text-lg !text-foreground sell-ticket-step4-subtotal-amount-text">Buyers will pay</p>
                <h4 className="text-lg text-color sell-ticket-step4-subtotal">
                  <span className="text-color">
                    {" "}
                    {selected?.symbol} {calculateBuyPrice()?.toFixed(2)}
                  </span>
                  <span className="text-color sell-ticket-step4-subtotal-text">/ ticket</span>
                </h4>
              </div>
              <p className=" !text-foregroundMuted sell-ticket-step4-footer-text">
                Your price plus {detailsTransaction?.buyer?.type === "percent" ? `${detailsTransaction?.buyer.value}%` : `${detailsTransaction?.buyer.value}`} service fee and {detailsTransaction?.buyer?.type === "percent" ? `${detailsTransaction?.seller.value}%` : `${detailsTransaction?.seller.value}`} transaction fee
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col-reverse gap-2 md:flex-row md:justify-between sell-ticket-return-to-step-3">
          <Link
            to="/original-price"
            className=" flex items-center justify-center gap-2 rounded-lg  bg-[#00b6f01f] bg-gradient-to-b from-[rgba(255,255,255,0.24)] to-transparent px-8 py-4 text-center text-lg font-semibold !text-action  md:w-max "
          >
            <span className="w-6 h-6">
              <ArrowLeftIcon fill="currentColor" />
            </span>
            <span>Previous</span>
          </Link>
          <button
            className={classNames(
              "ml-auto  flex items-center justify-center rounded-lg  bg-action bg-gradient-to-b from-[rgba(255,255,255,0.24)] to-transparent px-8 py-4 text-center text-lg font-semibold text-white  md:w-max sell-ticket-goto-step5",
              amount
                ? "opacity-100"
                : "pointer-events-none cursor-default opacity-50",
            )}
            type="submit"
          >
            Continue
            <span
              className="ml-2 h-[22px] w-[22px]"
              hidden={navigation.state !== "submitting"}
            >
              <Spinner
                className="animate-spin"
                fill="currentColor"
                aria-hidden="true"
              />
            </span>
          </button>
        </div>
      </Form>
    </>
  );
}
