import { HeaderFilter } from './HeaderFilter.jsx'
import { NoteHeader } from '../apps/note/cmps/Note-Header.jsx'
import { AppHeaderBase } from './AppHeaderBase.jsx'

const { Link, NavLink } = ReactRouterDOM
const { useState } = React

export function AppHeader(props) {
    switch (props.app) {
        case 'Appsus':
            return <AppHeaderBase {...props} />
        case 'Note':
            return <NoteHeader {...props} />
        case 'Mail':
            return <AppHeaderBase />
    }
}
