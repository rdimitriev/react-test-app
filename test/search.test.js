import React from 'react'
import ReactTestUtils from 'react-dom/test-utils'
import { ContactsProvider } from '../src/context/ContactContext'
import Search from '../src/components/Search'
import { createContainer } from './domManipulators'

describe('SearchForm', () => {
  let render, container
  const form = (id) => container.querySelector(`form[id="${id}"]`)

  beforeEach(() => {
    ;({ render, container } = createContainer())
  })

  it('renders a form', () => {
    render(
      <ContactsProvider>
        <Search />
      </ContactsProvider>
    )
    expect(form('searchForm')).not.toBeNull()
  })

  const expectToBeInputFieldOfTypeText = (formElement) => {
    expect(formElement).not.toBeNull()
    expect(formElement.tagName).toEqual('INPUT')
    expect(formElement.type).toEqual('text')
  }
  const field = (name) => form('searchForm').elements[name]
  const itRendersAsATextBox = (fieldName) =>
    it('renders as a text box', () => {
      render(
        <ContactsProvider>
          <Search />
        </ContactsProvider>
      )
      expectToBeInputFieldOfTypeText(field(fieldName))
    })
  const itIncludesTheExistingValue = (fieldName, fieldValue) =>
    it('includes the existing value', () => {
      render(
        <ContactsProvider>
          <Search {...{ [fieldValue]: 'value' }} />
        </ContactsProvider>
      )
      expect(field(fieldName).value).toEqual('value')
    })
  const itSubmitsExistingValue = (fieldName, fieldValue, value) =>
    it('saves existing value when submitted', async () => {
      expect.hasAssertions()
      render(
        <ContactsProvider>
          <Search {...{ [fieldValue]: value }} onSubmit={(props) => expect(props).toEqual(value)} />
        </ContactsProvider>
      )
      await ReactTestUtils.Simulate.submit(form('searchForm'))
    })
  const itSubmitsNewValue = (fieldName, fieldValue, value) =>
    it('saves new value when submitted', async () => {
      expect.hasAssertions()
      render(
        <ContactsProvider>
          <Search
            {...{ [fieldValue]: 'existing value' }}
            onSubmit={(props) => expect(props).toEqual(value)}
          />
        </ContactsProvider>
      )
      await ReactTestUtils.Simulate.change(field(fieldName), { target: { value } })
      await ReactTestUtils.Simulate.submit(form('searchForm'))
    })

  describe('search field', () => {
    itRendersAsATextBox('search')
    itIncludesTheExistingValue('search', 'searchTerm')
    itSubmitsExistingValue('search', 'searchTerm', 'kimberly')
    itSubmitsNewValue('search', 'searchTerm', 'roderick')
  })
})
