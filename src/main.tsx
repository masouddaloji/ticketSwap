import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/index.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("paev_sell_ticket_react")!).render(
  <React.StrictMode>
    <main className="mx-auto mt-8 max-w-3xl !bg-white p-4 md:p-8 sell-ticket-container">
      <RouterProvider router={router} fallbackElement={<div>Loading...</div>} />
    </main>
  </React.StrictMode>,
);
