import { useSelector } from "react-redux";
import type { RootState } from "../../../../store/store";
import { useTimeFilter } from "../../../../hooks/useTimeFilter";

interface TimeDetailProps {
  label: string;
  dttm?: string;
  value?: string;
  helperText?: string | null;
}

export function TimeDetail({
  label,
  dttm,
  value,
  helperText,
}: TimeDetailProps) {
  const { user } = useSelector((state: RootState) => state.auth);

  const preferredTimezone = user?.preferredTimezone || "UTC";
  const { formatZonedDateTime } = useTimeFilter();

  const formattedDateTime = dttm
    ? formatZonedDateTime(dttm, preferredTimezone)
    : null;

  return (
    <div className="flex flex-col">
      <span className="mb-1 text-xs font-bold uppercase tracking-wider text-(--secondary-text)">
        {label}
      </span>

      {formattedDateTime?.dateStr && (
        <span className="text-sm font-semibold text-(--primary-text)">
          {formattedDateTime.dateStr}
        </span>
      )}

      {formattedDateTime?.timeStr && (
        <span className="mt-0.5 font-mono text-xs text-(--accent-font)">
          {formattedDateTime.timeStr}
        </span>
      )}

      {value && (
        <span className="text-sm font-semibold text-(--primary-text)">
          {value}
        </span>
      )}

      {helperText && (
        <span className="mt-0.5 text-xs font-medium text-amber-500">
          {helperText}
        </span>
      )}
    </div>
  );
}
