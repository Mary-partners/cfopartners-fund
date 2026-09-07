export function ClientAccessChecklist({
  clients,
  defaultCheckedIds,
}: {
  clients: { id: string; name: string }[];
  defaultCheckedIds: string[];
}) {
  if (clients.length === 0) {
    return <p className="text-xs text-ink-2/50">No clients in the portfolio yet.</p>;
  }

  const checkedSet = new Set(defaultCheckedIds);

  return (
    <div className="flex max-h-48 flex-col gap-1.5 overflow-y-auto rounded-md border border-ink/10 p-2.5">
      {clients.map((client) => (
        <label key={client.id} className="flex items-center gap-2 text-sm text-ink-2">
          <input
            type="checkbox"
            name="clientIds"
            value={client.id}
            defaultChecked={checkedSet.has(client.id)}
            className="h-3.5 w-3.5 rounded border-ink/30"
          />
          {client.name}
        </label>
      ))}
    </div>
  );
}
