/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useMemo, useState, memo, useCallback } from 'react'
import { Popover, useTheme, useMediaQuery } from '@material-ui/core'
import classnames from 'classnames'

const PopOver = ({
  content,
  backgroundColor = 'rgba(0,0,0,0.9)',
  children,
  style = {}
}) => {
  const [anchor, setEl] = useState(null)
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('tablet'))

  const handleOpen = useCallback(
    (event) => {
      if (isDesktop) {
        setEl(event.target)
        addCustomListener()
      }
    },
    [isDesktop]
  )

  const addCustomListener = useCallback(() => {
    window.addEventListener('scroll', handleScroll)
    const data = document.getElementsByClassName(
      'indiana-scroll-container--native-scroll'
    )
    if (data && data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        data[i].addEventListener('scroll', handleScroll)
      }
    }
  }, [])

  const removeCustomListener = useCallback(() => {
    window.removeEventListener('scroll', handleScroll)
    const data = document.getElementsByClassName(
      'indiana-scroll-container--native-scroll'
    )
    if (data && data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        data[i].removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  const handleClose = useCallback(() => {
    removeCustomListener()
    setEl(null)
  }, [])

  const handleScroll = useCallback(() => {
    removeCustomListener()
    setEl(null)
  }, [])

  const togglePopover = useCallback(
    (event) => {
      if (!isDesktop) {
        if (anchor) {
          removeCustomListener()
          setEl(null)
        } else {
          setEl(event.target)
          addCustomListener()
        }
      }
    },
    [anchor, isDesktop]
  )

  const isOpen = useMemo(() => !!anchor, [anchor])
  return (
    <>
      <div
        className={classnames({
          open: isOpen
        })}
        onMouseOver={handleOpen}
        onMouseOut={handleClose}
        onClick={togglePopover}
        style={style}
      >
        {children}
      </div>
      {isOpen && (
        <Popover
          style={{
            pointerEvents: 'none'
          }}
          PaperProps={{
            style: { backgroundColor, paddingBottom: 8 }
          }}
          open={isOpen}
          anchorEl={anchor}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
          disableRestoreFocus
        >
          {content}
        </Popover>
      )}
    </>
  )
}

export default memo(PopOver)
