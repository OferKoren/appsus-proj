import { NotePreview } from '../cmps/NotePreview.jsx'
const { useState, useEffect, useRef } = React
export function NoteList({ notes, onDeleteNote, onUpdateNote, onDuplicate }) {
    const notesMap = mapNotes()
    const pinRef = useRef()

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
    function togglePin(note) {
        note.isPinned = !note.isPinned

        onUpdateNote(note)
    }
    function createNoteList(noteArr) {
        return noteArr.map((note) => {
            const notActiveSrc = '../../../assets/img/notes-icons/pinned-not-active.svg'
            const activeSrc = '../../../assets/img/notes-icons/pinned-active-icon.svg'
            const threeDots = '../../../assets/img/notes-icons/small-three-dots-icon.svg'
            return (
                <div key={note.id} className="note-wrapper">
                    <div className="btns-wrapper">
                        <button className="delete-btn btn" onClick={() => onDeleteNote(note.id)}>
                            🗑️
                        </button>

                        <button className="pin-btn btn" onClick={() => togglePin(note)}>
                            <img ref={pinRef} src={note.isPinned ? activeSrc : notActiveSrc} alt="" />
                        </button>
                        {/* <button className="dup-btn btn" onClick={() => onDuplicate(note)}>
                            Duplicate
                        </button> */}
                        <button className="btn more-btn">
                            <img src={threeDots} alt="" />
                        </button>
                    </div>

                    <NotePreview onUpdateNote={onUpdateNote} note={note} />
                </div>
            )
        })
    }
    console.log(notesMap)
    return (
        <section className="note-list-container">
            <h2>Pinned Notes</h2>
            <section className="note-list pinned">{createNoteList(notesMap.pinned)}</section>

            <h2>Rest Of The Notes</h2>

            <section className="note-list others">{createNoteList(notesMap.others)}</section>
        </section>
    )
}
