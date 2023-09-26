import ErrorPage from "@/screens/errorPage";
import Events, {
  loader as eventLoader,
  action as eventAction,
} from "@/screens/event";
import OriginalPrice, {
  action as originalPriceAction,
} from "@/screens/originalPrice";
import SellingPrice, {
  action as sellingPriceAction,
} from "@/screens/selling-price";
import TicketInfo, { action as tInfoAction } from "@/screens/ticketInfo";
import { createBrowserRouter } from "react-router-dom";
import File from "@/screens/files";
import PhoneDetails from "@/screens/phoneDetails";
import Summary from "@/screens/summary";

export const routes = {
  MAIN: {
    event: "event",
    files: "files",
    ticketInfo: "ticket-info",
    originalPrice: "original-price",
    phoneDetails: "phone-details",
    summary: "summary",
    sellingPrice: "selling-price",
  },
};

export const router = createBrowserRouter(
  [
    {
      path: "/",
      errorElement: <ErrorPage />,

      children: [
        {
          index: true,
          loader: eventLoader,
          action: eventAction,
          element: <Events />,
        },
        {
          path: routes.MAIN.files,
          element: <File />,
        },
        {
          path: routes.MAIN.ticketInfo,
          action: tInfoAction,
          element: <TicketInfo />,
        },
        {
          path: routes.MAIN.originalPrice,
          element: <OriginalPrice />,
          action: originalPriceAction,
        },
        {
          path: routes.MAIN.sellingPrice,
          element: <SellingPrice />,
          action: sellingPriceAction,
        },
        {
          path: routes.MAIN.phoneDetails,
          element: <PhoneDetails />,
        },
        {
          path: routes.MAIN.summary,
          element: <Summary />,
        },
      ],
    },
  ],
  { basename: "/sell-ticket" },
);
