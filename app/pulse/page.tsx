import Table from '../../components/molecules/Table'
import { useTokens } from '../../hooks/useTokens'

export default function PulsePage() {
  const { data, isLoading, isError } = useTokens()

  return (
    <main className="min-h-screen p-6">
      <h2 className="text-2xl font-semibold mb-4">Pulse — Token Discovery</h2>

      {isLoading && <div className="text-sm text-slate-500">Loading tokens…</div>}
      {isError && <div className="text-sm text-rose-600">Failed to load tokens</div>}

      {data && <Table data={data} />}
    </main>
  )
}
