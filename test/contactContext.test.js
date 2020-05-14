import { reducer } from '../src/context/ContactContext'

const data = [
  {
    firstName: 'John',
    lastName: 'Doe',
    available: false,
    phone: '111-222-3333',
    email: 'john@doe.com',
    image: 'https://someimage.com/1.png',
  },
  {
    firstName: 'Moreno',
    lastName: 'Torichelli',
    available: false,
    phone: '666-777-8888',
    email: 'moreno@hotmail.com',
    image: 'https://someimage.com/2.png',
  },
  {
    firstName: 'Clarence',
    lastName: 'Lyndsey',
    available: true,
    phone: '123-456-7890',
    email: 'john@doe.com',
    image: 'https://someimage.com/3.png',
  },
]

describe('Contact Context', () => {
  it('should set a start loading flag', () => {
    const state = { contacts: [], contactsFiltered: [], error: undefined, loading: false }
    const newState = reducer(state, {
      type: 'START',
      payload: {},
    })

    expect(newState.loading).toBeTruthy()
  })

  it('should complete loading and unset flag', () => {
    const state = { contacts: [], contactsFiltered: [], error: undefined, loading: true }
    const newState = reducer(state, {
      type: 'COMPLETE',
      payload: {},
    })

    expect(newState.loading).not.toBeTruthy()
  })

  it('should set a list of contacts', () => {
    const state = { contacts: [], contactsFiltered: [], error: undefined, loading: false }
    const newState = reducer(state, {
      type: 'ADD_CONTACTS',
      payload: { data },
    })

    expect(newState).toEqual({
      contacts: data,
      contactsFiltered: data,
      error: undefined,
      loading: false,
    })
  })

  it('should fail and not set a list of contacts', () => {
    const state = { contacts: [], contactsFiltered: [], error: undefined, loading: false }
    const newState = reducer(state, {
      type: 'ADD_CONTACTS',
      payload: { data: [], error: 'Host unreachable' },
    })

    expect(newState).toEqual({
      contacts: [],
      contactsFiltered: [],
      error: 'Host unreachable',
      loading: false,
    })
  })

  it('should perform search of contacts', () => {
    const state = { contacts: data, contactsFiltered: data, error: undefined, loading: false }
    const newState = reducer(state, {
      type: 'SEARCH_CONTACTS',
      payload: 777,
    })

    expect(newState).toEqual({
      contacts: data,
      contactsFiltered: data.filter((c) => c.phone.search(/777/) !== -1),
      error: undefined,
      loading: false,
    })
  })
})
