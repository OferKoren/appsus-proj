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
}) {
    const notesMap = mapNotes()
    const pinRef = useRef()
    const navigate = useNavigate()
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
        return noteArr.map((note) => {
            const notActiveSrc = './assets/img/notes-icons/pinned-not-active.svg'
            const activeSrc = './assets/img/notes-icons/pinned-active-icon.svg'
            const threeDots = './assets/img/notes-icons/small-three-dots-icon.svg'
            const colorPalletSrc = './assets/img/notes-icons/color-pallet-icon.svg'
            const mailIconSrc = './assets/img/notes-icons/mail-icon.svg'
            return (
                <div key={note.id} className="note-wrapper" onClick={() => onEditNote(note)}>
                    <div className="btns-wrapper">
                        <button className="delete-btn btn" onClick={(ev) => onDeleteNote(ev, note.id)}>
                            🗑️
                        </button>

                        <button className="pin-btn btn" onClick={(ev) => togglePin(ev, note)}>
                            <img ref={pinRef} src={note.isPinned ? activeSrc : notActiveSrc} alt="" />
                        </button>
                        {/* <button className="dup-btn btn" onClick={() => onDuplicate(note)}>
                            Duplicate
                        </button> */}
                        <div className="bottom-btns">
                            <button className="btn more-btn">
                                <img src={threeDots} alt="" />
                            </button>

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
                        </div>
                    </div>

                    <NotePreview notes={notes} onUpdateNote={onUpdateNote} note={note} />
                </div>
            )
        })
    }

    return (
        <section className="note-list-container">
            <h2>Pinned Notes</h2>
            <section className="note-list pinned">{createNoteList(notesMap.pinned)}</section>

            <h2>Rest Of The Notes</h2>

            <section className="note-list others">{createNoteList(notesMap.others)}</section>
        </section>
    )
}
