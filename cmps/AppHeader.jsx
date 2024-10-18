import { AppHeaderBase } from './AppHeaderBase.jsx'
import { NoteHeader } from '../apps/note/cmps/Note-Header.jsx'

const { Link, NavLink } = ReactRouterDOM
const { useState } = React

export function AppHeader(props) {
    switch (props.app) {
        case 'Appsus':
            return <AppHeaderBase {...props} />
        case 'Keep':
            return <NoteHeader {...props} />
        case 'Mail':
            return <AppHeaderBase {...props} />
    }
}
