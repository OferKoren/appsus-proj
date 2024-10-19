const { useState } = React

export function MailHeader({ onSetFilterBy }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    function toggleSidebar() {
        setIsSidebarOpen(!isSidebarOpen)
    }

    function handleFolderChange(folder) {
        onSetFilterBy({ status: folder })
        toggleSidebar()
    }

    return (
        <header className="mail-header">
            <div className="header-content">
                <button className="hamburger-btn" onClick={toggleSidebar}>
                    <div className={`hamburger ${isSidebarOpen ? 'open' : ''}`}>
                        <div className="line"></div>
                        <div className="line"></div>
                        <div className="line"></div>
                    </div>
                </button>
                <div className="logo">Your Logo</div>
            </div>

            <aside className={`mail-sidebar ${isSidebarOpen ? 'active' : ''}`}>
                <div className="sidebar-content">
                    <button className="compose-btn">
                        <i className="fa-solid fa-pen"></i> Compose
                    </button>
                    <hr className="sidebar-separator" />
                    <ul className="sidebar-menu">
                        <li onClick={() => handleFolderChange('inbox')}>
                            <i className="fa-solid fa-inbox"></i> Inbox
                        </li>
                        <li onClick={() => handleFolderChange('starred')}>
                            <i className="fa-regular fa-star"></i> Starred
                        </li>
                        <li onClick={() => handleFolderChange('sent')}>
                            <i className="fa-solid fa-paper-plane"></i> Sent
                        </li>
                        <li onClick={() => handleFolderChange('draft')}>
                            <i className="fa-solid fa-file"></i> Draft
                        </li>
                        <li onClick={() => handleFolderChange('trash')}>
                            <i className="fa-solid fa-trash-can"></i> Trash
                        </li>
                    </ul>
                </div>
            </aside>
        </header>
    )
}
