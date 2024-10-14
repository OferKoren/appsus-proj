const { useEffect, useState } = React
const { Link, useSearchParams } = ReactRouterDOM

export function MailFilter({ filterBy, onSetFilterBy }) {
    const [searchTxt, setSearchTxt] = useState(filterBy.txt || '')

    function handleChange({ target }) {
        const { value } = target
        setSearchTxt(value)
        onSetFilterBy({ txt: value })
    }

    return (
        <section className="mail-filter">
            <input
                type="text"
                placeholder="Search mails"
                value={searchTxt}
                onChange={handleChange}
            />
        </section>
    )
}
