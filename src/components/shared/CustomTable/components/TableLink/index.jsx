/* eslint-disable react/prop-types */
import React from 'react'
import { Link } from 'react-router-dom'
import './index.scss'

const TableLink = ({ label, pathname, routeState = {} }) => (
  <Link
    className="custom-table__link"
    to={{
      pathname,
      state: routeState
    }}
    style={{ padding: 0 }}
  >
    {label}
  </Link>
)

export default TableLink
