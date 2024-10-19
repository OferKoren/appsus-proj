import { AddNote } from '../cmps/AddNote.jsx'
import { NoteList } from '../cmps/NoteList.jsx'
const { useLocation, useNavigate, useParams } = ReactRouterDOM

export function NoteSearch({ listNoteProps, setFilterBy }) {
    const params = useParams()
    const navigate = useNavigate()
    return (
        <React.Fragment>
            <h2>current params{params.filterBy}</h2>
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
    return (
        <section className="categories-container">
            <div className="categroy-card type" onClick={() => changeCategory('NoteTxt')}>
                NoteTxt
            </div>
            <div className="categroy-card type" onClick={() => changeCategory('NoteTodo')}>
                NoteTodo
            </div>
            <div className="categroy-card type" onClick={() => changeCategory('NoteImg')}>
                NoteImg
            </div>
            <div className="categroy-card type" onClick={() => changeCategory('NoteVideo')}>
                NoteVideo
            </div>
        </section>
    )
}
