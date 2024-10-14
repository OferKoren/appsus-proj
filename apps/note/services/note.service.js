//  import { loadFromStorage, makeId, saveToStorage, utilService } from './util.service.js'
import { storageService } from '../../../services/storage.service.js'

import { asyncStorageService } from '../../../services/async-storage.service.js'
import { getDemoNotes } from './demoNotes.js'

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
            notes = notes.filter((note) => regExp.test(note.title))
        }
        if (filterBy.price) {
            notes = notes.filter((note) => note.listPrice.amount <= filterBy.price)
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

function save(note) {
    if (note.id) {
        return asyncStorageService.put(NOTES_KEY, note)
    } else {
        const newNote = _createNote(note)
        return asyncStorageService.post(NOTES_KEY, newNote)
    }
}

function getEmptyNote(title = '', txt = '') {
    return { title, txt, type: 'NoteTxt', isPinned: false }
}

function getDefaultFilter() {
    return { txt: '', price: '' }
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
    const { txt, title, isPinned, type } = note
    return {
        createdAt,
        isPinned,
        type,
        info: { txt, title },
    }
}
