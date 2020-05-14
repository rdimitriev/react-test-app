import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useContactsContext } from '../context/ContactContext'

// props here are exposed to be able to be tested externally
export default function Search({ searchTerm, onSubmit }) {
  const search = useFormInput(searchTerm || '')

  return (
    <form
      id="searchForm"
      onSubmit={(e) => {
        onSubmit ? onSubmit(search.value) : search.onSubmit(e)
      }}
    >
      <div className="ui secondary menu titlebar">
        <h2 className="ui header">Support Desk</h2>
        <div className="right menu">
          <div className="item">
            <div className="ui icon input">
              <input name="search" type="text" {...search} placeholder="Search..." />
              {search.value ? (
                <i className="close link icon" onClick={search.onReset} />
              ) : (
                <i className="search link icon" onClick={search.onSubmit} />
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

const useFormInput = (initialValue) => {
  const { searchContacts } = useContactsContext()
  const [value, setValue] = useState(initialValue)

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const handleReset = () => {
    setValue('')
    searchContacts('')
  }

  const handleSearch = (event) => {
    event.preventDefault()
    searchContacts(value)
  }

  // the props are spread in the input field above
  // additionally the event handlers are called directly
  return {
    value,
    onSubmit: handleSearch,
    onChange: handleChange,
    onReset: handleReset,
  }
}

Search.propTypes = {
  searchTerm: PropTypes.string,
  onSubmit: PropTypes.func,
}
