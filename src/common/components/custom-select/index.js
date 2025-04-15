import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

function CustomSelect({
  options = [],
  selectedValue,
  onValueChange,
  placeholder = 'Select a value',
  className,
  contentClassName = '',
  // ...props
}) {

  return (
    <Select value={selectedValue} onValueChange={onValueChange}>
      <SelectTrigger
        className={`w-[180px] bg-[rgb(var(--lb-purple-600))] text-white border-[rgb(var(--lb-purple-600))] hover:bg-[hsl(var(--lb-purple-950))] ${className}`}
      >
        <SelectValue placeholder={placeholder} className="text-white" />
      </SelectTrigger>
      <SelectContent
        className={`bg-[hsl(var(--lb-purple-950))] border-[rgb(var(--lb-purple-600))] ${contentClassName}`}
      >
        <SelectGroup>
          {options.map((option) => (
            <SelectItem
              key={option?.value}
              value={option?.value}
              className="text-white bg-[hsl(var(--lb-purple-950))] hover:bg-[hsl(var(--lb-purple-950))]"
            >
              {option?.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}



export default CustomSelect;
