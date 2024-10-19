const { Link, NavLink } = ReactRouterDOM
export function NoteAside() {
    const lightbulbSrc = './assets/img/notes-icons/lightbulb-icon.svg'
    const archiveSrc = './assets/img/notes-icons/archive-icon.svg'
    const trashCanbSrc = './assets/img/notes-icons/trash-can-icon.svg'
    return (
        <aside className="note-aside vertical-full">
            <nav className="notes-nav">
                <NavLink to="/note/noteHome" className="aside-item">
                    <img src={lightbulbSrc} />
                    <span>notes</span>
                </NavLink>
                <NavLink to="/note/trash" className="aside-item">
                    <img src={archiveSrc} />
                    <span>archive</span>
                </NavLink>
                <NavLink to="/note/archive" className="aside-item">
                    <img src={trashCanbSrc} />
                    <span>trash</span>
                </NavLink>
            </nav>
        </aside>
    )
}
