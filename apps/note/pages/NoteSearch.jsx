import { AddNote } from '../cmps/AddNote.jsx'
import { NoteList } from '../cmps/NoteList.jsx'
const { useLocation, useNavigate, useParams } = ReactRouterDOM

export function NoteSearch({ listNoteProps, setFilterBy, setPage }) {
    const params = useParams()
    const navigate = useNavigate()
    return (
        <React.Fragment>
            {/* <h2>current params{params.filterBy}</h2> */}
            {setFilterBy && <SearchCategories setFilterBy={setFilterBy} />}
            {!setFilterBy && <NoteList {...listNoteProps} />}
        </React.Fragment>
    )
}
function SearchCategories({ setFilterBy }) {
    const params = useParams()
    const navigate = useNavigate()
    function changeCategory(newCatgery) {
        navigate(`/note/search/${newCatgery}`)
        setFilterBy((prevFilter) => ({ ...prevFilter, type: newCatgery }))
    }
    const checkedBoxSrc = './assets/img/notes-icons/checked-box-icon.svg'
    const youtubeSrc = './assets/img/notes-icons/youtube-icon.svg'
    const imgIconSrc = './assets/img/notes-icons/add-pitcure-icon.svg'
    const textIcon = './assets/img/notes-icons/text-icon.svg'
    return (
        <section className="categories-container">
            <div className="categroy-card type" onClick={() => changeCategory('NoteTxt')}>
                <img src={textIcon} style={{ width: '2em', height: '2em' }} alt="" />
            </div>
            <div className="categroy-card type" onClick={() => changeCategory('NoteTodo')}>
                <img src={checkedBoxSrc} style={{ width: '2em', height: '2em' }} alt="" />
            </div>
            <div className="categroy-card type" onClick={() => changeCategory('NoteImg')}>
                <img src={imgIconSrc} style={{ width: '2em', height: '2em' }} alt="" />
            </div>
            <div className="categroy-card type" onClick={() => changeCategory('NoteVideo')}>
                <img src={youtubeSrc} style={{ width: '2.5em', height: '2.5em' }} alt="" />
            </div>
        </section>
    )
}
