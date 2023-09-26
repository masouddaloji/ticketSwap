import { ArrowLeftIcon } from "@/components/icons";
import { Link } from "react-router-dom";

import { useState, lazy, Fragment } from "react";
import { classNames } from "@/utils";
import { Dialog, Transition } from "@headlessui/react";
import OtpInput from "react-otp-input";
const ReactFlagsSelect = lazy(() => import("react-flags-select"));

export default function PhoneDetails() {
  let [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.value) return;
    const phoneNumberRegex =
      /^\+?(\d{1,4})?[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,9}[-.\s]?\d{1,9}[-.\s]?\d{1,9}$/;
    if (!phoneNumberRegex.test(e.target.value)) return;

    setPhone(e.target.value);
  }
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <>
      <h1 className="text-color mb-4  text-[2rem] font-bold md:text-[3.5rem]">
        Add your phone number
      </h1>
      <h3 className="mb-6 text-xl !text-foregroundMuted  md:text-2xl">
        We'll send you a text message when a ticket gets sold. Your phone number
        will remain private 🔒.
      </h3>
      <div className="mb-6 flex justify-between gap-4">
        <ReactFlagsSelect
          selected={selected}
          onSelect={(code) => setSelected(code)}
          searchable
          className="text-color rounded-lg bg-elevatedBackground !pb-0 focus-within:bg-white focus-within:shadow-[0_1px_2px_#1a21291a,0_4px_12px_#1a21291a] focus:outline-none [&_button]:h-full   [&_button]:border-none "
        />
        <input
          id="phone"
          aria-label="Phone-number"
          className="text-color  !focus:bg-white h-14 w-1/2 rounded-lg !bg-elevatedBackground px-2    text-lg focus:shadow-[0_1px_2px_#1a21291a,0_4px_12px_#1a21291a] focus:outline-none md:w-full"
          type="tel"
          onChange={handleChange}
        />
      </div>
      <div className="flex  flex-col-reverse gap-2 md:flex-row  md:justify-between">
        <Link
          to="/selling-price"
          className=" flex items-center justify-center gap-2 rounded-lg  bg-[#00b6f01f] bg-gradient-to-b from-[rgba(255,255,255,0.24)] to-transparent px-8 py-4 text-center text-lg font-semibold !text-action  md:w-max "
        >
          <span className="h-6 w-6">
            <ArrowLeftIcon fill="currentColor" />
          </span>
          <span>Previous</span>
        </Link>
        <button
          className={classNames(
            "ml-auto block rounded-lg  bg-action bg-gradient-to-b from-[rgba(255,255,255,0.24)] to-transparent px-8 py-4 text-center text-lg font-semibold text-white  md:w-max",
            phone
              ? "opacity-100"
              : "pointer-events-none cursor-default opacity-50",
          )}
          onClick={openModal}
        >
          Continue
        </button>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 !bg-black !bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center  text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white  align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="border-b border-stroke py-4 text-center text-lg font-semibold !text-foreground"
                  >
                    Verify phone number
                  </Dialog.Title>
                  <div className="p-4 md:p-8">
                    <p className="mb-4 text-left text-sm !text-foregroundMuted md:text-lg">
                      Enter the code we sent to <strong>{phone}</strong>
                    </p>
                    <p className="text-left !text-foreground md:text-lg">
                      Verification code
                    </p>
                    <OtpInput
                      value={otp}
                      onChange={setOtp}
                      numInputs={6}
                      containerStyle={{ width: "100%", gap: 8 }}
                      renderInput={(props) => (
                        <input
                          {...props}
                          className="h-14 flex-1 rounded-lg bg-elevatedBackground  p-4 text-lg !text-foreground  focus-within:bg-white focus-within:shadow-[0_1px_2px_#1a21291a,0_4px_12px_#1a21291a] focus:outline-none"
                        />
                      )}
                    />
                  </div>

                  <div className="mt-4 p-4 md:p-8">
                    <button
                      className={classNames(
                        "mb-4 ml-auto block  w-full rounded-lg bg-action bg-gradient-to-b from-[rgba(255,255,255,0.24)] to-transparent px-8 py-4 text-center text-lg font-semibold text-white",
                      )}
                    >
                      Submit
                    </button>
                    <button
                      className="w-full  rounded-lg bg-[#00b6f01f] bg-gradient-to-b from-[rgba(255,255,255,0.24)] to-transparent px-8 py-4 text-center text-lg font-semibold text-action "
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
