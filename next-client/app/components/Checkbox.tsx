interface CheckboxProps {
  name: string;
  label: string;
  checked: boolean;
  helperText?: string;
  handleChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

const Checkbox = ({
  name,
  label,
  checked,
  helperText,
  handleChange,
}: CheckboxProps) => {
  return (
    <div className="my-4">
      <label className="flex items-center	space-x-2">
        <input
          type="checkbox"
          id={name}
          name={name}
          checked={checked}
          onChange={handleChange}
          className="rounded-sm border-2 border-gray-300 accent-emerald-800 :ring-1 focus:ring-emerald-500 bg-white"
          aria-label={label}
        />
        <span className="text-gray-600 text-sm">{label}</span>
      </label>
      {helperText && <p className="text-gray-500  text-xs">{helperText}</p>}
    </div>
  );
};

export default Checkbox;
