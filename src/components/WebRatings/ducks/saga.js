import { takeLatest, put, call, delay } from 'redux-saga/effects'
import types from './types'
import {
  fetchDataFailed,
  fetchDataSuccess,
  fetchAllRacesDataSuccess,
  fetchAllRacesDataFailed,
  fetchAllRacesPaginationDataSuccess,
  fetchAllRacesPaginationDataFailed,
  fetchDetailedDataSuccess,
  getCommentsSuccess,
  likeUnlikeCommentSuccess,
  getRepliedCommentSuccess,
  submitSelectionsFailed,
  submitSelectionsSuccess,
  fetchSelectionDataSuccess,
  fetchSelectionDataFailed,
  addNapSuccess,
  addNapFailed,
  submitNapsSuccess,
  submitNapsFailed,
  removeSelectionsSuccess,
  removeSelectionsFailed,
  addSelectionSuccess,
  addSelectionFailed,
  fetchNapsDataSuccess,
  fetchNapsDataFailed,
  resetSelectionsSuccess,
  resetSelectionsFailed
} from '@components/WebRatings/ducks/actions'
import Api from '@utils/api'
import { apiUrls } from '@constants/api'
import FileSaver from 'file-saver'
import helpers from '@utils/helpers'
// import { raceResponseMock } from '@components/WebRatings/mock/responseMock'
// import { racesMock } from '@components/WebRatings/mock/races'

/* RACE SECTION STARTED */

/* Fetching all course races */
function* fetchRaces({ payload: { date, onSuccess, onError } }) {
  try {
    const data = yield call(Api.get, apiUrls.races.getAllCourseTimeRaces(date))
    const result = helpers.transformRacesResponse(data)
    yield put(fetchDataSuccess(result))
    onSuccess && onSuccess(result)
  } catch (err) {
    yield put(fetchDataFailed(err.message))
    onError && onError(err)
  }
}

/* Fetch all races */
function* fetchAllRaces({ payload: { date, page, onSuccess, onError } }) {
  try {
    const data = yield call(Api.get, apiUrls.races.getAllRaces(date, page))
    yield put(fetchAllRacesDataSuccess(data))
    onSuccess && onSuccess(data)
  } catch (err) {
    yield put(fetchAllRacesDataFailed(err.message))
    onError && onError(err)
  }
}

/* Fetch all races pagination data */
function* fetchAllRacesPagination({
  payload: { date, page, onSuccess, onError }
}) {
  try {
    const data = yield call(Api.get, apiUrls.races.getAllRaces(date, page))
    yield put(fetchAllRacesPaginationDataSuccess(data))
    onSuccess && onSuccess(data)
  } catch (err) {
    yield put(fetchAllRacesPaginationDataFailed(err.message))
    onError && onError(err)
  }
}

/* Fetch single race, all course race */
function* fetchRaceData({ payload: { date, course, time, onSuccess } }) {
  try {
    const { race, races } = yield call(
      Api.get,
      apiUrls.races.getOneRace(date, course, time)
    )
    const courseRaces =
      races && races.length ? helpers.createCourseRacesData(races) : []
    const raceDetails = race ? helpers.createRaceDetailsData(race) : null
    if (raceDetails) {
      raceDetails.comments = []
    }
    yield put(
      fetchDetailedDataSuccess({
        raceDetails: raceDetails,
        runs: race ? race.runs : null,
        courseRaces: courseRaces,
        isCommentLoading: raceDetails ? true : false
      })
    )
    onSuccess && onSuccess(raceDetails)
  } catch (err) {
    yield put(fetchDataFailed(err.message))
  }
}

/* RACE SECTION END */

/* SELECTION SECTION STARTED */

/* Add a new selection */
function* addSelection({ payload: { id, requestBody, onSuccess, onError } }) {
  try {
    const response = yield call(Api.post, apiUrls.selections.link(id), {
      ...requestBody
    })
    yield put(addSelectionSuccess(response))
    onSuccess && onSuccess()
  } catch (err) {
    yield put(addSelectionFailed(err.message))
    onError && onError(err)
  }
}

