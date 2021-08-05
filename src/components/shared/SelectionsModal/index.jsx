/* eslint-disable no-unused-vars */
import React, { useCallback, useState, useEffect } from 'react'
import Dialog from '@material-ui/core/Dialog'
import { useDispatch, useSelector } from 'react-redux'
import { Button, useTheme } from '@material-ui/core'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContentText from '@material-ui/core/DialogContentText'
import { Form, Formik } from 'formik'
import FormikField from '@components/shared/FormikField'
import FormErrorMessage from '@components/shared/Form/FormErrorMessage'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import dateConversations from '@utils/timeUtils'
import { apiUrls } from '@constants/api'
import {
  DEFAULT_DATE_FORMAT,
  WEEK_DAY_DATE_FORMAT
} from '@constants/dateFormatsList'
import CustomTableBeta from '@components/shared/CustomTable/index_beta'
import { selectionsTableColumns } from '@constants/tablesConfigs/selectionsTableColumns'
import { toast } from 'react-toastify'
import { fetchSelectionData } from '@components/WebRatings/ducks/actions'
import { getDetailInfo } from '@components/WebRatings/ducks/selectors'

const useSelectionsModalStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}))
const SelectionsModal = ({
  isOpen,
  fullScreen,
  handleClose = () => ({}),
  handleClearSelections = () => ({}),
  handleSubmitSelections = () => ({}),
  handleDownloadSelections = () => ({}),
  date
}) => {
  const theme = useTheme()
  const { selectionsDetailInfo } = useSelector((store) => store.races)
  const { loggedIn } = useSelector((store) => store.member)
  const [isLoading, setLoading] = useState(false)
  const classes = useSelectionsModalStyles()
  const dispatch = useDispatch()
  const selections = useSelector(getDetailInfo)

  useEffect(() => {
    if (loggedIn) {
      setLoading(true)
      dispatch(
        fetchSelectionData({
          date: dateConversations.getFormattedDate(date),
          onSuccess: () => {
            setLoading(false)
          },
          onError: (e) => {
            setLoading(false)
            handleClose()
            toast.error(`Error: ${e.message}`)
          }
        })
      )
    }
  }, [])

  const getHeaderProps = useCallback(
    () => ({
      style: {
        textAlign: 'center',
        padding: '0 10px',
        fontSize: 16,
        fontWeight: 600,
        border: '1px solid grey'
      }
    }),
    []
  )

  const getRowProps = useCallback(
    () => ({
      style: {
        padding: 0
      }
    }),
    []
  )
  const getCellProps = useCallback(
    () => ({
      style: {
        textAlign: 'center',
        padding: '5px',
        height: 1,
        fontSize: 14,
        border: '1px solid grey'
      }
    }),
    []
  )

  const handleReset = () => {
    setLoading(true)
    handleClearSelections(() => {
      setLoading(false)
      handleClose()
    })
  }

  const handleDownload = (values) => {
    setLoading(true)
    handleDownloadSelections({
      date: dateConversations.getFormattedDate(date),
      comment: values.comment,
      cb: () => {
        setLoading(false)
        handleClose()
      }
    })
  }

  const handleLogin = () => {
    window.location = apiUrls.auth.login(window.location.origin + '/')
  }

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={isOpen}
        aria-labelledby="responsive-dialog-title"
        maxWidth="xl"
        PaperProps={{
          style: { maxWidth: !loggedIn ? 600 : null }
        }}
      >
        <DialogTitle id="responsive-dialog-title">
          {loggedIn
            ? `Your Selections for ${dateConversations.getFormattedDate(
                date,
                WEEK_DAY_DATE_FORMAT
              )}`
            : 'Join RTR today!'}
        </DialogTitle>
        <DialogContent>
          {loggedIn ? (
            <>
              {selectionsDetailInfo ? (
                <Formik
                  initialValues={{
                    comment: selectionsDetailInfo.selection
                      ? selectionsDetailInfo.selection.comment
                      : ''
                  }}
                  onSubmit={(values) => {
                    setLoading(true)
                    handleSubmitSelections({
                      runIds: selections.map((run) => run.id),
                      comment: values.comment,
                      cb: () => {
                        setLoading(false)
                        handleClose()
                      }
                    })
                  }}
                >
                  {({ values, errors, setFieldValue }) => (
                    <Form>
                      <div>
                        <CustomTableBeta
                          columns={selectionsTableColumns(
                            dateConversations.getFormattedDate(
                              date,
                              DEFAULT_DATE_FORMAT
                            )
                          )}
                          data={selections}
                          getRowProps={getRowProps}
                          getCellProps={getCellProps}
                          getHeaderProps={getHeaderProps}
                        />
                      </div>
                      <div style={{ marginTop: 20 }}>
                        <FormikField
                          name="comment"
                          type="textarea"
                          placeholder="Your comment (optional)"
                          error={!!errors.comment}
                          rows="3"
                        />
                        <FormErrorMessage name="comment" />
                      </div>
                      {errors.non_field_errors && (
                        <FormErrorMessage name="non_field_errors" />
                      )}
                      <DialogActions>
                        <Button
                          onClick={() => handleReset()}
                          color="primary"
                          disabled={isLoading || !selections.length}
                          variant="contained"
                        >
                          Clear
                        </Button>
                        <Button
                          type="submit"
                          color="primary"
                          disabled={isLoading || !selections.length}
                          variant="contained"
                        >
                          Submit
                        </Button>
                        <Button
                          onClick={() => handleDownload(values)}
                          color="primary"
                          disabled={
                            isLoading ||
                            !selections.length ||
                            !selectionsDetailInfo.can_download
                          }
                          variant="contained"
                        >
                          Download
                        </Button>
                        <Button
                          onClick={handleClose}
                          color="primary"
                          variant="outlined"
                          disabled={isLoading}
                        >
                          Cancel
                        </Button>
                      </DialogActions>
                      <Backdrop className={classes.backdrop} open={isLoading}>
                        <CircularProgress color="primary" disableShrink />
                      </Backdrop>
                    </Form>
                  )}
                </Formik>
              ) : (
                <div
                  style={{
                    display: 'flex',
                    minHeight: 200,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <CircularProgress disableShrink color="primary" />
                </div>
              )}
            </>
          ) : (
            <>
              <DialogContentText>
                You cannot post your selections without having a Free RTR
                membership!
              </DialogContentText>
              <DialogContentText>
                Sign-up now for FREE (or login if you are already a member).
              </DialogContentText>
              <DialogContentText>
                You can find out more about the benefits of becoming a Free
                member by visiting our{' '}
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://ratingtheraces.com/membership/"
                  style={{ color: theme.palette.primary.light }}
                >
                  membership
                </a>{' '}
                page.
              </DialogContentText>
              <DialogActions>
                <Button
                  onClick={handleLogin}
                  color="primary"
                  disabled={isLoading}
                >
                  Log In / Sign Up
                </Button>
                <Button
                  onClick={handleClose}
                  color="primary"
                  disabled={isLoading}
                >
                  Cancel
                </Button>
              </DialogActions>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

SelectionsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  fullScreen: PropTypes.func,
  handleClose: PropTypes.func.isRequired,
  handleSubmitSelections: PropTypes.func.isRequired,
  handleClearSelections: PropTypes.func.isRequired,
  handleDownloadSelections: PropTypes.func.isRequired,
  date: PropTypes.shape({}).isRequired
}

export default SelectionsModal
