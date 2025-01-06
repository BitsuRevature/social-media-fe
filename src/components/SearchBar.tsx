import { debounce } from "../util/debounce";
import { useAppDispatch } from "../app/hooks";
import { getPosts } from "../features/post/postSlice";
import { Input } from "@mui/joy";
import SearchIcon from '@mui/icons-material/Search'
import { InputAdornment } from "@mui/material";

export default function SearchBar() {

  const dispatch = useAppDispatch();

  // Function to handle search term changes
  function handleChange(term: string): void {
    dispatch(getPosts(term));
  }

  // Debounce the change handler
  const debouncedHandleChange = debounce(handleChange);

  return (
  
    <Input
      placeholder={`Search posts...`}
      name="query"
      id="query"
      defaultValue={""}
      onChange={(e) => debouncedHandleChange(e.target.value)}
      startDecorator={<SearchIcon />} 
    />          
  );
}
