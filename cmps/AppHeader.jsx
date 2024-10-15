import { HeaderFilter } from './HeaderFilter.jsx'

const { Link, NavLink } = ReactRouterDOM
const { useState } = React

export function AppHeader({ app, setApp, filterBy, onSetFilterBy }) {
    return (
        <header className="app-header full">
            <Link to={`/${app}`}>
                <div className="logo-wrapper">
                    <span>{app}</span>
                    <img src={`./assets/img/logos/${app}.png`} alt="" />
                </div>
            </Link>
            <HeaderFilter app={app} filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            <nav className="header-nav">
                <NavLink to="/" onClick={() => setApp('Appsus')}>
                    Home
                </NavLink>
                <NavLink to="/about" onClick={() => setApp('Appsus')}>
                    About
                </NavLink>
                <NavLink to="/mail" onClick={() => setApp('Mail')}>
                    <div className="img-wrapper">
                        <img src="./assets/img/gmail-icons/gmail-nav-icon2.png" alt="" />
                    </div>
                </NavLink>
                <NavLink to="/note" onClick={() => setApp('Keep')}>
                    <div className="img-wrapper">
                        <img src="./assets/img/notes-icons/keep-nav-icon2.png" alt="" />
                    </div>
                </NavLink>
            </nav>
        </header>
    )
}
