import * as React from 'react'
import { Route, Redirect } from 'react-router-dom'
import routes from '../constants/routes'
import AuthSession from '@utils/session'
import { apiUrls } from '@constants/api'
import useMemberStore from '@utils/customHook/useMembersStore'
import Loader from '@components/shared/Loader'

export const PrivateRoute = (props) => {
  const { memberStorage, isLoading } = useMemberStore()
  const isAuthed = () => memberStorage.loggedIn

  if (!isAuthed() && isLoading) {
    return <Loader />
  }
  return isAuthed() && !isLoading ? (
    <Route {...props} />
  ) : (
    <Route
      exactly
      pattern="https://ratingtheraces.com/"
      component={() =>
        (window.location = apiUrls.auth.login(window.location.origin + '/'))
      }
    />
  )
}

export const AuthRoute = (props) =>
  !AuthSession.isTokenSet() ? (
    <Route {...props} />
  ) : (
    <Redirect to={routes.home} />
  )
