import { debounce } from "../util/debounce";
import { Input } from "@mui/joy";
import SearchIcon from '@mui/icons-material/Search'
import { SxProps } from "@mui/material";

type SearchBarProps = {
  placeholder?: string
  defaultValue?: string
  onChange: (term: string) => void
  startDecorator?: string | React.ReactElement
  sx?: SxProps
}

export default function SearchBar({ placeholder, defaultValue, onChange, startDecorator, sx }: SearchBarProps) {

  // Function to handle search term changes
  function handleChange(term: string): void {
    onChange(term)
  }

  // Debounce the change handler
  const debouncedHandleChange = debounce(handleChange);

  return (
    <Input
      placeholder={placeholder ? placeholder : 'Search'}
      name="query"
      id="query"
      defaultValue={defaultValue ? defaultValue : ""}
      onChange={(e) => debouncedHandleChange(e.target.value)}
      startDecorator={startDecorator ? startDecorator : <SearchIcon />}
      sx={sx ? sx : { width: "100%" }}
    />
  );
}
