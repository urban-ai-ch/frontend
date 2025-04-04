import "./DropdownMenu.css";

export function DropdownMenu({
  name,
  options,
  placeholder,
  onChange,
  enabled,
}: {
  name: string;
  options: { label: string; value: any }[];
  placeholder: string;
  onChange: (value: any) => void;
  enabled: boolean
}) {
  
  // Assume that the placeholder is the default value when nothing is selected
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedIndex = event.target.selectedIndex - 1;
        const selectedOption = options[selectedIndex];
        if (selectedOption) {
            onChange(selectedOption.value);
        }
    };


  return (
    <div className="dropdown-menu-map">
      <select
        disabled={enabled}
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
