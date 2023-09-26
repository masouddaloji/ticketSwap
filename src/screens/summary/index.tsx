import { Link } from "react-router-dom";

export default function Summary() {
  return (
    <>
      <h1 className="mb-4  text-[2rem] font-bold md:text-[3.5rem]">
        Sell your tickets
      </h1>
      <h3 className="mb-6 text-xl text-foregroundMuted  md:text-2xl">
        Complete all the steps below to sell your tickets fast and easy!
      </h3>
      <div className="mb-6 h-2 w-full rounded-full bg-[#00ce05]"></div>
      <div className="relative mb-6 rounded-xl border border-stroke">
        <div className="flex justify-between p-4 [border-inline-start:0.5rem_solid_transparent]">
          <div className="">
            <h4 className="text-lg text-foreground">Event</h4>
            <p className="mb-2 mt-2 text-foregroundMuted">
              <span className="block">
                Levitate London- Konstantin Sibold - Cristoph - Stimming - Toto
                Chiavetta
              </span>
              <span className="block">Regular</span>
              <span className="block">Sat, Sep 9 • E1, GB</span>
            </p>
            <Link to="/event" className="font-semibold text-action">
              Edit
            </Link>
          </div>
          <div className="relative flex shrink-0 basis-8 items-center justify-center pl-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#00ce05]">
              <span className="inline-grid h-6 w-6 place-items-center align-middle  text-white">
                <svg
                  aria-label="Checkmark"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  strokeLinejoin="round"
                  strokeMiterlimit="1.414"
                  xmlns="http://www.w3.org/2000/svg"
                  role="presentation"
                  focusable="false"
                  viewBox="0 0 32 32"
                  preserveAspectRatio="xMidYMid meet"
                  fill="currentColor"
                >
                  <path d="M8.357 15.53a2 2 0 10-2.714 2.94l6.5 6a2 2 0 002.902-.2l11.5-14a2 2 0 10-3.09-2.54L13.3 20.094 8.357 15.53z"></path>
                </svg>
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-between p-4 [border-block-start:1px_solid_#e5e7e8] [border-inline-start:0.25rem_solid_#00b6f0]">
          <div className="">
            <h4 className="text-lg">Upload your tickets</h4>
            <p className="my-4 text-foregroundMuted">0 tickets for sale</p>
            <Link
              to="/files"
              className=" block rounded-lg bg-action px-6  py-3 font-semibold text-white"
            >
              Complete this step
            </Link>
          </div>
        </div>
        <div className="flex justify-between p-4 [border-block-start:1px_solid_#e5e7e8]">
          <div>
            <h4 className="text-lg">Add original ticket price</h4>
            <p className="my-4 text-foregroundMuted">
              The amount you paid when you originally bought your ticket.
            </p>
          </div>
        </div>
        <div className="flex justify-between p-4 [border-block-start:1px_solid_#e5e7e8]">
          <div>
            <h4 className="text-lg">Set your selling price</h4>
            <p className="my-4 text-foregroundMuted">
              The price you want to sell each ticket for.
            </p>
          </div>
        </div>
        <div className="flex justify-between p-4 [border-block-start:1px_solid_#e5e7e8]">
          <div>
            <h4 className="text-lg">Verify your phone number</h4>
            <p className="my-4 text-foregroundMuted">
              We pride ourselves on being the safest place to buy and sell
              tickets online. That’s why we have to verify you as a trusted
              seller.
            </p>
          </div>
        </div>
        <div className="flex justify-between p-4 [border-block-start:1px_solid_#e5e7e8]">
          <div>
            <h4 className="text-lg">Identity verification</h4>
            <p className="my-4 text-foregroundMuted">
              Our payment provider needs some additional info before they can
              pay you out.
            </p>
          </div>
        </div>
        <div className="flex justify-between p-4 [border-block-start:1px_solid_#e5e7e8]">
          <div>
            <h4 className="text-lg">Add your bank details</h4>
            <p className="my-4 text-foregroundMuted">
              We will transfer your money as soon as your tickets are sold.
            </p>
          </div>
        </div>
      </div>
      <div className="mb-6 flex justify-between rounded-lg p-4 [border:1px_solid_#e5e7e8]">
        <div>
          <h4 className="text-lg">Visibility</h4>
          <p className="my-4 text-foregroundMuted">Public on TicketSwap</p>
          <button className="mb-2 font-semibold text-foreground">
            Change to private
          </button>
          <p className="text-sm  text-foregroundMuted">
            Complete all steps to edit the visibility
          </p>
        </div>
        <div className="relative flex shrink-0 basis-8 items-center justify-center pl-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-action">
            <span className="inline-grid h-6 w-6 place-items-center align-middle  text-white">
              <svg
                aria-label="TicketSwap"
                fill-rule="evenodd"
                clip-rule="evenodd"
                stroke-linejoin="round"
                stroke-miterlimit="1.414"
                xmlns="http://www.w3.org/2000/svg"
                role="presentation"
                focusable="false"
                viewBox="0 0 32 32"
                preserveAspectRatio="xMidYMid meet"
                fill="currentColor"
              >
                <g>
                  <path d="M17.865 17.888a2.63 2.63 0 0 1-3.73 0l-6.07-6.066a1.967 1.967 0 0 0-2.797 0L2 15.085l7.462 7.465c3.614 3.61 9.469 3.61 13.07 0 .32-.306.609-.65.87-1l-4.853-4.85c-.111.436-.341.85-.684 1.188"></path>
                  <path d="M22.532 9.486c-3.6-3.608-9.456-3.608-13.07 0a9.793 9.793 0 0 0-.863 1.001l4.853 4.849c.117-.435.342-.84.684-1.186a2.642 2.642 0 0 1 3.728 0l6.07 6.074a1.986 1.986 0 0 0 2.801 0L30 16.952l-7.468-7.466z"></path>
                </g>
              </svg>
            </span>
          </div>
        </div>
      </div>
      <div className="flex  flex-col-reverse gap-2 md:flex-row  md:justify-between">
        <Link
          to=".."
          className=" flex items-center justify-center gap-2 rounded-lg  bg-[#00b6f01f] bg-gradient-to-b from-[rgba(255,255,255,0.24)] to-transparent px-8 py-4 text-center text-lg font-semibold text-action  md:w-max "
        >
          Reset and start over
        </Link>
        <button className="w-full rounded-lg bg-action bg-gradient-to-b from-[rgba(255,255,255,0.24)] to-transparent px-8 py-4 text-center text-lg font-semibold text-white opacity-50 md:w-max ">
          Create listing
        </button>
      </div>
    </>
  );
}
