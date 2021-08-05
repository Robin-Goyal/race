/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import isEmpty from 'lodash/isEmpty'
import Loader from '@components/shared/Loader'
import SEO from '@components/SEO'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { isAdmin } from '@store/memberStore/selectors'
import { Formik, Form } from 'formik'
import FormikField from '@components/shared/FormikField'
import FormErrorMessage from '@components/shared/Form/FormErrorMessage'
import useMemberStore from '@utils/customHook/useMembersStore'
import { Link as RouterLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Typography, Paper, Button, useTheme } from '@material-ui/core'
import './index.scss'

const useSheduleStyles = makeStyles((theme) => ({
  paper: {
    marginTop: 10,
    marginBottom: 10,
    padding: 0,
    paddingBottom: 10
  },
  profileHeading: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    backgroundColor: theme.palette.primary.light
  },
  h2: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 700,
    padding: theme.spacing(2)
  }
}))

const ProfilePage = ({ match }) => {
  const classes = useSheduleStyles()
  const theme = useTheme()
  const isAdminUser = useSelector(isAdmin)
  const { profile } = useSelector((store) => store.member)
  const {
    memberStorage,
    fetchMemberProfileData,
    changeProfileSubscription
  } = useMemberStore()

  useEffect(() => {
    fetchMemberProfileData({
      name: match.params.username
    })
  }, [match.params.username])

  const handleUpdateSubscription = async (values, actions) => {
    try {
      const data = {}
      data.is_nag_me_notification_active = values.is_nag_me_notification_active
      data.is_results_notification_active =
        values.is_results_notification_active
      if (
        memberStorage.memberProfile.is_self_profile
          .mailchimp_subscription_settings_filtered &&
        memberStorage.memberProfile.is_self_profile
          .mailchimp_subscription_settings_filtered.cb02033293
      ) {
        data.cb02033293 = values.cb02033293
      }
      if (
        memberStorage.memberProfile.is_self_profile
          .mailchimp_subscription_settings_filtered &&
        memberStorage.memberProfile.is_self_profile
          .mailchimp_subscription_settings_filtered['98453c17d0']
      ) {
        data['98453c17d0'] = values['98453c17d0']
      }
      if (
        memberStorage.memberProfile.is_self_profile
          .mailchimp_subscription_settings_filtered &&
        memberStorage.memberProfile.is_self_profile
          .mailchimp_subscription_settings_filtered.e5fcb066e7
      ) {
        data.e5fcb066e7 = values.e5fcb066e7
      }
      changeProfileSubscription(data)
    } catch (err) {
      actions.setErrors(err)
    }
  }

  return (
    <div className="rtr-profile-page">
      <SEO
        title={
          !isEmpty(memberStorage.memberProfile)
            ? memberStorage.memberProfile.display_name
            : 'Member'
        }
      />
      {isEmpty(memberStorage.memberProfile) ? (
        <Loader />
      ) : (
        <>
          <div className="row">
            <div className="col-xs-12">
              <div className="rtr-profile-page-top-section">
                {memberStorage.memberProfile.display_name}
              </div>
            </div>
          </div>
          <div className="row">
            <div
              className="col-xs-12 col-sm-12 col-md-6 col-lg-3"
              style={{ paddingTop: 0 }}
            >
              <div className="rtr-profile-page-table-data">
                <Paper className={classes.paper}>
                  <div className={classes.profileHeading}>
                    <Typography
                      variant="h2"
                      component="h2"
                      classes={{ h2: classes.h2 }}
                    >
                      {memberStorage.memberProfile.display_name}
                    </Typography>
                  </div>
                  <div className="rtr-profile-page-table-data-content">
                    <p>
                      {memberStorage.memberProfile.membership ===
                      'Administrator'
                        ? 'Administrator'
                        : `${memberStorage.memberProfile.membership} member`}
                    </p>
                    {(isAdminUser ||
                      profile?.username === match.params.username) && (
                      <>
                        <p>
                          Twitter:{' '}
                          {memberStorage.memberProfile.twitter_screen_name ? (
                            <span className="in-data">
                              &nbsp;
                              {`@${memberStorage.memberProfile.twitter_screen_name}`}
                            </span>
                          ) : (
                            'Not authorized'
                          )}
                        </p>
                        <p>
                          <Button
                            variant="contained"
                            color="primary"
                            style={{
                              textTransform: 'capitalize',
                              backgroundColor: theme.palette.primary.light,
                              color: '#fff'
                            }}
                            disabled={memberStorage.isLoading}
                            component={RouterLink}
                            to={`/entries/${memberStorage.memberProfile.username}`}
                          >
                            NAP entries
                          </Button>
                        </p>
                        <p>
                          <Button
                            variant="contained"
                            color="primary"
                            style={{
                              textTransform: 'capitalize',
                              backgroundColor: theme.palette.primary.light,
                              color: '#fff'
                            }}
                            disabled={memberStorage.isLoading}
                            component={RouterLink}
                            to={`/selections/${memberStorage.memberProfile.username}`}
                          >
                            Selections
                          </Button>
                        </p>
                      </>
                    )}
                  </div>
                </Paper>
              </div>
            </div>
            {memberStorage.memberProfile.is_self_profile &&
              !isEmpty(memberStorage.memberProfile.is_self_profile) && (
                <div
                  className="col-xs-12 col-sm-12 col-md-6 col-lg-9"
                  style={{ paddingTop: 0 }}
                >
                  <div className="rtr-profile-page-table-data">
                    <Paper className={classes.paper}>
                      <div className={classes.profileHeading}>
                        <Typography
                          variant="h2"
                          component="h2"
                          classes={{ h2: classes.h2 }}
                        >
                          Settings
                        </Typography>
                      </div>
                      <div className="rtr-profile-page-table-data-content">
                        <Formik
                          initialValues={{
                            is_nag_me_notification_active:
                              memberStorage.memberProfile.is_self_profile
                                .is_nag_me_notification_active || false,
                            is_results_notification_active:
                              memberStorage.memberProfile.is_self_profile
                                .is_results_notification_active || false,
                            cb02033293:
                              memberStorage.memberProfile.is_self_profile
                                .mailchimp_subscription_settings_filtered &&
                              memberStorage.memberProfile.is_self_profile
                                .mailchimp_subscription_settings_filtered
                                .cb02033293
                                ? memberStorage.memberProfile.is_self_profile
                                    .mailchimp_subscription_settings_filtered
                                    .cb02033293.subscribed
                                : false,
                            '98453c17d0':
                              memberStorage.memberProfile.is_self_profile
                                .mailchimp_subscription_settings_filtered &&
                              memberStorage.memberProfile.is_self_profile
                                .mailchimp_subscription_settings_filtered[
                                '98453c17d0'
                              ]
                                ? memberStorage.memberProfile.is_self_profile
                                    .mailchimp_subscription_settings_filtered[
                                    '98453c17d0'
                                  ].subscribed
                                : false,
                            e5fcb066e7:
                              memberStorage.memberProfile.is_self_profile
                                .mailchimp_subscription_settings_filtered &&
                              memberStorage.memberProfile.is_self_profile
                                .mailchimp_subscription_settings_filtered
                                .e5fcb066e7
                                ? memberStorage.memberProfile.is_self_profile
                                    .mailchimp_subscription_settings_filtered
                                    .e5fcb066e7.subscribed
                                : false
                          }}
                          onSubmit={handleUpdateSubscription}
                        >
                          {({ errors, values }) => (
                            <Form>
                              <p>Notification subscriptions</p>
                              <div style={{ padding: 0 }}>
                                <FormikField
                                  checked={values.is_nag_me_notification_active}
                                  name="is_nag_me_notification_active"
                                  type="checkbox"
                                  label="Your NagMe"
                                />
                              </div>
                              <div style={{ padding: 0 }}>
                                <FormikField
                                  checked={
                                    values.is_results_notification_active
                                  }
                                  name="is_results_notification_active"
                                  type="checkbox"
                                  label="Your daily NapComp results"
                                />
                              </div>
                              <p>Mail-list subscriptions</p>
                              {memberStorage.memberProfile.is_self_profile
                                .mailchimp_subscription_settings_filtered &&
                                memberStorage.memberProfile.is_self_profile
                                  .mailchimp_subscription_settings_filtered
                                  .cb02033293 && (
                                  <div style={{ padding: 0 }}>
                                    <FormikField
                                      checked={values.cb02033293}
                                      name="cb02033293"
                                      type="checkbox"
                                      label={
                                        memberStorage.memberProfile
                                          .is_self_profile
                                          .mailchimp_subscription_settings_filtered
                                          .cb02033293.name
                                      }
                                    />
                                  </div>
                                )}
                              {memberStorage.memberProfile.is_self_profile
                                .mailchimp_subscription_settings_filtered &&
                                memberStorage.memberProfile.is_self_profile
                                  .mailchimp_subscription_settings_filtered[
                                  '98453c17d0'
                                ] && (
                                  <div style={{ padding: 0 }}>
                                    <FormikField
                                      checked={values['98453c17d0']}
                                      name="98453c17d0"
                                      type="checkbox"
                                      label={
                                        memberStorage.memberProfile
                                          .is_self_profile
                                          .mailchimp_subscription_settings_filtered[
                                          '98453c17d0'
                                        ].name
                                      }
                                    />
                                  </div>
                                )}
                              {memberStorage.memberProfile.is_self_profile
                                .mailchimp_subscription_settings_filtered &&
                                memberStorage.memberProfile.is_self_profile
                                  .mailchimp_subscription_settings_filtered
                                  .e5fcb066e7 && (
                                  <div style={{ padding: 0 }}>
                                    <FormikField
                                      checked={values.e5fcb066e7}
                                      name="e5fcb066e7"
                                      type="checkbox"
                                      label={
                                        memberStorage.memberProfile
                                          .is_self_profile
                                          .mailchimp_subscription_settings_filtered
                                          .e5fcb066e7.name
                                      }
                                    />
                                  </div>
                                )}
                              {errors.non_field_errors && (
                                <FormErrorMessage name="non_field_errors" />
                              )}
                              <p>
                                <Button
                                  type="submit"
                                  variant="contained"
                                  color="primary"
                                  style={{
                                    textTransform: 'capitalize',
                                    backgroundColor:
                                      theme.palette.primary.light,
                                    color: '#fff'
                                  }}
                                  disabled={memberStorage.isLoading}
                                >
                                  Update subscription settings
                                </Button>
                              </p>
                            </Form>
                          )}
                        </Formik>
                      </div>
                    </Paper>
                  </div>
                </div>
              )}
          </div>
        </>
      )}
    </div>
  )
}

export default ProfilePage
