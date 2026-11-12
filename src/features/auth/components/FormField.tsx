type FormFieldProps = {
  id: string;
  label: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  value: string;
  required?: boolean;
  autoComplete?: string;
  onChange: (value: string) => void;
};

export const FormField = ({
  id,
  label,
  type = "text",
  placeholder,
  value,
  required = false,
  autoComplete,
  onChange,
}: FormFieldProps) => {
  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="block text-sm mb-2 text-slate-700 dark:text-slate-300/90"
      >
        {label}
      </label>

      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        value={value}
        autoComplete={autoComplete}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl px-4 py-3 bg-slate-100 dark:bg-white/5
                   border border-slate-300 dark:border-white/10 outline-none
                   focus:border-slate-400 dark:focus:border-white/20
                   focus:ring-1 focus:ring-slate-300 dark:focus:ring-white/10
                   text-slate-900 dark:text-white
                   placeholder:text-slate-400 dark:placeholder:text-slate-500"
      />
    </div>
  );
};
