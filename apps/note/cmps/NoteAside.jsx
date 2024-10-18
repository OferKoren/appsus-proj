const { Link, NavLink } = ReactRouterDOM
export function NoteAside() {
    return (
        <aside className="note-aside vertical-full">
            <nav className="notes-nav">
                <NavLink to="/note/noteHome">notes</NavLink>
                <NavLink to="/note/trash">trash</NavLink>
                <NavLink to="/note/archive">archive</NavLink>
            </nav>
        </aside>
    )
}
