import { AppHeaderBase } from '../../../cmps/AppHeaderBase.jsx'

export function NoteHeader(props) {
    console.log(props)
    function onToggleAsideMenu() {}
    const hamburgerSrc = './assets/img/notes-icons/hamburger-icon.svg'
    return (
        <AppHeaderBase {...props}>
            <button className="btn hamburger-btn">
                <img src={hamburgerSrc} alt="" />
            </button>
        </AppHeaderBase>
    )
}