/* Remove a single selection */
function* removeSelection({
  payload: { id, requestBody, onSuccess, onError }
}) {
  try {
    const response = yield call(Api.delete, apiUrls.selections.link(id), {
      ...requestBody
    })
    yield put(addSelectionSuccess(response))
    onSuccess && onSuccess()
  } catch (err) {
    yield put(addSelectionFailed(err.message))
    onError && onError(err)
  }
}

/* Remove multiple selections */
function* removeSelections({ payload: { date, ids, onSuccess, onError } }) {
  try {
    yield call(Api.post, apiUrls.selections.deleteMultiple(date), {
      ids: ids
    })
    yield put(removeSelectionsSuccess({ deletedIds: ids }))
    onSuccess && onSuccess()
  } catch (err) {
    yield put(removeSelectionsFailed(err.message))
    onError && onError(err)
  }
}

/* Fetch selection data on popup click */
function* fetchSelectionData({ payload: { date, onSuccess, onError } }) {
  try {
    const response = yield call(Api.get, apiUrls.selections.getDetails(date))
    yield put(fetchSelectionDataSuccess(response))
    onSuccess && onSuccess()
  } catch (err) {
    yield put(fetchSelectionDataFailed(err.message))
    onError && onError(err)
  }
}

/* Submit selection data */
function* submitSelections({ payload: { data, date, onSuccess, onError } }) {
  try {
    yield call(Api.post, apiUrls.selections.base(date), {
      ...data
    })
    yield put(submitSelectionsSuccess({ ids: data.ids }))
    onSuccess && onSuccess()
  } catch (err) {
    yield put(submitSelectionsFailed(err.message))
    onError && onError(err)
  }
}

/* Download selection data */
function* downloadSelections({
  payload: { date, comment, onSuccess, onError }
}) {
  try {
    const fileType = 'application/vnd.ms-excel'
    const fileName = `rtr_selection_${date}.xlsx`
    const data = yield call(
      Api.post,
      apiUrls.selections.download(date),
      {
        comment: comment
      },
      { responseType: 'arraybuffer' }
    )
    if (data) {
      const blob = new Blob([data], { type: fileType })
      FileSaver.saveAs(blob, fileName)
      onSuccess && onSuccess()
    } else {
      const err = new Error(
        'Only premium members can download their selections'
      )
      onError && onError(err)
    }
  } catch (err) {
    onError && onError(err)
  }
}

/* Reset/Clear selection data */
function* resetSelections({ payload: { date, onSuccess, onError } }) {
  try {
    // eslint-disable-next-line no-unused-vars
    const response = yield call(Api.delete, apiUrls.selections.delete(date))
    delay(1000)
    yield put(resetSelectionsSuccess())
    onSuccess && onSuccess()
  } catch (err) {
    yield put(resetSelectionsFailed(err.message))
    onError && onError(err)
  }
}

/* SELECTION SECTION END */

/* ENTRY/NAP SECTION STARTED */

/* Add a new entry/nap data */
function* addEntry({ payload: { date, requestBody, onSuccess, onError } }) {
  try {
    const response = yield call(Api.put, apiUrls.entry.link(date), {
      ...requestBody
    })
    yield put(addNapSuccess(response))
    onSuccess && onSuccess()
  } catch (err) {
    const errorMessage = err.message || err
    onError && onError(errorMessage)
  }
}

/* Reset/Clear entry/nap data */
function* clearEntries({ payload: { date, requestBody, onSuccess, onError } }) {
  try {
    const response = yield call(Api.delete, apiUrls.entry.link(date), {
      ...requestBody
    })
    yield put(addNapSuccess(response))
    onSuccess && onSuccess()
  } catch (err) {
    yield put(addNapFailed(err.message))
    onError && onError(err)
  }
}

