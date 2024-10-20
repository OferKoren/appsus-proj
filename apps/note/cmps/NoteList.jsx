import { NotePreview } from '../cmps/NotePreview.jsx'
const { useState, useEffect, useRef } = React
const { useNavigate } = ReactRouterDOM
export function NoteList({
    notes,
    onDeleteNote,
    onUpdateNote,
    isClrRef,
    onDuplicate,
    onEditNote,
    onToggleColorPicker,
    togglePickerRef,
    setIsClrBtn,
    noteRef,
    page,
    onArchive,
    onTrash,
    returnNoteToHome,
}) {
    const notesMap = mapNotes()
    const pinRef = useRef()
    const noteListRef = useRef(null)
    const [numOfColumns, setNumOfColums] = useState()
    const navigate = useNavigate()
    useEffect(() => {
        listenToResize()
        window.addEventListener('resize', listenToResize)
        return () => {
            window.removeEventListener('resize', listenToResize)
        }
    }, [])
    function listenToResize() {
        console.log(numOfColumns)
        let num = Math.floor(noteListRef.current.offsetWidth / 240)
        if (num === 0) num = 1
        setNumOfColums(() => num)
    }
    function mapNotes() {
        return notes.reduce(
            (map, note) => {
                if (note.isPinned) map.pinned.push(note)
                else map.others.push(note)
                return map
            },
            { pinned: [], others: [] }
        )
    }
    function togglePin(ev, note) {
        ev.stopPropagation()
        note.isPinned = !note.isPinned

        onUpdateNote(note)
    }
    function sendToMail(ev, note) {
        ev.stopPropagation()
        noteRef.current = { ...note }
        console.log(noteRef)
        navigate('/mail')
    }

    function createNoteList(noteArr) {
        const columsArr = []
        const elNotes = noteArr.map((note) => {
            const notActiveSrc = './assets/img/notes-icons/pinned-not-active.svg'
            const activeSrc = './assets/img/notes-icons/pinned-active-icon.svg'
            const threeDots = './assets/img/notes-icons/small-three-dots-icon.svg'
            const colorPalletSrc = './assets/img/notes-icons/color-pallet-icon.svg'
            const mailIconSrc = './assets/img/notes-icons/mail-icon.svg'
            const trashCanSrc = './assets/img/notes-icons/trash-can-icon.svg'
            const duplicateSrc = './assets/img/notes-icons/duplicate-icon.svg'
            const archiveSrc = './assets/img/notes-icons/archive-icon.svg'
            const returnArchiveSrc = './assets/img/notes-icons/return-archive-icon.svg'
            return (
                <div key={note.id} className="note-wrapper" style={note.style} onClick={() => onEditNote(note)}>
                    <button className="pin-btn btn" onClick={(ev) => togglePin(ev, note)}>
                        <img ref={pinRef} src={note.isPinned ? activeSrc : notActiveSrc} alt="" />
                    </button>
                    <NotePreview notes={notes} onUpdateNote={onUpdateNote} note={note} />

                    <div className="bottom-btns">
                        <button
                            className="btn color-btn"
                            onClick={(ev) => {
                                // setIsClrBtn(true)
                                ev.stopPropagation()
                                isClrRef.current = true
                                onToggleColorPicker(null, ev, note, onUpdateNote)
                            }}
                        >
                            <img src={colorPalletSrc} alt="" />
                        </button>
                        <button className="btn mail-btn" onClick={(ev) => sendToMail(ev, note)}>
                            <img src={mailIconSrc} alt="" />
                        </button>
                        <button
                            className="btn duplicate-btn"
                            onClick={(ev) => {
                                ev.stopPropagation()
                                onDuplicate(note)
                            }}
                        >
                            <img src={duplicateSrc} alt="" />
                        </button>

                        {page === 'archive' ? (
                            <button
                                className="btn archive-btn"
                                onClick={(ev) => {
                                    ev.stopPropagation()
                                    returnNoteToHome(note)
                                }}
                            >
                                <img src={returnArchiveSrc} alt="" />
                            </button>
                        ) : (
                            <button
                                className="btn archive-btn"
                                onClick={(ev) => {
                                    ev.stopPropagation()
                                    onArchive(note)
                                }}
                            >
                                <img src={archiveSrc} alt="" />
                            </button>
                        )}

                        <button
                            className="delete-note-btn- btn"
                            onClick={(ev) => {
                                ev.stopPropagation()
                                if (page === 'trash') onDeleteNote(ev, note.id)
                                else onTrash(note)
                            }}
                        >
                            <img src={trashCanSrc} alt="" />
                        </button>
                    </div>
                </div>
            )
        })
        for (let i = 0; i < numOfColumns; i++) {
            const column = (
                <div key={i} className={`note-list-column ${i}`}>
                    {elNotes.filter((note, idx) => {
                        return idx % numOfColumns === i
                    })}
                </div>
            )
            columsArr.push(column)
        }
        return columsArr
    }

    return (
        <section className="note-list-container" ref={noteListRef}>
            <h2>Pinned Notes</h2>
            <section className="note-list pinned">{createNoteList(notesMap.pinned)}</section>

            <h2>Rest Of The Notes</h2>

            <section className="note-list others">{createNoteList(notesMap.others)}</section>
        </section>
    )
}
