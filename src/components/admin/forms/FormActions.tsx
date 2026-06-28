type Props = {
  pending: boolean;
  submitLabel: string;
  pendingLabel?: string;
  onCancel: () => void;
};

export function FormActions({
  pending,
  submitLabel,
  pendingLabel = "Enregistrement...",
  onCancel,
}: Props) {
  return (
    <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row sm:justify-end">
      <button
        type="button"
        onClick={onCancel}
        className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#1A2F1A]/20 bg-white px-6 text-sm font-semibold text-[#394B39] transition hover:bg-[#B7D8A8]/20"
      >
        Annuler
      </button>

      <button
        type="submit"
        name="submit"
        disabled={pending}
        className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#394B39] px-6 text-sm font-semibold text-white transition hover:bg-[#B7D8A8] hover:text-[#394B39] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? pendingLabel : submitLabel}
      </button>
    </div>
  );
}