/* fetch entry/nap data on popup click */
function* fetchNapsData({
  payload: { date, isEntrySubmitted, onSuccess, onError }
}) {
  try {
    let response = null
    if (isEntrySubmitted) {
      response = yield call(Api.get, apiUrls.entry.getSubmittedDetails(date))
    } else {
      response = yield call(Api.get, apiUrls.entry.getDetails(date))
    }
    yield put(fetchNapsDataSuccess(response))
    onSuccess && onSuccess()
  } catch (err) {
    yield put(fetchNapsDataFailed(err.message))
    onError && onError(err)
  }
}

/* submit entry/nap data */
function* submitNapsData({ payload: { data, date, onSuccess, onError } }) {
  try {
    const response = yield call(Api.post, apiUrls.entry.link(date), {
      ...data
    })
    yield put(submitNapsSuccess(response))
    onSuccess && onSuccess()
  } catch (err) {
    yield put(submitNapsFailed(err.message))
    onError && onError(err)
  }
}

/* ENTRY/NAP SECTION END */

/* COMMENT SECTION STARTED */

/* fetch comments */
function* getComments({
  payload: { date, course, time, id, page, hideComments }
}) {
  try {
    const response = yield call(
      Api.get,
      apiUrls.races.getComments(date, course, time, page)
    )
    yield put(
      getCommentsSuccess({
        comments: hideComments ? [] : response.results || [],
        previousComment: hideComments ? null : response.previous,
        nextComment: hideComments ? null : response.next,
        comment_count: response.count,
        raceId: id,
        page
      })
    )
  } catch (err) {
    yield put(fetchDataFailed(err.message))
  }
}

/* create a new comment */
function* createComment({ payload: { date, course, time, comment, id } }) {
  try {
    yield call(Api.post, apiUrls.races.createComment(date, course, time), {
      comment_text: comment
    })
    const response = yield call(
      Api.get,
      apiUrls.races.getComments(date, course, time, 1)
    )
    yield put(
      getCommentsSuccess({
        comments: response.results || [],
        previousComment: response.previous,
        nextComment: response.next,
        comment_count: response.count,
        raceId: id,
        page: 1
      })
    )
  } catch (err) {
    yield put(fetchDataFailed(err.message))
  }
}

/* fecth all replied comment */
function* getRepliedComment({ payload: { id, raceId, page, hideComments } }) {
  try {
    const response = yield call(
      Api.get,
      apiUrls.races.getRepliedComments(id, page)
    )
    yield put(
      getRepliedCommentSuccess({
        commentId: id,
        childComments: hideComments ? [] : response.results || [],
        previousReply: response.previous,
        nextReply: response.next,
        reply_count: response.count,
        raceId: raceId,
        hasReplied: false,
        page
      })
    )
  } catch (err) {
    yield put(fetchDataFailed(err.message))
  }
}

/* post a reply comment */
function* replyComment({ payload: { comment, id, raceId, page } }) {
  try {
    yield call(Api.post, apiUrls.races.replyComment(id), {
      comment_text: comment
    })
    const response = yield call(
      Api.get,
      apiUrls.races.getRepliedComments(id, page)
    )
    yield put(
      getRepliedCommentSuccess({
        commentId: id,
        childComments: response.results || [],
        previousReply: response.previous,
        nextReply: response.next,
        reply_count: response.count,
        raceId: raceId,
        hasReplied: true,
        page
      })
    )
  } catch (err) {
    yield put(fetchDataFailed(err.message))
  }
}

/* report a comment */
function* reportComment({ payload: { data } }) {
  try {
    const postData = { reason: data.value }
    yield call(Api.post, apiUrls.races.reportComment(data.comment.id), postData)
    data.onSuccess && data.onSuccess()
  } catch (err) {
    data.onError && data.onError(err)
  }
}

