/* eslint-disable react/prop-types */
/* eslint-disable no-unsafe-finally */
import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import * as Yup from 'yup'
import Button from '@material-ui/core/Button'
import { useTheme } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContentText from '@material-ui/core/DialogContentText'
import { makeStyles } from '@material-ui/core/styles'
import { toast } from 'react-toastify'
import { Formik, Form } from 'formik'
import FormikField from '@components/shared/FormikField'
import Typography from '@material-ui/core/Typography'
import { NUMBER_OF_RACES_SELECT_OPTIONS } from '@constants/nagmeConstants'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'
import Tooltip from '@material-ui/core/Tooltip'
import FormErrorMessage from '@components/shared/Form/FormErrorMessage'
import { useDispatch, useSelector } from 'react-redux'
import debounce from 'lodash/debounce'
import './index.scss'
import Api from '@utils/api'
import { apiUrls } from '@constants/api'
import { STANDARD_DELAY } from '@constants/common'
import helpers from '@utils/helpers'
import { createNagme } from '@components/NagMePage/ducks/actions'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  },
  typographyRoot: {
    flex: '1 0 100%'
  }
}))

const NagmeCreateModal = ({
  isOpen,
  fullScreen,
  handleClose,
  noteMaxLength,
  handleNagmeInRaces
}) => {
  const theme = useTheme()
  const classes = useStyles()
  const [isLoading, setLoading] = useState(false)
  const { loggedIn } = useSelector((store) => store.member)
  const { data } = useSelector((store) => store.nagmeGlobal)
  const dispatch = useDispatch()

  const isCreatingNagmeFromScratch = data && !data.horse

  const handleSubmit = (data, onSuccess, onError) => {
    dispatch(
      createNagme({
        data,
        onSuccess,
        onError
      })
    )
  }

  const handleLogin = () => {
    window.location = apiUrls.auth.login(window.location.origin + '/')
  }

  const setSelectedRunsNumber = useCallback(
    () =>
      data.auto_delete
        ? NUMBER_OF_RACES_SELECT_OPTIONS.filter(
            (runsOption) => runsOption.value === data.auto_delete
          )
        : NUMBER_OF_RACES_SELECT_OPTIONS[0],
    []
  )

  const getModalTitle = () =>
    isCreatingNagmeFromScratch
      ? 'Create NagMe'
      : `Create NagMe for ${data.horse.name}`

  const getHorsesData = debounce(async (inputValue, callback) => {
    if (!inputValue) {
      return callback([])
    }
    let response = []
    try {
      const data = await Api.get(apiUrls.horsesAutocomplete(inputValue))
      response = await data.results
    } catch (e) {
      toast.error(e)
    } finally {
      callback(response)
      return response
    }
  }, STANDARD_DELAY)

  if (!data) return null
  return (
    <>
      <Dialog
        fullWidth
        fullScreen={fullScreen}
        open={isOpen}
        aria-labelledby="responsive-dialog-title"
        maxWidth="xl"
        PaperProps={{
          style: { maxWidth: 600 }
        }}
      >
        <DialogTitle id="responsive-dialog-title">
          {loggedIn ? getModalTitle() : 'Join RTR today!'}
        </DialogTitle>
        <DialogContent>
          {loggedIn ? (
            <Formik
              initialValues={{
                notes: data.note || '',
                selectedRunsNumber: setSelectedRunsNumber(),
                horse: data.horse || null
              }}
              validationSchema={Yup.object().shape({
                notes: Yup.string().max(
                  noteMaxLength || 200,
                  `Notes must be at most ${noteMaxLength || 200} characters`
                ),
                horse: Yup.object()
                  .shape({})
                  .typeError('You need to select horse'),
                selectedRunsNumber: Yup.object().shape({
                  label: Yup.string().required(),
                  value: Yup.string().required()
                })
              })}
              onSubmit={async (
                { notes, selectedRunsNumber, horse },
                { setSubmitting, setErrors }
              ) => {
                setLoading(true)
                handleSubmit(
                  {
                    'horse-id': horse.id,
                    'auto-delete': selectedRunsNumber.value,
                    note: notes
                  },
                  (res) => {
                    handleNagmeInRaces && handleNagmeInRaces(res, data.run_id)
                    setSubmitting(false)
                    setLoading(false)
                    handleClose()
                    toast.success('NagMe successfully created')
                  },
                  (error) => {
                    setErrors(error)
                    setSubmitting(false)
                    setLoading(false)
                    helpers.handleFormErrors(error, toast.error)
                  }
                )
              }}
            >
              {({ errors, values }) => (
                <Form>
                  {isCreatingNagmeFromScratch && (
                    <div style={{ marginBottom: 20 }}>
                      <FormikField
                        name="horse"
                        type="asyncSelect"
                        placeholder="Type name of a horse"
                        getSelectData={getHorsesData}
                        getOptionLabel={(option) => option.text}
                        getOptionValue={(option) => option.id}
                      />
                      <FormErrorMessage name="horse" />
                    </div>
                  )}
                  <div>
                    <FormikField
                      name="notes"
                      type="textarea"
                      placeholder="Notes"
                      label="Notes"
                      error={!!errors.notes}
                      rows="5"
                      inputProps={{ maxLength: noteMaxLength || 200 }}
                    />
                    <Typography align="left">
                      Number of characters left:{' '}
                      {helpers.calcRemainingSpace(
                        values.notes.length,
                        noteMaxLength
                      )}
                    </Typography>
                    <FormErrorMessage name="notes" />
                  </div>
                  <div className="nagme-modal__selected-runs">
                    <Typography
                      classes={{
                        root: classes.typographyRoot
                      }}
                    >
                      Number of races to auto-delete after:
                    </Typography>
                    <FormikField
                      options={NUMBER_OF_RACES_SELECT_OPTIONS}
                      name="selectedRunsNumber"
                      type="formikSelect"
                      placeholder="Never"
                      label="Number of races to auto-delete after:"
                      isLoading={false}
                      isClearable={false}
                      isSearchable={false}
                    />
                    <Tooltip
                      title="Remove the horse from NagMe list after a selected number of successful runs"
                      aria-label="about selected runs"
                    >
                      <HelpOutlineIcon />
                    </Tooltip>
                    <FormErrorMessage name="selectedRunsNumber" />
                  </div>
                  {errors.non_field_errors && (
                    <FormErrorMessage name="non_field_errors" />
                  )}
                  <DialogActions>
                    <Button type="submit" color="primary" disabled={isLoading}>
                      Create Nagme
                    </Button>
                    <Button
                      onClick={handleClose}
                      color="primary"
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
            <>
              <DialogContentText>
                You cannot create a NagMe without having a Free RTR membership!
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
NagmeCreateModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleNagmeInRaces: PropTypes.func,
  nagme: PropTypes.shape({
    auto_delete: PropTypes.number,
    horse: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      nationallity: PropTypes.string
    }),
    note: PropTypes.string,
    id: PropTypes.number
  }),
  noteMaxLength: PropTypes.number
}
export default NagmeCreateModal
