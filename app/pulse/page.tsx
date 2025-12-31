import Badge from '../../components/atoms/Badge'

export default function PulsePage() {
  return (
    <main className="min-h-screen p-6">
      <h2 className="text-2xl font-semibold mb-4">Pulse — Token Discovery (scaffold)</h2>

      <div className="flex gap-2 items-center">
        <Badge>New pairs</Badge>
        <Badge variant="success">Final Stretch</Badge>
        <Badge variant="danger">Migrated</Badge>
      </div>
    </main>
  )
}