/* like and unlike a comment */
function* likeUnlikeComment({ payload: { isLiked, id, raceId } }) {
  try {
    if (isLiked) {
      yield call(Api.post, apiUrls.races.unlikeComment(id), {})
    } else {
      yield call(Api.post, apiUrls.races.likeComment(id), {})
    }
    yield put(
      likeUnlikeCommentSuccess({
        commentId: id,
        hasUserLiked: !isLiked,
        raceId: raceId
      })
    )
  } catch (err) {
    yield put(fetchDataFailed(err.message))
  }
}

/* delete a comment */
function* deleteComment({ payload: { id, onSuccess, onError } }) {
  try {
    yield call(Api.delete, apiUrls.races.deleteComment(id), {})
    onSuccess && onSuccess()
  } catch (err) {
    yield put(fetchDataFailed(err.message))
    onError && onError(err)
  }
}

/* COMMENT SECTION END */

/* download a file for dashboard page */
function* downloadFile({
  payload: { url, file, dateFormat, onSuccess, onError }
}) {
  try {
    const fileType = file === 'csv' ? 'text/csv' : 'application/vnd.ms-excel'
    const fileName =
      file === 'csv'
        ? `RatingTheRaces-Races-${dateFormat}-raw.csv`
        : `RatingTheRaces-Races-${dateFormat}.xlsx`
    const data = yield call(Api.get, url, { responseType: 'arraybuffer' })
    if (data) {
      const blob = new Blob([data], { type: fileType })
      FileSaver.saveAs(blob, fileName)
      onSuccess && onSuccess()
    } else {
      const err = new Error(
        'Oops, something went wrong. Please contact to administrator'
      )
      onError && onError(err)
    }
  } catch (err) {
    onError && onError(err)
  }
}

const withPrefix = (action) => `${types.PREFIX}/${action}`

export const racesSagas = [
  takeLatest(withPrefix(types.FETCH_DATA), fetchRaces),
  takeLatest(withPrefix(types.FETCH_ALL_RACES_DATA), fetchAllRaces),
  takeLatest(
    withPrefix(types.FETCH_ALL_RACES_PAGINATION_DATA),
    fetchAllRacesPagination
  ),
  takeLatest(withPrefix(types.FETCH_DETAILED_DATA), fetchRaceData),
  takeLatest(withPrefix(types.GET_COMMENTS), getComments),
  takeLatest(withPrefix(types.LIKE_UNLIKE_COMMENT), likeUnlikeComment),
  takeLatest(withPrefix(types.DELETE_COMMENT), deleteComment),
  takeLatest(withPrefix(types.GET_REPLIED_COMMENT), getRepliedComment),
  takeLatest(withPrefix(types.REPLY_COMMENT), replyComment),
  takeLatest(withPrefix(types.REPORT_COMMENT), reportComment),
  takeLatest(withPrefix(types.CREATE_COMMENT), createComment),
  takeLatest(withPrefix(types.SUBMIT_SELECTIONS), submitSelections),
  takeLatest(withPrefix(types.DOWNLOAD_SELECTIONS), downloadSelections),
  takeLatest(withPrefix(types.ADD_NAP), addEntry),
  takeLatest(withPrefix(types.ADD_SELECTION), addSelection),
  takeLatest(withPrefix(types.REMOVE_SELECTION), removeSelection),
  takeLatest(withPrefix(types.REMOVE_SELECTIONS), removeSelections),
  takeLatest(withPrefix(types.CLEAR_ENTRIES), clearEntries),
  takeLatest(withPrefix(types.FETCH_NAPS_DATA), fetchNapsData),
  takeLatest(withPrefix(types.FETCH_SELECTION_DATA), fetchSelectionData),
  takeLatest(withPrefix(types.SUBMIT_NAPS), submitNapsData),
  takeLatest(withPrefix(types.DOWNLOAD_FILE), downloadFile),
  takeLatest(withPrefix(types.RESET_SELECTIONS), resetSelections)
]
