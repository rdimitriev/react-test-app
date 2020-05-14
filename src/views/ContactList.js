import React, { useEffect } from 'react'
import { Segment } from 'semantic-ui-react'
import { useContactsContext } from '../context/ContactContext'
import Loading from '../components/Loading'
import Contact from '../components/Contact'
import Empty from '../components/Empty'

export default function ContactList() {
  const {
    contactsFiltered,
    addContacts,
    loading,
    startLoading,
    completeLoading,
  } = useContactsContext()

  // NB! Validation should be performed on input data and fields.
  // Additionally the data could be formatted in template to look the same
  // But in general this should be done on the servicing side
  useEffect(() => {
    startLoading()
    // move to constants file
    fetch('http://localhost:1234/api.json')
      .then((res) => res.json())
      .then((data) => {
        addContacts({ data })
      })
      .catch((error) => {
        addContacts({ error })
        window.console.log(error)
      })
      .finally(() => {
        completeLoading()
      })
  }, [])

  return (
    <Segment basic>
      {loading ? (
        <Loading />
      ) : contactsFiltered.length === 0 ? (
        <Empty />
      ) : (
        <div className="ui four stackable cards">
          {contactsFiltered.map((contact, idx) => (
            <Contact key={idx} {...contact} />
          ))}
        </div>
      )}
    </Segment>
  )
}
