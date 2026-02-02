import { createFileRoute } from "@tanstack/react-router";
import { useOneRepMax } from "../../hooks/useOneRepMax";

export const Route = createFileRoute("/one-rep-max/$userId")({
  component: OneRepMaxPage,
});

function OneRepMaxPage() {
  const { userId } = Route.useParams();
  const { oneRepMaxQuery } = useOneRepMax(userId);

  if (oneRepMaxQuery.isPending) {
    return <div>Loading...</div>;
  }

  if (oneRepMaxQuery.isError) {
    return <div>{oneRepMaxQuery.error.message}</div>;
  }

  console.log(oneRepMaxQuery.data);

  return oneRepMaxQuery.data.map((el) => (
    <>
      <div>{el.exercise_name}</div>
      <div>{el.original_one_rep_max}</div>
      <div>{el.current_one_rep_max}</div>
    </>
  ));
}
