//  import { loadFromStorage, makeId, saveToStorage, utilService } from './util.service.js'
import { storageService } from '../../../services/storage.service.js'

import { asyncStorageService } from '../../../services/async-storage.service.js'
import { getDemoNotes } from './demoNotes.js'
import { utilService, makeId } from '../../../services/util.service.js'
export const noteService = {
    query,
    getNoteById,
    remove,
    save,
    getEmptyNote,
    getDefaultFilter,
    getFilterFromSearchParams,
}

const NOTES_KEY = 'notesDB'
_createNotes()

function query(filterBy = {}) {
    return asyncStorageService.query(NOTES_KEY).then((notes) => {
        if (filterBy.txt) {
            const regExp = new RegExp(filterBy.txt, 'i')
            notes = notes.filter((note) => {
                const isInTitle = regExp.test(note.info.title)
                const isInTxt = regExp.test(note.info.txt)
                const isInTodos = regExp.test(JSON.stringify(note.info.todos, null, 2))
                return isInTitle || isInTxt || isInTodos
            })
        }
        if (filterBy.type) {
            notes = notes.filter((note) => note.type === filterBy.type)
        }

        return notes
    })
}

function getNoteById(note) {
    return asyncStorageService.get(NOTES_KEY, note).then(_setNextPrevBookId)
}

function remove(note) {
    // return Promise.reject('Oh No!')
    return asyncStorageService.remove(NOTES_KEY, note)
}

function save(note, isDup) {
    if (note.id) {
        return asyncStorageService.put(NOTES_KEY, note)
    } else {
        const newNote = isDup ? { ...note, id: makeId() } : _createNote(note)
        return asyncStorageService.post(NOTES_KEY, newNote)
    }
}

function getEmptyNote(title = '', txt = '') {
    // return { title, txt, type: 'NoteTxt', isPinned: false }
    return {
        type: 'NoteTxt',
        info: { txt: '', title: '', todos: [], url: '', videoUrl: '' },
        isPinned: false,
        style: {},
    }
}

function getDefaultFilter() {
    return { txt: '', tag: '', type: '' }
}

function getFilterFromSearchParams(searchParams) {
    const txt = searchParams.get('txt') || ''
    const price = searchParams.get('price') || ''
    return {
        txt,
        price,
    }
}

function _createNotes() {
    let notes = storageService.loadFromStorage(NOTES_KEY)
    if (!notes || !notes.length) {
        notes = getDemoNotes()
        storageService.saveToStorage(NOTES_KEY, notes)
    }
}

function _createNote(note) {
    const createdAt = Date.now()
    return {
        ...note,
        createdAt,
    }
}
