import "./DropdownMenu.css";

export function DropdownMenu({
  name,
  options,
  placeholder,
  onChange,
}: {
  name: string;
  options: { label: string; value: any }[];
  placeholder: string;
  onChange: (value: any) => void;
}) {
  // Assume that the placeholder is the default value when nothing is selected
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    onChange(selectedValue); // Send the selected value directly
  };

  return (
    <div>
      <select
        id={name}
        name={name}
        onChange={handleChange}
        defaultValue="" // This ensures the placeholder is displayed by default
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
