import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import emptyImage from '../../assets/white-image.png'
import availableImage from '../../assets/icon-available.svg'
import busyImage from '../../assets/icon-busy.svg'

export default function Contact(props) {
  const refElem = useRef()

  // calculation how much the additional information should slide up
  // this cannot be done via CSS since we don't know the dynamic height of the div based on the content
  const showBar = () => {
    const height = window.getComputedStyle(refElem.current).getPropertyValue('height')
    refElem.current.style.top = `calc(100% - ${height})`
  }
  const hideBar = () => {
    refElem.current.style.top = ''
  }

  return (
    <div className="raised card wrapper" onMouseOver={showBar} onMouseOut={hideBar}>
      <div className="image">
        {props.image ? (
          <img alt="Image" className="ui medium image" src={props.image} />
        ) : (
          // placeholder
          <img alt="No Image" src={emptyImage} />
        )}
      </div>
      <div ref={(el) => (refElem.current = el)} className="content wrapper-inner">
        <img
          alt="Busy"
          className="ui avatar image"
          src={props.available ? availableImage : busyImage}
        />
        <div className="header">{`${props.firstName} ${props.lastName}`}</div>
        {/* this prop is missing from the json mock data, hence hardcoded here */}
        <div className="meta">NY, USA</div>
        <div className="description">
          <p>phone: {props.phone}</p>
          <p>email: {props.email}</p>
        </div>
      </div>
    </div>
  )
}

Contact.propTypes = {
  image: PropTypes.string,
  available: PropTypes.bool,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  phone: PropTypes.string,
  email: PropTypes.string,
}
