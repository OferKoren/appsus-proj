import { HeaderFilter } from './HeaderFilter.jsx'

const { Link, NavLink } = ReactRouterDOM
const { useState, useEffect } = React

export function AppHeaderBase({ app, setApp, filterBy, onSetFilterBy, children }) {
    const [isSticky, setIsSticky] = useState(false)
    const [mainNavInfo, setMainNavInfo] = useState({ isOpen: false, ev: null })
    const handleScroll = () => {
        const offset = window.scrollY
        setIsSticky(offset > 0)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])
    function onToggleHeaderNav(ev) {
        if (mainNavInfo.isOpen) setMainNavInfo({ isOpen: false, ev: null })
        else setMainNavInfo({ isOpen: true, ev })
    }
    const isStickyClass = isSticky ? 'sticky' : ''
    const appNavIconSrc = './assets/img/notes-icons/app-nav-icon.svg'
    return (
        <header className={`app-header full ${isStickyClass}`}>
            {children && children}
            <Link to={`/${app}`}>
                <div className="logo-wrapper">
                    <span>{app}</span>
                    <img src={`./assets/img/logos/${app}.png`} alt="" />
                </div>
            </Link>

            <HeaderFilter app={app} filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            {/* <img src={appNavIconSrc} /> */}
            <button className="app-nav-btn btn" onClick={(ev) => onToggleHeaderNav(ev)}>
                <img src={appNavIconSrc} />
            </button>
            {mainNavInfo.isOpen && <HeaderNav setApp={setApp} ev={mainNavInfo.ev} />}
        </header>
    )
    function HeaderNav({ setApp, ev }) {
        const buttonRect = ev.target.getBoundingClientRect()
        const top = buttonRect.bottom
        const left = buttonRect.left

        const calculatedLeft = parseInt(left) + 'px'
        return (
            <nav className="header-nav" style={{ top, left: calculatedLeft, transform: 'translate(-80%, 12%)' }}>
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
                <NavLink to="/note" onClick={() => setApp('Note')}>
                    <div className="img-wrapper">
                        <img src="./assets/img/notes-icons/keep-nav-icon2.png" alt="" />
                    </div>
                </NavLink>
            </nav>
        )
    }
}
