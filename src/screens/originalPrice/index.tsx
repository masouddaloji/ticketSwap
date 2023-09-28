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
    step: "4",
    event_id,
    ticket_id,
    ticket_seller_id,
    orginal_price: formData.get("price"),
    orginal_currency: formData.get("currency[id]"),
  });
  console.log(res.data);

  return redirect("/selling-price");
}
type currencyOptions = {
  name: string
  code: string
  symbol: string
}
export default function OriginalPrice() {
  const [mainCurrency, setMainCurrency] = useState<currencyOptions[] | null>();
  const [selected, setSelected] = useState<currencyOptions | undefined>(mainCurrency?.[0]);
  const [amount, setAmount] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {

    getCurrency(setMainCurrency);
  }, []);
  useEffect(() => {
    if (mainCurrency?.length) setSelected(mainCurrency[0])

  }, [mainCurrency]);


  return (
    <>
      <h1 className="text-color  mb-4 text-[2rem] font-bold md:text-[3.5rem] sell-ticket-step3-title">
        Add the original price per ticket
      </h1>
      <h3 className="mb-6 text-xl !text-foregroundMuted  md:text-2xl sell-ticket-step3-subtitle">
        Make sure to include the service fees.
      </h3>
      <Form method="post" className="sell-ticket-step3-form">
        <div className="relative flex justify-between gap-4 mb-6 sell-ticket-currencies">
          <Listbox value={selected} onChange={setSelected} name="currency">
            <Listbox.Button className="text-color flex h-14 items-center gap-4 rounded-lg bg-elevatedBackground px-4 text-lg focus-within:bg-white focus-within:shadow-[0_1px_2px_#1a21291a,0_4px_12px_#1a21291a] focus:outline-none">
              {selected?.symbol}
              <ArrowDownIcon width={24} height={24} fill="currentColor" />
            </Listbox.Button>
            <Listbox.Options className="text-color absolute top-14 h-48 w-max  space-y-4 overflow-y-auto bg-white  px-4 py-2 shadow-[0_1px_2px_#1a21291a,0_4px_12px_#1a21291a]">
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
            className="text-color h-14 w-full rounded-lg bg-elevatedBackground px-2 text-lg focus:bg-white   focus:shadow-[0_1px_2px_#1a21291a,0_4px_12px_#1a21291a] focus:outline-none sell-ticket-input"
            onChange={(e) => setAmount(e.target.valueAsNumber)}
            name="price"
          />
        </div>
        <div>
          <div
            className={classNames(
              "mb-8 flex justify-between sell-ticket-total-amount",
              amount ? "!text-foreground" : "!text-foregroundSubtle",
            )}
          >
            <strong className="text-lg">Total</strong>
            <h4 className="text-color">
              <strong>
                {selected?.symbol} {amount}
              </strong>{" "}
              <span>for 1 ticket</span>
            </h4>
          </div>
        </div>
        <div className="flex flex-col-reverse gap-2 md:flex-row md:justify-between sell-ticket-return-to-step-2">
          <Link
            to="/ticket-info"
            className=" flex items-center justify-center gap-2 rounded-lg  bg-[#00b6f01f] bg-gradient-to-b from-[rgba(255,255,255,0.24)] to-transparent px-8 py-4 text-center text-lg font-semibold !text-action  md:w-max "
          >
            <span className="w-6 h-6">
              <ArrowLeftIcon fill="currentColor" />
            </span>
            <span>Previous</span>
          </Link>
          <button
            className={classNames(
              "ml-auto  flex items-center justify-center rounded-lg  bg-action bg-gradient-to-b from-[rgba(255,255,255,0.24)] to-transparent px-8 py-4 text-center text-lg font-semibold text-white  md:w-max sell-ticket-goto-step4",
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
                className="animate-spin sell-ticket-spinner"
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
