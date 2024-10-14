export function MailFolderFilter({ onSetFilterBy }) {
    function handleFolderChange(folder) {
        onSetFilterBy({ status: folder })
        setActiveButton(folder)
    }

    function setActiveButton(folder) {
        const buttons = document.querySelectorAll('.mail-folder-filter button')
        buttons.forEach(button => {
            button.classList.remove('active')
        })
        
        const activeButton = document.querySelector(`.mail-folder-filter button[data-folder="${folder}"]`)
        if (activeButton) {
            activeButton.classList.add('active')
        }
    }

    return (
        <aside className="mail-folder-filter">
            <button data-folder="inbox" onClick={() => handleFolderChange('inbox')}>
                <i className="fa-solid fa-inbox"></i> Inbox
            </button>
            <button data-folder="starred" onClick={() => handleFolderChange('starred')}>
                <i className="fa-regular fa-star"></i> Starred
            </button>
            <button data-folder="sent" onClick={() => handleFolderChange('sent')}>
                <i className="fa-solid fa-paper-plane"></i> Sent
            </button>
            <button data-folder="draft" onClick={() => handleFolderChange('draft')}>
                <i className="fa-solid fa-file"></i> Draft
            </button>
            <button data-folder="trash" onClick={() => handleFolderChange('trash')}>
                <i className="fa-solid fa-trash-can"></i> Trash
            </button>
        </aside>
    )
}
