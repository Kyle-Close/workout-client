import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/users/$userId/programs/$programId/weeks/$weekId/logs',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>Hello "/users/$userId/programs/$programId/weeks/$weekId/logs"!</div>
  )
}
