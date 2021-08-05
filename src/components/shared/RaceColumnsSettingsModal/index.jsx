import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Dialog from '@material-ui/core/Dialog'
import dayjs from 'dayjs'
import dateConversations from '@utils/timeUtils'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'
import useMemberStore from '@utils/customHook/useMembersStore'
import FormGroup from '@material-ui/core/FormGroup'
import Checkbox from '@material-ui/core/Checkbox'
import { Field, Form, Formik } from 'formik'
import { isExtendedMember } from '@store/memberStore/selectors'
import { isFreeFriday } from '@store/memberStore/selectors'
import { toast } from 'react-toastify'
import Typography from '@material-ui/core/Typography'
import find from 'lodash/find'
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: 100,
    color: '#fff'
  },
  formGroup: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingBottom: 52,
    [theme.breakpoints.up('sm')]: {
      maxHeight: '1100px'
    },
    [theme.breakpoints.up('md')]: {
      width: '900px'
    }
  },
  dialogActions: {
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
    width: 'calc(100% - 64px)',
    background: '#fff'
  }
}))

const RaceColumnsSettingsModal = ({
  handleClose,
  isOpen,
  fullScreen,
  settingsData = [],
  handleColumnsSettingsChange
}) => {
  const [isLoading, toggleIsLoading] = useState(false)
  const isMember = useSelector(isExtendedMember)
  const isFreeFridayMember = useSelector(isFreeFriday)
  const { isExample } = useSelector((store) => store.races)
  const { memberStorage } = useMemberStore()
  const classes = useStyles()

  const resetConfig = (fn) => {
    const disabled = memberStorage.allColumns.filter(
      (elem) =>
        memberStorage.disabledColumns.find(
          ({ value }) => elem.value === value
        ) && elem.value
    )
    fn('columnsGroup', disabled)
  }

  const setAll = (fn) => {
    fn('columnsGroup', memberStorage.allColumns)
  }

  const handleChange = (event, field, currentName, setValue) => {
    if (event.target.checked) {
      const nextValue = field.concat(currentName)
      setValue('columnsGroup', nextValue)
    } else {
      const nextValue = field.filter((f) => f.value !== currentName.value)
      setValue('columnsGroup', nextValue)
    }
  }

  return (
    <Dialog
      fullScreen={fullScreen}
      PaperProps={{
        style: { maxWidth: 768 }
      }}
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        Select race columns to be visible
      </DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            columnsGroup: [...settingsData] || []
          }}
          onSubmit={async (values, { setSubmitting }) => {
            toggleIsLoading(true)
            setTimeout(() => {
              handleColumnsSettingsChange(
                values.columnsGroup,
                () => {
                  toggleIsLoading(false)
                  setSubmitting(false)
                  handleClose()
                },
                (error) => {
                  toast.error(`Error:${error}`)
                  toggleIsLoading(false)
                  setSubmitting(false)
                  handleClose()
                }
              )
            }, 0)
            setSubmitting(false)
          }}
        >
          {({ errors, setFieldValue, isSubmitting }) => (
            <Form>
              <FormGroup
                className="row"
                classes={{
                  root: classes.formGroup
                }}
              >
                {!!memberStorage.allColumns.length &&
                  memberStorage.allColumns.map(({ label, value }, index) => (
                    <Field key={`${value}-${index}`} name="columnsGroup">
                      {({ field }) =>
                        label ? (
                          <label
                            className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-6"
                            style={{ padding: 0 }}
                          >
                            <Checkbox
                              {...field}
                              checked={!!find(field.value, { value })}
                              disabled={
                                !!find(memberStorage.disabledColumns, { value })
                              }
                              color="primary"
                              onChange={(e) =>
                                handleChange(
                                  e,
                                  field.value,
                                  { label, value },
                                  setFieldValue
                                )
                              }
                            />
                            <Typography variant="subtitle1" display="inline">
                              {label}
                            </Typography>
                          </label>
                        ) : null
                      }
                    </Field>
                  ))}
                {errors.non_field_errors && <p>{errors.non_field_errors}</p>}
              </FormGroup>
              <DialogActions className={classes.dialogActions}>
                {isMember ||
                (dateConversations.getFormattedDate(dayjs(), 'dddd') ===
                  'Friday' &&
                  isFreeFridayMember) ||
                isExample ? (
                  <>
                    <Button
                      color="primary"
                      onClick={() => resetConfig(setFieldValue)}
                      disabled={isLoading}
                    >
                      Show None
                    </Button>
                    <Button
                      color="primary"
                      onClick={() => setAll(setFieldValue)}
                      disabled={isLoading}
                    >
                      Show All
                    </Button>
                    <Button type="submit" color="primary" disabled={isLoading}>
                      Update
                    </Button>
                  </>
                ) : (
                  <Typography variant="subtitle1" display="inline">
                    Free members may not change the columns that they can see...
                  </Typography>
                )}
                <Button
                  onClick={handleClose}
                  color="primary"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color="primary" disableShrink />
      </Backdrop>
    </Dialog>
  )
}
RaceColumnsSettingsModal.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
  settingsData: PropTypes.array,
  handleColumnsSettingsChange: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
}

export default RaceColumnsSettingsModal
