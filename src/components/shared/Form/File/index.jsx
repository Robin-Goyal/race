import React, { useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import PropTypes from 'prop-types'

import Thumbnail from '@components/shared/Thumbnail'
import Button from '@components/shared/Button'
import helpers from '@utils/helpers'
import './File.scss'

const FileInput = ({ accept, multiple, maxSize, showPreviews, onChange }) => {
  const [files, setFiles] = useState([])
  const [error, setError] = useState(null)
  const { getRootProps, getInputProps } = useDropzone({
    accept,
    multiple,
    maxSize: helpers.mbToBytes(maxSize),
    onDrop: acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      )
    },
    onDropRejected(files) {
      setError(`Rejected: ${files.map(f => f.name).join(', ')}`)
    }
  })

  const handleRemove = file => {
    setFiles(files.filter(f => f.name !== file.name))
  }

  const thumbs = files.map(file => (
    <li className="form-file__thumb" key={file.name}>
      <Button
        className="form-file__thumb-btn"
        icon="close"
        onClick={() => handleRemove(file)}
      />
      <Thumbnail className="form-file__thumb--img" src={file.preview} />
    </li>
  ))

  useEffect(() => {
    onChange(files)
    return () => {
      files.forEach(file => URL.revokeObjectURL(file.preview))
    }
  }, [files])

  return (
    <section className="form-file">
      <div {...getRootProps({ className: 'form-file__dropzone' })}>
        <input {...getInputProps()} />
        <p>Drag n drop some files here, or click to select files</p>
      </div>
      {showPreviews && Boolean(files.length) && (
        <ul className="form-file__thumbs-list">{thumbs}</ul>
      )}
      {error && <div className="form-field">{<div>{error}</div>}</div>}
    </section>
  )
}

FileInput.defaultProps = {
  accept: 'image/*',
  multiple: false,
  showPreviews: false,
  maxSize: 1,
  onChange: () => void 0
}

FileInput.propTypes = {
  accept: PropTypes.string,
  multiple: PropTypes.bool,
  showPreviews: PropTypes.bool,
  maxSize: PropTypes.number,
  onChange: PropTypes.func
}

export default FileInput
