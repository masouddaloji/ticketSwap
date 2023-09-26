import { ArrowLeftIcon, Spinner } from "@/components/icons";
import { Link } from "react-router-dom";
import { useCallback, useState, Fragment } from "react";
import { useDropzone } from "react-dropzone";
import { routes } from "@/routes";
import { classNames } from "@/utils";
import { Dialog, Transition } from "@headlessui/react";
import { axiosInstance } from "@/lib/axios/axiosInstance";

type File = {
  name: string;
  src: string;
};

export default function File() {
  const [file, setFile] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState(true);
  const [uploadProgress, setUploadProgress] = useState(0);
  const onDrop = useCallback(async (acceptedFiles: any) => {
    const { event_id, ticket_id, ticket_seller_id } = JSON.parse(
      localStorage.getItem("data") || "",
    );
    const formData = new FormData();
    formData.append("uid", "1");
    formData.append("step", "2");
    formData.append("file", acceptedFiles[0]);
    formData.append("event_id", event_id);
    formData.append("ticket_id", ticket_id);
    formData.append("ticket_seller_id", ticket_seller_id);

    const { data } = await axiosInstance.post("/ticket", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total!,
        );
        setUploadProgress(percentCompleted);
      },
    });

    setFile({
      name: acceptedFiles[0].name,
      src: data.resp.data.data.pdf_screenshot.url,
    });
    setUploadProgress(0);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [],
    },
  });
  return (
    <>
      <h1 className="text-color mb-4 text-[2rem] font-bold md:text-[3.5rem]">
        Add your tickets
      </h1>
      <h3 className="mb-6 text-xl !text-foregroundMuted  md:text-2xl">
        Fans will only be able to see your tickets once they’ve bought them.
      </h3>
      <div>
        {file ? (
          <div className="bg-white">
            <h4 className="flex items-center justify-between text-lg uppercase !text-foreground md:text-xl">
              {file.name}
              <button
                className=" !text-[#fe4a49]"
                onClick={() => setFile(null)}
              >
                Remove file
              </button>
            </h4>
            <div className="my-6 flex  items-center  gap-14 rounded-xl px-12 py-6 shadow-[0_1px_2px_#1a21291a,0_4px_12px_#1a21291a] ">
              <div className="before:content-[' '] relative w-20 before:absolute before:-right-7 before:-top-4 before:-z-10 before:block before:h-[126%] before:w-[174%] before:rounded-full before:bg-[#f0fbfe]">
                <img
                  src={file.src}
                  alt={file.name}
                  className="w-full rounded-md"
                />
              </div>
              <div>
                <h4 className="text-lg font-semibold !text-action md:text-xl">
                  Ticket
                  <span className="ml-4 rounded-3xl  bg-[#00b6f0] px-2 py-1 text-xs !text-white">
                    FOR SALE
                  </span>
                </h4>
              </div>
            </div>
          </div>
        ) : null}
        {uploadProgress ? (
          <div>
            <div className="my-6 flex  items-center  gap-14 rounded-xl px-12 py-6 shadow-[0_1px_2px_#1a21291a,0_4px_12px_#1a21291a] ">
              <div className="before:content-[' '] relative flex h-32 w-24 items-center justify-center before:absolute before:-z-10 before:block before:h-[110%] before:w-[180%] before:rounded-full before:bg-[#50a7bf] ">
                <Spinner className="w-8 animate-spin  " />
              </div>
              <div className="flex w-full flex-col gap-2 pt-1">
                <progress
                  value={uploadProgress}
                  max={100}
                  className="h-1.5 w-full"
                />
                <span>Uploading...</span>
              </div>
            </div>
          </div>
        ) : null}
        <div
          className="mb-8 flex flex-col items-center gap-5 rounded-lg border-2  border-dashed border-action bg-elevatedBackground px-6 py-6 md:bg-[#f0fbfe]"
          {...getRootProps()}
        >
          <svg width="170px" height="100px">
            <defs>
              <path
                d="M30.1817656,21.6400525 L65.0526402,21.5458032 C68.3663366,21.5368469 71.0598788,24.2158681 71.0688351,27.5295645 C71.0688643,27.5403705 71.0688643,27.5511766 71.0688351,27.5619826 L70.9238815,81.243805 C70.9149679,84.5448485 68.2411636,87.2186597 64.9401202,87.2275818 L30.0692456,87.3218311 C26.7555492,87.3307874 24.062007,84.6517662 24.0530507,81.3380698 C24.0530215,81.3272638 24.0530215,81.3164577 24.0530507,81.3056517 L24.1980043,27.6238292 C24.2069179,24.3227858 26.8807222,21.6489746 30.1817656,21.6400525 Z"
                id="path-1"
              ></path>
              <filter
                x="-63.8%"
                y="-36.5%"
                width="227.6%"
                height="191.2%"
                filterUnits="objectBoundingBox"
                id="filter-2"
              >
                <feOffset
                  dx="0"
                  dy="6"
                  in="SourceAlpha"
                  result="shadowOffsetOuter1"
                ></feOffset>
                <feGaussianBlur
                  stdDeviation="9"
                  in="shadowOffsetOuter1"
                  result="shadowBlurOuter1"
                ></feGaussianBlur>
                <feColorMatrix
                  values="0 0 0 0 0   0 0 0 0 0.0745098039   0 0 0 0 0.0980392157  0 0 0 0.08 0"
                  type="matrix"
                  in="shadowBlurOuter1"
                  result="shadowMatrixOuter1"
                ></feColorMatrix>
                <feOffset
                  dx="0"
                  dy="2"
                  in="SourceAlpha"
                  result="shadowOffsetOuter2"
                ></feOffset>
                <feGaussianBlur
                  stdDeviation="1.5"
                  in="shadowOffsetOuter2"
                  result="shadowBlurOuter2"
                ></feGaussianBlur>
                <feColorMatrix
                  values="0 0 0 0 0   0 0 0 0 0.0745098039   0 0 0 0 0.0980392157  0 0 0 0.16 0"
                  type="matrix"
                  in="shadowBlurOuter2"
                  result="shadowMatrixOuter2"
                ></feColorMatrix>
                <feMerge>
                  <feMergeNode in="shadowMatrixOuter1"></feMergeNode>
                  <feMergeNode in="shadowMatrixOuter2"></feMergeNode>
                </feMerge>
              </filter>
              <path
                d="M22.3893483,9.45624179 L57.1840938,9.39475924 C60.4977971,9.3889039 63.1888311,12.0704445 63.1946865,15.3841478 C63.1946989,15.391201 63.194699,15.3982542 63.1946866,15.4053074 L63.1000404,69.1938915 C63.0942241,72.4993346 60.4160947,75.1774839 57.1106517,75.1833246 L22.3159062,75.2448072 C19.0022029,75.2506625 16.3111689,72.5691219 16.3053135,69.2554186 C16.3053011,69.2483654 16.305301,69.2413122 16.3053134,69.234259 L16.3999596,15.4456749 C16.4057759,12.1402318 19.0839053,9.46208253 22.3893483,9.45624179 Z"
                id="path-3"
              ></path>
              <filter
                x="-64.0%"
                y="-36.4%"
                width="228.0%"
                height="191.1%"
                filterUnits="objectBoundingBox"
                id="filter-4"
              >
                <feOffset
                  dx="0"
                  dy="6"
                  in="SourceAlpha"
                  result="shadowOffsetOuter1"
                ></feOffset>
                <feGaussianBlur
                  stdDeviation="9"
                  in="shadowOffsetOuter1"
                  result="shadowBlurOuter1"
                ></feGaussianBlur>
                <feColorMatrix
                  values="0 0 0 0 0   0 0 0 0 0.0745098039   0 0 0 0 0.0980392157  0 0 0 0.08 0"
                  type="matrix"
                  in="shadowBlurOuter1"
                  result="shadowMatrixOuter1"
                ></feColorMatrix>
                <feOffset
                  dx="0"
                  dy="2"
                  in="SourceAlpha"
                  result="shadowOffsetOuter2"
                ></feOffset>
                <feGaussianBlur
                  stdDeviation="1.5"
                  in="shadowOffsetOuter2"
                  result="shadowBlurOuter2"
                ></feGaussianBlur>
                <feColorMatrix
                  values="0 0 0 0 0   0 0 0 0 0.0745098039   0 0 0 0 0.0980392157  0 0 0 0.16 0"
                  type="matrix"
                  in="shadowBlurOuter2"
                  result="shadowMatrixOuter2"
                ></feColorMatrix>
                <feMerge>
                  <feMergeNode in="shadowMatrixOuter1"></feMergeNode>
                  <feMergeNode in="shadowMatrixOuter2"></feMergeNode>
                </feMerge>
              </filter>
              <rect
                id="path-5"
                x="0"
                y="0"
                width="46.7647059"
                height="65.8307739"
                rx="6"
              ></rect>
              <filter
                x="-64.2%"
                y="-36.5%"
                width="228.3%"
                height="191.1%"
                filterUnits="objectBoundingBox"
                id="filter-6"
              >
                <feOffset
                  dx="0"
                  dy="6"
                  in="SourceAlpha"
                  result="shadowOffsetOuter1"
                ></feOffset>
                <feGaussianBlur
                  stdDeviation="9"
                  in="shadowOffsetOuter1"
                  result="shadowBlurOuter1"
                ></feGaussianBlur>
                <feColorMatrix
                  values="0 0 0 0 0   0 0 0 0 0.0745098039   0 0 0 0 0.0980392157  0 0 0 0.08 0"
                  type="matrix"
                  in="shadowBlurOuter1"
                  result="shadowMatrixOuter1"
                ></feColorMatrix>
                <feOffset
                  dx="0"
                  dy="2"
                  in="SourceAlpha"
                  result="shadowOffsetOuter2"
                ></feOffset>
                <feGaussianBlur
                  stdDeviation="1.5"
                  in="shadowOffsetOuter2"
                  result="shadowBlurOuter2"
                ></feGaussianBlur>
                <feColorMatrix
                  values="0 0 0 0 0   0 0 0 0 0.0745098039   0 0 0 0 0.0980392157  0 0 0 0.16 0"
                  type="matrix"
                  in="shadowBlurOuter2"
                  result="shadowMatrixOuter2"
                ></feColorMatrix>
                <feMerge>
                  <feMergeNode in="shadowMatrixOuter1"></feMergeNode>
                  <feMergeNode in="shadowMatrixOuter2"></feMergeNode>
                </feMerge>
              </filter>
              <path
                d="M15.75,15.75 L15.75,22.75 C15.75,23.716 14.966,24.5 14,24.5 C13.034,24.5 12.25,23.716 12.25,22.75 L12.25,15.75 L5.25,15.75 C4.284,15.75 3.5,14.966 3.5,14 C3.5,13.034 4.284,12.25 5.25,12.25 L12.25,12.25 L12.25,5.25 C12.25,4.284 13.034,3.5 14,3.5 C14.966,3.5 15.75,4.284 15.75,5.25 L15.75,12.25 L22.75,12.25 C23.716,12.25 24.5,13.034 24.5,14 C24.5,14.966 23.716,15.75 22.75,15.75 L15.75,15.75 Z"
                id="path-7"
              ></path>
            </defs>
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <ellipse
                id="Oval"
                fill="#00B6F0"
                opacity="0.159999996"
                cx="74"
                cy="53.5"
                rx="42"
                ry="42.5"
              ></ellipse>
              <g id="Group" transform="translate(51.000000, 3.000000)">
                <g
                  id="Rectangle-Copy-4"
                  transform="translate(47.560943, 54.433817) scale(-1, 1) rotate(-40.000000) translate(-47.560943, -54.433817) "
                >
                  <use
                    fill="black"
                    fillOpacity="1"
                    filter="url(#filter-2)"
                    xlinkHref="#path-1"
                  ></use>
                  <use
                    fill="#FFFFFF"
                    fillRule="evenodd"
                    xlinkHref="#path-1"
                  ></use>
                </g>
                <g
                  id="Rectangle-Copy-3"
                  transform="translate(39.750000, 42.319783) scale(-1, 1) rotate(-20.000000) translate(-39.750000, -42.319783) "
                >
                  <use
                    fill="black"
                    fillOpacity="1"
                    filter="url(#filter-4)"
                    xlinkHref="#path-3"
                  ></use>
                  <use
                    fill="#FFFFFF"
                    fillRule="evenodd"
                    xlinkHref="#path-3"
                  ></use>
                </g>
                <g id="Group-4" transform="translate(0.000000, -0.000000)">
                  <g id="Rectangle">
                    <use
                      fill="black"
                      fillOpacity="1"
                      filter="url(#filter-6)"
                      xlinkHref="#path-5"
                    ></use>
                    <use
                      fill="#FFFFFF"
                      fillRule="evenodd"
                      xlinkHref="#path-5"
                    ></use>
                  </g>
                  <g
                    id="Icons-/UI/-Plus-/-Solid"
                    transform="translate(9.352941, 18.789521)"
                  >
                    <mask id="mask-8" fill="white">
                      <use xlinkHref="#path-7"></use>
                    </mask>
                    <use
                      id="Mask"
                      fill="#00B6F0"
                      fillRule="evenodd"
                      xlinkHref="#path-7"
                    ></use>
                  </g>
                </g>
              </g>
            </g>
          </svg>
          <h3 className="text-lg font-semibold !text-foreground">
            Upload PDF or Apple Wallet tickets
          </h3>
          <p className="text-sm !text-foreground">
            If your original file contains multiple tickets make sure to upload
            all of them, and we will let you select the ones you want to sell.
          </p>
          <input {...getInputProps()} accept="" />
          {isDragActive ? (
            <p className="!text-action">Drop the files here ...</p>
          ) : (
            <p className="w-full rounded-lg bg-action  py-3 text-center text-lg font-semibold !text-white md:bg-transparent md:!text-action">
              Select a file
            </p>
          )}
        </div>
      </div>
      <div className="flex  flex-col-reverse gap-2 md:flex-row  md:justify-between">
        <Link
          to="/"
          className=" flex items-center justify-center gap-2 rounded-lg  bg-[#00b6f01f] bg-gradient-to-b from-[rgba(255,255,255,0.24)] to-transparent px-8 py-4 text-center text-lg font-semibold !text-action  md:w-max "
        >
          <span className="h-6 w-6">
            <ArrowLeftIcon fill="currentColor" />
          </span>
          <span>Previous</span>
        </Link>
        <Link
          to={"/" + routes.MAIN.ticketInfo}
          className={classNames(
            "ml-auto block rounded-lg  bg-action bg-gradient-to-b from-[rgba(255,255,255,0.24)] to-transparent px-8 py-4 text-center text-lg font-semibold text-white  md:w-max",
            file
              ? "!opacity-100"
              : "pointer-events-none cursor-default opacity-50",
          )}
        >
          Continue
        </Link>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
        >
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white  p-8 align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h2"
                    className="text-left text-2xl font-bold !text-foreground md:text-[2rem]"
                  >
                    Add your tickets
                  </Dialog.Title>
                  <p className=" text-color  my-4 text-left md:mt-4 md:text-xl">
                    Your tickets will remain private. Once sold, we'll transfer
                    them to the buyer and we will send the money to your bank. A
                    smooth, safe and zero-hassle experience for everyone
                    involved!
                  </p>
                  <button
                    className={classNames(
                      "block   rounded-lg bg-action bg-gradient-to-b from-[rgba(255,255,255,0.24)] to-transparent px-8 py-4 text-center text-lg font-semibold text-white",
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    Got it
                  </button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
