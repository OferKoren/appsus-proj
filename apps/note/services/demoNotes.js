export const getDemoNotes = _createDemoNotes

function _createDemoNotes() {
    return [
        {
            id: 'n101',
            createdAt: 1112222,
            type: 'NoteTxt',
            isPinned: true,
            style: {
                backgroundColor: '#00d',
            },
            info: {
                txt: 'Fullstack Me Baby!',
            },
        },
        {
            id: 'n102',
            createdAt: 11122242,
            type: 'NoteTxt',
            isPinned: false,
            style: {
                backgroundColor: '#00d',
            },
            info: {
                title: 'hello',
                txt: 'here we go again!',
            },
        },
        {
            id: 'n103',
            createdAt: 11123222,
            type: 'NoteTxt',
            isPinned: false,
            style: {
                backgroundColor: '#00d',
            },
            info: {
                txt: 'dear diary. its been 8 days since i last wrote you',
            },
        },
        {
            id: 'n104',
            createdAt: 1112222,
            type: 'NoteTxt',
            isPinned: false,
            style: {
                backgroundColor: '#00d',
            },
            info: {
                txt: 'Take me to church i worship like a dog at the shrine of your lies..',
            },
        },
        {
            id: 'n105',
            createdAt: 1112222,
            type: 'NoteTxt',
            isPinned: true,
            style: {
                backgroundColor: '#00d',
            },
            info: {
                txt: 'birthday to mom...',
            },
        },
        {
            id: 'n106',
            createdAt: 1112222,
            type: 'NoteTxt',
            isPinned: false,
            style: {
                backgroundColor: '#00d',
            },
            info: {
                title: 'list of students',
                txt: 'ron wisley, harry potter,james bond,percy jackson',
            },
        },
        {
            id: 'n107',
            createdAt: 1112222,
            type: 'NoteTxt',
            isPinned: false,
            style: {
                backgroundColor: '#00d',
            },
            info: {
                title: 'mission to do ',
                txt: 'Fullstack Me Baby!',
            },
        },
        {
            id: 'n108',
            createdAt: 1112223,
            type: 'NoteImg',
            isPinned: false,
            info: {
                url: 'http://some-img/me',
                title: 'Bobi and Me',
            },
            style: {
                backgroundColor: '#00d',
            },
        },
        {
            id: 'n109',
            createdAt: 1112224,
            type: 'NoteTodos',
            isPinned: false,
            info: {
                title: 'Get my stuff together',
                todos: [
                    { txt: 'Driving license', doneAt: null },
                    { txt: 'Coding power', doneAt: 187111111 },
                ],
            },
        },
    ]
}
