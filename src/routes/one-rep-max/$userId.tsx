import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/one-rep-max/$userId")({
  component: OneRepMaxPage,
});

function OneRepMaxPage() {
  const { userId } = Route.useParams();

  return (
    <div>
      <h1>One Rep Max for User: {userId}</h1>
    </div>
  );
}
