import { Search } from 'lucide-react'
import Input from './ui/Input'

function SearchBar({ value, onChange }) {
  return (
    <label className="searchbar" aria-label="Search tasks">
      <Search size={16} />
      <Input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search tasks by title"
        aria-label="Search tasks by title"
      />
    </label>
  )
}

export default SearchBar
