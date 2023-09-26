import { ArrowDownIcon, ArrowLeftIcon, Spinner } from "@/components/icons";
import {
  ActionFunctionArgs,
  Form,
  Link,
  redirect,
  useNavigation,
} from "react-router-dom";
import { useState } from "react";
import { Listbox } from "@headlessui/react";
import { classNames } from "@/utils";
import { axiosInstance } from "@/lib/axios/axiosInstance";

const CURRENCY_OPTIONS = [
  { title: "Euro", id: "€" },
  { title: "Danish Krone", id: "DKK" },
  { title: "British Pound", id: "£" },
  { title: "Hungarian Forint", id: "HUF" },
  { title: "Polish Zloty", id: "PLN" },
  { title: "Swedish Krona", id: "SEK" },
  { title: "US Dollar", id: "$" },
  { title: "Canadian Dollar", id: "CA$" },
  { title: "Australian Dollar", id: "A$" },
  { title: "New Zealand Dollar", id: "NZ$" },
  { title: "Swiss Franc", id: "CHF" },
  { title: "Norwegian Krone", id: "NOk" },
  { title: "Brazilian Real", id: "R$" },
  { title: "Singapore Dollar", id: "SGD" },
  { title: "Czech Koruna", id: "CZK" },
  { title: "Romanian Leu", id: "RON" },
  { title: "Bulgarian Lev", id: "BGN" },
  { title: "Mexican Peso", id: "MX$" },
];

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
  console.log(res.data);

  return redirect("/phone-details");
}

export default function SellingPrice() {
  const [selected, setSelected] = useState(CURRENCY_OPTIONS[0]);
  const [amount, setAmount] = useState(0);
  const navigation = useNavigation();

  return (
    <>
      <h1 className="text-color mb-4 text-[2rem] font-bold md:text-[3.5rem]">
        Set your ticket price
      </h1>
      <h3 className="mb-6 text-xl !text-foregroundMuted  md:text-2xl">
        Enter your price manually or use the price suggestions!
      </h3>
      <Form method="post">
        <div className="relative mb-6 flex justify-between gap-4">
          <Listbox value={selected} onChange={setSelected} name="currency">
            <Listbox.Button className="text-color flex  h-14 items-center gap-4 rounded-lg bg-elevatedBackground px-4 text-lg focus-within:bg-white focus-within:shadow-[0_1px_2px_#1a21291a,0_4px_12px_#1a21291a] focus:outline-none">
              {selected.id}
              <ArrowDownIcon width={24} height={24} fill="currentColor" />
            </Listbox.Button>
            <Listbox.Options className="absolute top-14 h-48 w-max space-y-4  overflow-y-auto bg-white px-4  py-2 shadow-[0_1px_2px_#1a21291a,0_4px_12px_#1a21291a]">
              {CURRENCY_OPTIONS.map((option) => (
                <Listbox.Option key={option.id} value={option}>
                  {({ selected }) => (
                    <span
                      className={
                        selected ? "text-color font-bold" : "text-color"
                      }
                    >
                      {option.title}
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
            className="text-color h-14 w-full rounded-lg bg-elevatedBackground px-2 text-lg focus:bg-white   focus:shadow-[0_1px_2px_#1a21291a,0_4px_12px_#1a21291a] focus:outline-none "
            onChange={(e) => setAmount(e.target.valueAsNumber)}
          />
        </div>
        <div>
          <div>
            <div className="mb-6">
              <div
                className={classNames(
                  "mb-6 flex justify-between border-b pb-6",
                  amount ? "!text-foreground" : "!text-foregroundSubtle",
                )}
              >
                <div>
                  <p className="text-lg !text-foreground">You'll receive</p>
                  <p className=" !text-foregroundMuted ">
                    Your price minus 5% service fee
                  </p>
                </div>
                <h4 className="text-color text-lg">
                  <span>
                    {" "}
                    {selected.id} {(amount * 0.95).toFixed(2)}
                  </span>
                  <span className="text-color">/ ticket</span>
                </h4>
              </div>
            </div>
            <div className="mb-6">
              <div
                className={classNames(
                  " flex justify-between ",
                  amount ? "!text-foreground" : "!text-foregroundSubtle",
                )}
              >
                <p className="text-lg !text-foreground">Buyers will pay</p>
                <h4 className="text-color text-lg">
                  <span className="text-color">
                    {" "}
                    {selected.id} {(amount * 1.08).toFixed(2)}
                  </span>
                  <span className="text-color">/ ticket</span>
                </h4>
              </div>
              <p className=" !text-foregroundMuted ">
                Your price plus 5% service fee and 3% transaction fee
              </p>
            </div>
          </div>
        </div>
        <div className="flex  flex-col-reverse gap-2 md:flex-row  md:justify-between">
          <Link
            to="/original-price"
            className=" flex items-center justify-center gap-2 rounded-lg  bg-[#00b6f01f] bg-gradient-to-b from-[rgba(255,255,255,0.24)] to-transparent px-8 py-4 text-center text-lg font-semibold !text-action  md:w-max "
          >
            <span className="h-6 w-6">
              <ArrowLeftIcon fill="currentColor" />
            </span>
            <span>Previous</span>
          </Link>
          <button
            className={classNames(
              "ml-auto  flex items-center justify-center rounded-lg  bg-action bg-gradient-to-b from-[rgba(255,255,255,0.24)] to-transparent px-8 py-4 text-center text-lg font-semibold text-white  md:w-max",
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
