import { NoteTxt } from './NoteTxt.jsx'
import { NoteTodo } from './NoteTodo.jsx'
import { NoteImg } from './NoteImg.jsx'
import { NoteVideo } from './NoteVideo.jsx'
export function DynamicNote(props) {
    switch (props.note.type) {
        case 'NoteTxt':
            return <NoteTxt {...props} />
        case 'NoteTodo':
            return <NoteTodo {...props} />
    }
}
