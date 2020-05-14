import { useReducer } from 'react'
import constate from 'constate'

// contacts is direct representation of api call
// contactsFiltered contains records shown on the screen, which could be after search
// in case of api fetch problems, error will contain more information on what happened
const initialState = {
  contacts: [],
  contactsFiltered: [],
  loading: false,
  error: undefined,
}

// this should be imported from constants file
const searchTerms = ['firstName', 'lastName', 'phone', 'email']

export const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_CONTACTS':
      // merge contacts
      return {
        ...state,
        contacts: [...state.contacts, ...action.payload.data],
        contactsFiltered: [...state.contacts, ...action.payload.data],
        error: action.payload.error,
      }
    case 'SEARCH_CONTACTS':
      // searching could be improved to support multiple terms
      // now it just performs simple string search
      return {
        ...state,
        contactsFiltered: state.contacts.filter((contact) =>
          searchTerms.some((term) => contact[term].search(new RegExp(action.payload, 'i')) !== -1)
        ),
      }
    case 'START':
      return {
        ...state,
        loading: true,
      }
    case 'COMPLETE':
      return {
        ...state,
        loading: false,
      }
    default:
      throw new Error()
  }
}

const useContacts = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { contacts, contactsFiltered, loading } = state
  // action used before starting async api call
  const startLoading = () => {
    dispatch({
      type: 'START',
      payload: {},
    })
  }
  // action for completing call
  const completeLoading = () => {
    dispatch({
      type: 'COMPLETE',
      payload: {},
    })
  }
  // load all contacts into the store after api call has been completed
  const addContacts = (payload) => {
    const contacts = payload.data || []
    dispatch({
      type: 'ADD_CONTACTS',
      payload: { ...payload, data: contacts },
    })
  }
  // action dispatched when hitting enter/glass icon in search bar
  const searchContacts = (payload) => {
    dispatch({
      type: 'SEARCH_CONTACTS',
      payload,
    })
  }

  return {
    contacts,
    contactsFiltered,
    loading,
    startLoading,
    completeLoading,
    addContacts,
    searchContacts,
  }
}

export const [ContactsProvider, useContactsContext] = constate(useContacts)
