const { useState, useEffect } = React
const { useLocation, useNavigate } = ReactRouterDOM

export function NoteFilter({ filterBy, onSetFilterBy }) {
    const [search, setSearch] = useState('')
    const navigate = useNavigate()
    const location = useLocation()

    const currPath = location.pathname
    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break

            case 'checkbox':
                value = target.checked
                break
        }
        onSetFilterBy({ [field]: value })
        setSearch(value)
    }
    function handleClickOnSearch() {
        if (!currPath.includes('search')) {
            navigate('/note/search')
        }
    }
    function handleCloseBtn() {
        const param = currPath.split('/note/search')[1]
        setSearch('')
        if (search && !param) {
            // onSetFilterBy(noteService.getDefaultFilter())
            return
        }
        if (param || search) navigate('/note/search')
        else navigate('/note/noteHome')
        // onSetFilterBy(noteService.getDefaultFilter())
    }
    const xIconSrc = './assets/img/notes-icons/x-icon.svg'
    const searchIcon = './assets/img/notes-icons/search-icon.svg'
    return (
        <section className="filterBy-wrapper" onClick={handleClickOnSearch}>
            <form action="" className={'note-filterBy'}>
                <label htmlFor="txt" className="note-filter-by-label">
                    <img src={searchIcon} alt="" />
                </label>
                <input type="text" placeholder="Search" className="note-filter-by-txt" name="txt" onChange={handleChange} value={search} />
                {currPath.includes('search') && (
                    <button
                        className="btn close-Btn"
                        onClick={(ev) => {
                            ev.stopPropagation()
                            handleCloseBtn()
                        }}
                    >
                        <img src={xIconSrc} alt="" />
                    </button>
                )}
            </form>
        </section>
    )
}
