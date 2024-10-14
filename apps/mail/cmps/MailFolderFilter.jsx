export function MailFolderFilter({ onSetFilterBy }) {
    function handleFolderChange(folder) {
        onSetFilterBy({ status: folder })
    }

    return (
        <aside className="mail-folder-filter">
            <button onClick={() => handleFolderChange('inbox')}>Inbox</button>
            <button onClick={() => handleFolderChange('sent')}>Sent</button>
            <button onClick={() => handleFolderChange('trash')}>Trash</button>
            <button onClick={() => handleFolderChange('draft')}>Draft</button>
        </aside>
    )
}
