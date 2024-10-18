const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter
const { useState, useEffect } = React
import { AppHeader } from './cmps/AppHeader.jsx'
import { About } from './pages/About.jsx'
import { Home } from './pages/Home.jsx'
import { MailIndex } from './apps/mail/pages/MailIndex.jsx'
import { MailDetails } from './apps/mail/pages/MailDetails.jsx'
import { MailCompose } from './apps/mail/cmps/MailCompose.jsx'
import { NoteIndex } from './apps/note/pages/NoteIndex.jsx'

export function App() {
    const [app, setApp] = useState('Appsus')
    const [filterBy, setFilterBy] = useState({})

    function onSetFilterBy(newFilter) {
        setFilterBy((prevFilter) => ({ ...prevFilter, ...newFilter }))
    }
    useEffect(() => {
        switch (app) {
            case 'Mail':
                setFilterBy(() => ({
                    txt: '',
                    status: 'inbox',
                }))
                break
            case 'Keep':
                setFilterBy(() => ({
                    txt: '',
                    tag: '',
                }))
        }
    }, [app])
    return (
        <Router>
            <section className="app main-layout">
                <AppHeader app={app} setApp={(val) => setApp(val)} filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/mail" element={<MailIndex rootFilterBy={filterBy} setApp={setApp} />} />
                    <Route path="/mail/:mailId" element={<MailDetails />} />
                    <Route path="/mail/compose" element={<MailCompose />} />

                    <Route path="/note" element={<NoteIndex rootFilterBy={filterBy} setApp={setApp} />} />
                </Routes>
            </section>
        </Router>
    )
}
