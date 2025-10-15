import './SearchInput.style.scss'

type SearchInputComponentProps = {
    search: string,
    setSearch: (value: string) => void
}

export default function SearchInputComponent({ search, setSearch }: SearchInputComponentProps) {
    return (
        <div className="SearchInputComponent">
            <form>
                <input
                    type="text"
                    role="search"
                    placeholder="Search for a Todo"
                    name="search"
                    value={ search }
                    onChange={ (e) => setSearch(e.target.value) }
                    />
            </form>
        </div>
    );
}