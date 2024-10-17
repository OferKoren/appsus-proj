export const getDemoNotes = _createDemoNotes
const colors = ['white', '#FAAFA8', '#F39F76', '#FFF8B8', '#E2F6D3', '#B4DDD3', '#D4E4ED', '#AECCDC', '#D3BFDB', '#F6E2DD', '#E9E3D4', '#EFEFF1']
function _createDemoNotes() {
    return [
        {
            id: 'n101',
            createdAt: 1112222,
            type: 'NoteTxt',
            isPinned: true,
            style: {
                backgroundColor: 'white',
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
                backgroundColor: 'white',
            },
            info: {
                title: 'white',
                txt: 'here we go again!',
            },
        },
        {
            id: 'n103',
            createdAt: 11123222,
            type: 'NoteTxt',
            isPinned: false,
            style: {
                backgroundColor: '#FFF8B8',
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
                backgroundColor: '#AECCDC',
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
                backgroundColor: '#AECCDC',
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
                backgroundColor: '#AECCDC',
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
                backgroundColor: '',
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
                backgroundColor: '#F39F76',
            },
        },
        {
            id: 'n109',
            createdAt: 1112224,
            type: 'NoteTodo',
            isPinned: false,
            info: {
                title: 'Get my stuff together',
                todos: [
                    { txt: 'Driving license', doneAt: null, id: 213 },
                    { txt: 'Coding power', doneAt: 187111111, id: 23212 },
                ],
            },
        },
    ]
}
