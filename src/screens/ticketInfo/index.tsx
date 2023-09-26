import { ArrowLeftIcon, Spinner } from "@/components/icons";
import {
  ActionFunctionArgs,
  Form,
  Link,
  redirect,
  useNavigation,
} from "react-router-dom";
import { useState } from "react";
import { axiosInstance } from "@/lib/axios/axiosInstance";

type Body = {
  step: string;
  uid: string;
  ticket_id: string;
  ticket_seller_id: string;
  event_id: string;
  details: {
    entrance?: FormDataEntryValue | null;
    section?: FormDataEntryValue | null;
    seat?: FormDataEntryValue | null;
    row?: FormDataEntryValue | null;
    additional_info?: FormDataEntryValue | null;
  };
};

export async function action({ params: _, request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const { ticket_seller_id, ticket_id, event_id } = JSON.parse(
    localStorage.getItem("data") ?? "",
  );

  const body: Body = {
    step: "3",
    uid: "1",
    ticket_id,
    ticket_seller_id,
    event_id,
    details: {},
  };

  if (formData.get("seats")) {
    body.details = {
      entrance: formData.get("Entrance"),
      section: formData.get("Section"),
      seat: formData.get("Seat"),
      row: formData.get("Row"),
    };
  }
  if (formData.get("details")) {
    body.details.additional_info = formData.get("details");
  }

  await axiosInstance.post("ticket", body);

  return redirect("/original-price");
}

export default function TicketInfo() {
  const [checked, setChecked] = useState(false);
  const navigation = useNavigation();
  return (
    <>
      <h1 className="text-color  mb-4 text-[2rem] font-bold md:text-[3.5rem]">
        Add ticket details
      </h1>
      <h3 className="mb-6 text-xl !text-foregroundMuted  md:text-2xl">
        Buyers will feel more confident buying your ticket.s.
      </h3>
      <Form method="post">
        <div className="mb-6 flex gap-2">
          <input
            id="seats"
            name="seats"
            aria-label="number"
            type="checkbox"
            className="!accent-white"
            onChange={() => setChecked(!checked)}
            checked={checked}
          />
          <label htmlFor="seat" className="text-color">
            This ticket is associated with specific seats.
          </label>
        </div>
        {checked ? (
          <div className="bg-white">
            <div className="my-6 flex  items-center  gap-14 rounded-xl px-12 py-6 shadow-[0_1px_2px_#1a21291a,0_4px_12px_#1a21291a] ">
              <div className="before:content-[' '] relative w-28 before:absolute before:-right-7 before:-top-4 before:-z-10 before:block before:h-[126%] before:w-[174%] before:rounded-full before:bg-[#f0fbfe]">
                <img className="w-full rounded-md" />
              </div>
              <div className=" grid w-full   place-items-start gap-4  border-l border-dashed border-stroke pl-8  [grid-template-columns:repeat(auto-fit,minmax(138px,1fr))] md:[grid-template-columns:repeat(auto-fit,minmax(150px,1fr))]">
                <div className=" text-color flex  w-full flex-col gap-2 ">
                  <label htmlFor="Entrance" className="text-color">
                    Entrance
                  </label>
                  <input
                    type="text"
                    name="Entrance"
                    id="Entrance"
                    className="text-color h-14 rounded-lg bg-elevatedBackground px-2 text-lg focus-within:bg-white focus-within:shadow-[0_1px_2px_#1a21291a,0_4px_12px_#1a21291a] focus:outline-none"
                  />
                </div>
                <div className=" text-color flex  w-full  flex-col gap-2">
                  <label htmlFor="Section">Section</label>
                  <input
                    type="text"
                    name="Section"
                    id="Section"
                    className="text-color  h-14 rounded-lg bg-elevatedBackground px-2 text-lg focus-within:bg-white focus-within:shadow-[0_1px_2px_#1a21291a,0_4px_12px_#1a21291a] focus:outline-none"
                  />
                </div>
                <div className=" text-color flex  w-full flex-col gap-2 ">
                  <label htmlFor="Row">Row</label>
                  <input
                    type="text"
                    name="Row"
                    id="Row"
                    className="text-color h-14  rounded-lg bg-elevatedBackground px-2 text-lg focus-within:bg-white focus-within:shadow-[0_1px_2px_#1a21291a,0_4px_12px_#1a21291a] focus:outline-none"
                  />
                </div>
                <div className=" text-color flex  w-full flex-col gap-2 ">
                  <label htmlFor="Seat">Seat</label>
                  <input
                    type="text"
                    name="Seat"
                    id="Seat"
                    className="text-color h-14  rounded-lg bg-elevatedBackground px-2 text-lg focus-within:bg-white focus-within:shadow-[0_1px_2px_#1a21291a,0_4px_12px_#1a21291a] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        ) : null}
        <div>
          <div className="mb-8 ">
            <h4 className="mb-2 text-xl  !text-foreground">
              Additional info (optional)
            </h4>
            <textarea
              name="details"
              id="details"
              rows={6}
              className="w-full resize-none rounded-lg bg-elevatedBackground  p-4 focus-within:bg-white focus-within:shadow-[0_1px_2px_#1a21291a,0_4px_12px_#1a21291a] focus:outline-none"
            ></textarea>
            <p className="text-sm !text-foregroundMuted">
              Provide details about your ticket that might be crucial to
              potential buyers. For example: entrance time, seating information,
              child ticket, VIP, valid until, time slot, day or night ticket,
              etc.
            </p>
          </div>
        </div>
        <div className="flex  flex-col-reverse gap-2 md:flex-row  md:justify-between">
          <Link
            to="/files"
            className=" flex items-center justify-center gap-2 rounded-lg  bg-[#00b6f01f] bg-gradient-to-b from-[rgba(255,255,255,0.24)] to-transparent px-8 py-4 text-center text-lg font-semibold !text-action  md:w-max "
          >
            <span className="h-6 w-6">
              <ArrowLeftIcon fill="currentColor" />
            </span>
            <span>Previous</span>
          </Link>
          <button
            type="submit"
            className="flex w-full items-center justify-center rounded-lg bg-action bg-gradient-to-b from-[rgba(255,255,255,0.24)] to-transparent px-8 py-4 text-center text-lg font-semibold !text-white opacity-100 md:w-max "
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
