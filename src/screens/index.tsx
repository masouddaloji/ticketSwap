import { Link } from "react-router-dom";

export default function Main() {
  return (
    <>
      <Link
        to="/event"
        id="sell-ticket"
        className="rounded-lg bg-[#00ce5c] px-6 py-3 font-semibold text-white"
      >
        Sell tickets
      </Link>
    </>
  );
}
