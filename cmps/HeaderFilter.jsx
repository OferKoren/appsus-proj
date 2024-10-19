import { MailFilter } from '../apps/mail/cmps/MailFilter.jsx'
import { NoteFilter } from '../apps/note/cmps/NoteFilter.jsx'
import { noteService } from '../apps/note/services/note.service.js'
export function HeaderFilter({ app, filterBy, onSetFilterBy }) {
    switch (app) {
        case 'Mail': {
            return <MailFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
        }
        case 'Keep': {
            return <NoteFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} noteService={noteService} />
        }
    }
    return
}
