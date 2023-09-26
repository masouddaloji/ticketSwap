import { useRouteError } from "react-router-dom";

type ErrorResponseType = {
  status: number;
  statusText: string;
  internal: boolean;
  data: string;
  error: {
    message: string;
    stack: string;
  };
};

export default function ErrorPage() {
  const error = useRouteError() as ErrorResponseType;
  // console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error?.statusText || error?.error?.message}</i>
      </p>
    </div>
  );
}
