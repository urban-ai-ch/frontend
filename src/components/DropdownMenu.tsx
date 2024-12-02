export function DropdownMenu({ name, options, placeholder, onChange }: { name: string, options: { label: string; value: any }[], placeholder: string, onChange: (value: any) => void; }) {


    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedIndex = event.target.selectedIndex - 1;
        const selectedOption = options[selectedIndex];
        if (selectedOption) {
            onChange(selectedOption.value);
        }
    };

    return (
        <div>
            <select
                id={name}
                name={name}
                onChange={handleChange}
            >
                <option value="" disabled selected>
                    {placeholder}
                </option>
                {options.map((option, index) => (
                    <option key={index} value={option.label}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
