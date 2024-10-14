const { useState, useEffect } = React

export function MailFolderFilter({ onSetFilterBy }) {
    const [activeFolder, setActiveFolder] = useState('inbox')

    function handleFolderChange(folder) {
        setActiveFolder(folder)
        onSetFilterBy({ status: folder })
    }

    return (
        <aside className="mail-folder-filter">
            <button 
                data-folder="inbox"
                className={activeFolder === 'inbox' ? 'active' : ''} 
                onClick={() => handleFolderChange('inbox')}
            >
                <i className="fa-solid fa-inbox"></i> Inbox
            </button>
            <button 
                data-folder="starred"
                className={activeFolder === 'starred' ? 'active' : ''} 
                onClick={() => handleFolderChange('starred')}
            >
                <i className="fa-regular fa-star"></i> Starred
            </button>
            <button 
                data-folder="sent"
                className={activeFolder === 'sent' ? 'active' : ''} 
                onClick={() => handleFolderChange('sent')}
            >
                <i className="fa-solid fa-paper-plane"></i> Sent
            </button>
            <button 
                data-folder="draft"
                className={activeFolder === 'draft' ? 'active' : ''} 
                onClick={() => handleFolderChange('draft')}
            >
                <i className="fa-solid fa-file"></i> Draft
            </button>
            <button 
                data-folder="trash"
                className={activeFolder === 'trash' ? 'active' : ''} 
                onClick={() => handleFolderChange('trash')}
            >
                <i className="fa-solid fa-trash-can"></i> Trash
            </button>
        </aside>
    )
}
