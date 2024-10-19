const { useEffect, useState } = React
const { Link, useSearchParams } = ReactRouterDOM

export function MailFilter({ filterBy, onSetFilterBy }) {
    const [searchTxt, setSearchTxt] = useState('')
    // const [searchTxt, setSearchTxt] = useState(filterBy.txt || '')

    function handleChange({ target }) {
        const { value } = target
        setSearchTxt(value)
        onSetFilterBy({ txt: value })
    }

    return (
        <div className="filterBy-wrapper">
            <div className="mail-filterBy">
                <i className="fa fa-search search-icon"></i> 
                <input
                    className="mail-filter-by-txt"
                    type="text"
                    value={searchTxt}
                    onChange={handleChange}
                />
            </div>
        </div>
    )
}