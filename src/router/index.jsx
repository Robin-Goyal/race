import React, { Suspense, useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import loadable from '@loadable/component'
import routes from '@constants/routes'
import Loader from '@components/shared/Loader'
import Header from '@components/shared/Header'
import Footer from '@components/shared/Footer'
import { ConnectedRouter } from 'connected-react-router'
import { history } from '@store/index'
import { PrivateRoute } from './GuardRoutes'
import useMemberStore from '@utils/customHook/useMembersStore'
import { useDispatch } from 'react-redux'
import { MEMBERHIPS } from '@constants/common'
import Crisp from 'react-crisp'
import { saveSession } from '@store/memberStore/actions'
import SaveSignInDialog from '@components/shared/SaveSignInDialog'

const History = loadable(() => import('@components/History'))
const NagMePage = loadable(() => import('@components/NagMePage'))
const NapCompetition = loadable(() => import('@components/NapCompetition'))
const EntriesPage = loadable(() => import('@components/EntriesPage'))
const SelectionsPage = loadable(() => import('@components/SelectionsPage'))
const ProfilePage = loadable(() => import('@components/ProfilePage'))
const StatsPage = loadable(() => import('@components/StatsPage'))
const LeaderBoards = loadable(() => import('@components/LeaderBoards'))
const WebRatings = loadable(() => import('@components/WebRatings'))
const Dashboard = loadable(() => import('@components/Dashboard'))
const Page404 = loadable(() => import('@components/ErrorPages/Page404'))
const ServerUnavailable = loadable(() =>
  import('@components/ErrorPages/ServerUnavailable')
)

const AppRouter = () => {
  const { fetchMemberData, memberStorage } = useMemberStore()

  const dispatch = useDispatch()
  const handleSaveSession = () => dispatch(saveSession())
  useEffect(() => {
    fetchMemberData()
    // dispatch(pollStart())
  }, [])

  return (
    <ConnectedRouter history={history}>
      <div className="root-container">
        <Header />
        <main className="root-container__content">
          <Suspense fallback={<Loader />}>
            <Switch>
              <Route exact path={routes.dashboard} component={Dashboard} />

              <PrivateRoute
                exact
                path={routes.members}
                component={ProfilePage}
              />

              <PrivateRoute exact path={routes.nagMe} component={NagMePage} />

              <PrivateRoute
                exact
                path={routes.entries}
                component={EntriesPage}
              />

              <PrivateRoute
                exact
                path={routes.selections}
                component={SelectionsPage}
              />

              <Route exact path={routes.races} component={WebRatings} />
              <Route
                exact
                path={routes.serverUnavailable}
                component={ServerUnavailable}
              />
              <Route
                exact
                path={routes.leaderboards}
                component={LeaderBoards}
              />
              <Route exact path={routes.history} component={History} />
              <PrivateRoute exact path={routes.stats} component={StatsPage} />
              <Redirect from="/" to={routes.dashboard} exact />
              <Redirect from="/stats/" to="/stats/entry/pick-type/" exact />
              <Redirect
                from="/stats/entry/"
                to="/stats/entry/pick-type/"
                exact
              />
              <Redirect
                from="/stats/selection/"
                to="/stats/selection/all/"
                exact
              />
              <Redirect from="/stats/prostats/" to={routes.proStats} exact />
              <Route
                exact
                path={routes.napCompetition}
                component={NapCompetition}
              />
              <Route
                exact
                path={routes.serverUnavailable}
                component={ServerUnavailable}
              />
              <Route exact path="/200.html" component={() => null} />

              <Route exact component={Page404} />
            </Switch>
            <SaveSignInDialog
              handleClose={handleSaveSession}
              isOpen={memberStorage.showMemberCheckDialog}
            />
          </Suspense>
        </main>
        <Footer />
      </div>
      {/* <Crisp
        crispWebsiteId={
          window.location.hostname === 'localhost'
            ? 'b417c34f-89c0-4de5-983f-6dde70532fe7'
            : 'e502f52c-0efd-4a48-b91f-feaf96998ef9'
        }
        crispTokenId={
          memberStorage.loggedIn &&
          memberStorage.profile.membership !== MEMBERHIPS['FREE']
            ? memberStorage.crisp_restore_hash
            : ''
        }
        attributes={
          memberStorage.loggedIn &&
          memberStorage.profile.membership !== MEMBERHIPS['FREE'] &&
          memberStorage.profile.user_email
            ? {
                'user:email': [
                  memberStorage.profile.user_email,
                  memberStorage.crisp_verify_hash
                ],
                'user:nickname': [memberStorage.profile.display_name]
              }
            : {}
        }
        crispRuntimeConfig={{
          session_merge: true,
          locale: 'en'
        }}
      /> */}
    </ConnectedRouter>
  )
}

export default AppRouter
