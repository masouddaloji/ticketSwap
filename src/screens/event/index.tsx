import {
  CloseIcon,
  SearchIcon,
  Spinner,
  VerifiedIcon,
} from "@/components/icons";
import {
  ActionFunctionArgs,
  Form,
  Link,
  LoaderFunctionArgs,
  redirect,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { classNames } from "@/utils";
import { axiosInstance } from "@/lib/axios/axiosInstance";
import type { DataEntity, SearchResult } from "@/types";
import { useDebouncedCallback } from "use-debounce";

type LoaderData = {
  q: string;
  searchResult: SearchResult;
};

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const { data: searchResult } = await axiosInstance.get("search", {
    params: { q },
  });
  return { q, searchResult };
}

export async function action({ params: _, request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const res = await axiosInstance.post("ticket", {
    uid: 1,
    step: "1",
    event_id: formData.get("eventId"),
  });

  localStorage.setItem("data", JSON.stringify(res.data.resp.data.data));
  return redirect("/files");
}

export default function Events() {
  const { q, searchResult } = useLoaderData() as LoaderData;
  const navigation = useNavigation();
  const submit = useSubmit();
  const debounced = useDebouncedCallback((form: HTMLFormElement | null) => {
    submit(form, { replace: true });
  }, 500);

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");

  useEffect(() => {
    const input = document.getElementById("q") as HTMLInputElement;
    input.value = q;
  }, [q]);

  const [selected, setSelected] = useState<DataEntity | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounced(e.currentTarget.form);
  };

  return (
    <>
      <h1 className="text-color mb-4  text-[2rem] font-bold md:text-[3.5rem] sell-ticket-step1-title">
        Select event
      </h1>
      <h3 className="mb-6 text-xl text-foregroundMuted md:text-2xl sell-ticket-step1-subtitle">
        Which event do you want to sell tickets for?
      </h3>
      {selected ? (
        <button
          key={selected.id}
          className="mb-6 w-full rounded-lg bg-[#f0fbfe] p-4 text-start sell-ticket-step1-selected-event"
        >
          <h4 className="flex items-center text-lg !text-foreground md:text-xl">
            {selected.name}
            <span className=" text-[#00b6f0]">
              <VerifiedIcon fill="currentColor" className="w-4 h-4 ml-1" />
            </span>
            <span
              className="ml-auto  h-[22px] w-[22px] cursor-pointer"
              onClick={() => setSelected(null)}
            >
              <CloseIcon
                fill="currentColor"
                className="transition-colors text-foregroundMuted hover:text-foreground"
              />
            </span>
          </h4>
          <span className="mt-1 text-sm text-foregroundMuted md:text-base">
            {`${selected.extra.date} • ${selected.extra.city.country.name} , ${selected.extra.city.name}`}
          </span>
        </button>
      ) : (
        <>
          <Form id="search-form" className="relative flex mb-6 sell-ticket-step1-search-form" role="search">
            <span className="absolute -translate-y-1/2 left left-2 top-1/2 h-7 w-7">
              {searching ? (
                <Spinner className="animate-spin" />
              ) : (
                <SearchIcon />
              )}
            </span>
            <input
              id="q"
              aria-label="Search"
              placeholder="Search for an event"
              className="text-color h-14 flex-1 rounded-lg bg-elevatedBackground pl-12 text-lg focus-within:bg-white focus-within:shadow-[0_1px_2px_#1a21291a,0_4px_12px_#1a21291a] focus:outline-none sell-ticket-step1-search-input"
              type="search"
              name="q"
              onChange={handleChange}
            />
          </Form>
          {searchResult.resp.data?.length ? (
            <section className="sell-ticket-step1-suggestion-events">
              <h6 className="my-2 text-xs font-semibold tracking-wide text-foregroundSubtle">
                SEARCH RESULTS
              </h6>
              {searchResult.resp.data?.map((event) => (
                <button
                  key={event.id}
                  className="w-full p-4 mb-2 rounded-lg bg-elevatedBackground text-start"
                  onClick={() => setSelected(event)}
                >
                  <h4 className="flex items-center text-lg text-color text-foreground md:text-xl">
                    {event.name}
                    <span className=" text-[#00b6f0]">
                      <VerifiedIcon
                        fill="currentColor"
                        className="w-4 h-4 ml-1"
                      />
                    </span>
                  </h4>
                  <span className="mt-1 text-sm text-foregroundMuted md:text-base">
                    {`${event.extra.date} • ${event.extra.city.country.name} , ${event.extra.city.name}`}
                  </span>
                </button>
              ))}
            </section>
          ) : (
            <div className="text-center sell-ticket-step1-notfound">
              <span>Can’t find the event you’re looking for? </span>
              <Link
                to="/create-event"
                className="font-semibold text-action md:text-lg"
              >
                Add event
              </Link>
            </div>
          )}
        </>
      )}

      <Form method="post" className="sell-ticket-goto-step2-form">
        <input
          type="hidden"
          name="eventId"
          value={selected ? selected.id : ""}
        />
        <button
          className={classNames(
            "ml-auto  flex items-center justify-center rounded-lg  bg-action bg-gradient-to-b from-[rgba(255,255,255,0.24)] to-transparent px-8 py-4 text-center text-lg font-semibold text-white  md:w-max sell-ticket-goto-step2",
            selected
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
      </Form>
    </>
  );
}
