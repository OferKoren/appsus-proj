import { MailFilter } from '../apps/mail/cmps/MailFilter.jsx'

export function HeaderFilter({ app, filterBy, onSetFilterBy }) {
    switch (app) {
        case 'Mail': {
            return <MailFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
        }
    }
    return
}
