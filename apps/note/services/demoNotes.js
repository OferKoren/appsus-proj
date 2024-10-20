export const getDemoNotes = _createDemoNotes
const colors = ['white', '#FAAFA8', '#F39F76', '#FFF8B8', '#E2F6D3', '#B4DDD3', '#D4E4ED', '#AECCDC', '#D3BFDB', '#F6E2DD', '#E9E3D4', '#EFEFF1']
function _createDemoNotes() {
    return [
        {
            id: 'asdasd',
            createdAt: 1112224,
            type: 'NoteTodo',
            isPinned: true,
            info: {
                title: 'Grocceries',
                todos: [
                    { txt: 'Apples', doneAt: null, id: 213 },
                    { txt: 'Bananas', doneAt: 134234234, id: 214 },
                    { txt: 'Carrots', doneAt: 12312423, id: 215 },
                    { txt: 'Tomatoes', doneAt: null, id: 216 },
                    { txt: 'Bread', doneAt: null, id: 217 },
                    { txt: 'Milk', doneAt: null, id: 218 },
                    { txt: 'Eggs', doneAt: null, id: 219 },
                    { txt: 'Cheese', doneAt: 123132, id: 220 },
                    { txt: 'Chicken', doneAt: null, id: 221 },
                    { txt: 'Rice', doneAt: null, id: 222 },
                ],
            },
        },
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
            id: 'n103',
            createdAt: 11123222,
            type: 'NoteVideo',
            isPinned: false,
            style: {
                backgroundColor: '#FFF8B8',
            },
            info: {
                txt: 'donna is awesome',
                videoUrl: `https://www.youtube.com/embed/LAd2n-Fw7q4`,
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
                url: './assets/img/ofer-img.jpg',
                title: 'Ofer trekking',
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
