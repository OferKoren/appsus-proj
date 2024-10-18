const { useState, useEffect } = React
export function NoteFilter({ filterBy, onSetFilterBy }) {
    const [search, setSearch] = useState('')

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
    const searchIcon = './assets/img/notes-icons/search-icon.svg'
    return (
        <section className="filterBy-wrapper">
            <form action="" className={'note-filterBy'}>
                <label htmlFor="txt">
                    <img src={searchIcon} alt="" />
                </label>
                <input type="text" className="note-filter-by-txt" name="txt" onChange={handleChange} value={search} />
            </form>
        </section>
    )
}
