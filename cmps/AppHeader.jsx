import { HeaderFilter } from './HeaderFilter.jsx'

const { Link, NavLink } = ReactRouterDOM
const { useState } = React

export function AppHeader(props) {
    console.log(props)
    switch (props.app) {
        case 'Appsus':
            return <AppHeaderBase {...props} />
        case 'Note':
            return <NoteHeader {...props} />
        case 'Mail':
            return <AppHeaderBase {...props} />
    }
}
