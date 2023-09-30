import { useState, Fragment } from "react";
import { ArrowLeftIcon, Spinner } from "@/components/icons";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { classNames } from "@/utils";
import { Dialog, Transition } from "@headlessui/react";
import OtpInput from "react-otp-input";
import { signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth'
import { auth } from "./../../firebase";

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'


export default function kPhoneDetails() {
  const navigate = useNavigate();
  const navigation = useNavigation();
  let [isOpen, setIsOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [user, setUser] = useState<any>(null)
  const [isShowError, setIsShowError] = useState<boolean>(false)
  const [isShowLoading, setIsShowLoading] = useState<boolean>(false)

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  function navigated() {
    navigate("/summary");
  }
  const sendNumber = async () => {
    const recaptcha = new RecaptchaVerifier(auth, "recaptcha-container", {});

    try {
      const confirmation = await signInWithPhoneNumber(auth, `+${phone}`, recaptcha);
      setUser(confirmation);
      openModal();

    } catch (error) {
      console.log("error", error);
    }
  };
  const verifyCode = async () => {
    try {
      setIsShowLoading(true)
      const data = await user?.confirm(otp);
      setIsShowLoading(false)
      setIsShowError(false)
      closeModal()
      navigated()
    } catch (error) {
      console.log("error", error);
      setIsShowError(true)
      setIsShowLoading(false)
    }
  };

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
        <PhoneInput
          inputClass="!text-color !focus:bg-white !pl-14 !h-14 !w-1/2 !rounded-lg !bg-elevatedBackground px-2 !text-lg !focus:shadow-[0_1px_2px_#1a21291a,0_4px_12px_#1a21291a] !focus:outline-none md:!w-full"
          country={'us'}
          value={phone}
          onChange={(phone) => setPhone(phone)}
        />

        {/* <ReactFlagsSelect
          selected={selected}
          onSelect={(code,number) => setSelected(code)}
          searchable
          className="text-color rounded-lg bg-elevatedBackground !pb-0 focus-within:bg-white focus-within:shadow-[0_1px_2px_#1a21291a,0_4px_12px_#1a21291a] focus:outline-none [&_button]:h-full   [&_button]:border-none "
        />
 */}
      </div>
      <div id="recaptcha-container" className="mb-4"></div>
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
            "ml-auto flex items-center justify-center rounded-lg  bg-action bg-gradient-to-b from-[rgba(255,255,255,0.24)] to-transparent px-8 py-4 text-center text-lg font-semibold text-white  md:w-max",
            phone
              ? "opacity-100"
              : "pointer-events-none cursor-default opacity-50",
          )}
          onClick={sendNumber}
        >
          Continue
          <span
              className="ml-2 h-[22px] w-[22px]"
              hidden={navigation.state !== "submitting"||!isShowLoading}
            >
              <Spinner
                className="animate-spin"
                fill="currentColor"
                aria-hidden="true"
              />
            </span>
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
                  {isShowError && <div className="erv5nxs1 css-1rnpnzp e17kjwee5 city_alert flex mx-4 md:mx-8" >
                    <span className="css-153je4p e17kjwee4">
                      <span className="icon css-mdolut e1ouvt3m1">
                        <svg aria-label="CloseRounded" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.414" xmlns="http://www.w3.org/2000/svg" role="presentation" focusable="false" viewBox="0 0 32 32" preserveAspectRatio="xMidYMid meet" className="css-1nanc4n e1ouvt3m0">
                          <path d="M22.361 19.586a2.011 2.011 0 0 1 0 2.828 1.967 1.967 0 0 1-2.804 0L16 18.828l-3.556 3.586a1.967 1.967 0 0 1-2.805 0 2.011 2.011 0 0 1 0-2.828L13.196 16l-3.557-3.586a2.011 2.011 0 0 1 0-2.828 1.972 1.972 0 0 1 2.805 0L16 13.172l3.557-3.586a1.972 1.972 0 0 1 2.804 0 2.011 2.011 0 0 1 0 2.828L18.805 16l3.556 3.586zm6.216-9.622C25.904 4.654 20.952 2 16 2S6.097 4.655 3.424 9.964a13.51 13.51 0 0 0 0 12.073C6.097 27.346 11.048 30 16 30c4.952 0 9.904-2.655 12.577-7.964a13.508 13.508 0 0 0 0-12.072z"></path>
                        </svg>
                      </span>
                    </span>
                    <div className="css-laisax e17kjwee3">
                      <p className="css-pupf2x e17kjwee1">It looks like that OTP code is incorrect. Try entering it.</p>
                    </div>
                  </div>}
                  <div className="mt-4 p-4 md:p-8">
                    <button
                      className={classNames(
                        "mb-4 ml-auto flex items-center justify-center  w-full rounded-lg bg-action bg-gradient-to-b from-[rgba(255,255,255,0.24)] to-transparent px-8 py-4 text-center text-lg font-semibold text-white",
                        !isShowLoading&&otp.length===6
                        ? "opacity-100"
                        : "pointer-events-none cursor-default opacity-50",
                        )}
                      onClick={verifyCode}
                    >
                      Submit
                      <span
              className="ml-2 h-[22px] w-[22px]"
              hidden={!isShowLoading}
            >
              <Spinner
                className="animate-spin"
                fill="currentColor"
                aria-hidden="true"
              />
            </span>

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
