/* eslint-disable react/no-children-prop */
import React, { useCallback, useEffect, useState } from 'react'
import Dialog from '@material-ui/core/Dialog'
import { useSelector } from 'react-redux'
import { useTheme, Typography } from '@material-ui/core'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogContent from '@material-ui/core/DialogContent'
import { Form, Formik } from 'formik'
import { apiUrls } from '@constants/api'
import routes from '@constants/routes'
import FormikField from '@components/shared/FormikField'
import TwitterLogin from '@components/shared/TwitterLogin'
// import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { apiBaseUrl } from '@constants/api'
import FormErrorMessage from '@components/shared/Form/FormErrorMessage'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import useEntries from '@utils/customHook/useEntries'
import dateConversations from '@utils/timeUtils'
import {
  WEEK_DAY_DATE_FORMAT,
  DEFAULT_DATE_FORMAT
} from '@constants/dateFormatsList'
import isEmpty from 'lodash/isEmpty'
import useMemberStore from '@utils/customHook/useMembersStore'
import { entriesTableColumns } from '@constants/tablesConfigs/entriesModalTable'
import CustomTableBeta from '@components/shared/CustomTable/index_beta'
import { toast } from 'react-toastify'
import { fade } from '@material-ui/core/styles/colorManipulator'

const useEntriesModalStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  },
  typographyRoot: {
    flex: '1 0 100%'
  }
}))
const EntriesModal = ({
  isOpen,
  fullScreen,
  handleClose,
  date,
  isEntrySubmitted
}) => {
  const classes = useEntriesModalStyles()
  const { memberStorage } = useMemberStore()
  const { loggedIn } = useSelector((store) => store.member)
  const [isLoading, setLoading] = useState(false)

  const {
    clearEntriesData,
    fetchNapDetails,
    getDetailInfo,
    getNapsDetailInfo,
    enterNaps,
    isAlreadyNaped
  } = useEntries()

  useEffect(() => {
    if (loggedIn) {
      setLoading(true)
      fetchNapDetails(
        date,
        isEntrySubmitted,
        () => setLoading(false),
        (e) => {
          setLoading(false)
          handleClose()
          toast.error(`Error: ${e.message}`)
        }
      )
    }
  }, [isEntrySubmitted])

  const getHeaderProps = useCallback(
    () => ({
      style: {
        textAlign: 'center',
        padding: '0 10px',
        fontSize: 14,
        border: '1px solid grey'
      }
    }),
    []
  )

  const handleLogin = () => {
    window.location = apiUrls.auth.login(window.location.origin + '/')
  }

  const getRowProps = useCallback(
    () => ({
      style: {
        padding: 0,
        fontSize: 12
      }
    }),
    []
  )

  const twitterAuthHandler = () => {
    toast.success('You have successfully Opt In with Twitter')
  }

  // const facebookAuthHandler = (response) => {
  // }

  const getCellProps = useCallback(
    () => ({
      style: {
        textAlign: 'center',
        padding: '0 5px',
        height: 1,
        fontSize: 12,
        border: '1px solid grey'
      }
    }),
    []
  )
  const theme = useTheme()
  const isXSPTaken = () => getDetailInfo().every((column) => column.force_bfsp)
  const isAllNapsSelected = () =>
    getDetailInfo().some((column) => isEmpty(column.data))
  const isSubmitDisabled = () =>
    isLoading || isAlreadyNaped() || isAllNapsSelected()

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={isOpen}
        aria-labelledby="responsive-dialog-title"
        maxWidth="md"
        PaperProps={{
          style: { maxWidth: 600 }
        }}
      >
        <DialogTitle id="responsive-dialog-title">
          {loggedIn
            ? `Your NAP entry for ${dateConversations.getFormattedDate(
                date,
                WEEK_DAY_DATE_FORMAT
              )}`
            : 'Join RTR today!'}
        </DialogTitle>
        <DialogContent>
          {loggedIn ? (
            <>
              {getNapsDetailInfo() ? (
                <Formik
                  initialValues={{
                    comment: getNapsDetailInfo().entry
                      ? getNapsDetailInfo().entry.comment
                      : '',
                    bfsp_nap: isXSPTaken() || false,
                    bfsp_nb: isXSPTaken() || false,
                    bfsp_reserve: isXSPTaken() || false
                  }}
                  onSubmit={(values) => {
                    setLoading(true)
                    enterNaps({
                      data: {
                        comment: values.comment,
                        bfsp_nap: values.bfsp_nap.toString(),
                        bfsp_nb: values.bfsp_nb.toString(),
                        bfsp_reserve: values.bfsp_reserve.toString()
                      },
                      date: dateConversations.getFormattedDate(date),
                      onSuccess: () => {
                        toast.success('Your NAPs have been submitted')
                        setLoading(false)
                        handleClose()
                      },
                      onError: (e) => {
                        const message = e.message || e
                        toast.error(message)
                        setLoading(false)
                      }
                    })
                  }}
                >
                  {({ values, errors, setFieldValue }) => (
                    <Form>
                      <div>
                        <CustomTableBeta
                          columns={entriesTableColumns(
                            values,
                            setFieldValue,
                            isAlreadyNaped(),
                            dateConversations.getFormattedDate(
                              date,
                              DEFAULT_DATE_FORMAT
                            )
                          )}
                          data={getDetailInfo()}
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
                      {getNapsDetailInfo().twitter_auth_url && (
                        <div
                          style={{
                            marginTop: 20,
                            backgroundColor: fade(
                              theme.palette.primary.light,
                              0.1
                            ),
                            padding: 15,
                            borderRadius: 5
                          }}
                        >
                          {memberStorage && memberStorage.canSeeExtendedInfo ? (
                            <Typography>
                              Premium Members can now choose to opt in to our
                              Enhanced NAP Competition by sharing with social
                              media. Check out the{' '}
                              <Link
                                className="MuiLink-underlineHover"
                                to={routes.napCompetition}
                                style={{ color: theme.palette.primary.light }}
                              >
                                Great PRIZES!
                              </Link>{' '}
                              We think they are well worth it ;)
                            </Typography>
                          ) : (
                            <Typography>
                              In order to enter our NAP competition, you must
                              share with social media. Premium Members may enter
                              freely without this requirement!
                            </Typography>
                          )}
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              marginTop: 10
                            }}
                          >
                            <TwitterLogin
                              title="Opt In with Twitter"
                              className="rtr-twitter-auth"
                              authCallback={twitterAuthHandler}
                              authURL={`${apiBaseUrl}${
                                getNapsDetailInfo().twitter_auth_url
                              }`}
                            />
                            {/* {process.env.FACEBOOK_APP_ID && (
                            <>
                              <Typography>OR</Typography>
                              <FacebookLogin
                                appId={process.env.FACEBOOK_APP_ID}
                                callback={facebookAuthHandler}
                                render={(renderProps) => (
                                  <Button
                                    color="primary"
                                    variant="contained"
                                    style={{
                                      textTransform: 'inherit'
                                    }}
                                    onClick={renderProps.onClick}
                                  >
                                    Opt In with Facebook
                                  </Button>
                                )}
                              />
                            </>
                          )} */}
                          </div>
                        </div>
                      )}
                      {errors.non_field_errors && (
                        <FormErrorMessage name="non_field_errors" />
                      )}
                      <DialogActions>
                        <Button
                          type="submit"
                          color="primary"
                          disabled={isSubmitDisabled() || isEntrySubmitted}
                          variant="contained"
                        >
                          Submit
                        </Button>
                        <Button
                          onClick={() => clearEntriesData(date, handleClose)}
                          color="primary"
                          disabled={isLoading || isAlreadyNaped()}
                          variant="contained"
                        >
                          Clear
                        </Button>
                        <Button
                          onClick={handleClose}
                          color="primary"
                          disabled={isLoading}
                          variant="outlined"
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
                You cannot enter the NAP competition without having a Free RTR
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
EntriesModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  fullScreen: PropTypes.func,
  handleClose: PropTypes.func.isRequired,
  isEntrySubmitted: PropTypes.bool,
  date: PropTypes.shape({}).isRequired
}
export default EntriesModal
