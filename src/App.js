import React from 'react'
import { Container } from 'semantic-ui-react'
import { ContactsProvider } from './context/ContactContext'
import Search from './components/Search'
import ContactList from './views/ContactList'

export default function App() {
  return (
    <ContactsProvider>
      <Container>
        <Search />
        <ContactList />
      </Container>
    </ContactsProvider>
  )
}
