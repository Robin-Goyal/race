import { handleActions } from 'redux-actions'
import produce from 'immer'
import types from './types'
import isEqual from 'lodash/isEqual'
import { TABLE_MODS } from '@constants/common'
import helpers from '@utils/helpers'

const initialState = {
  isLoading: true,
  isSingleRaceLoading: false,
  isCommentLoading: false,
  errors: {},
  allRaces: [],
  raceDetails: null,
  courseRaces: [],
  submittedIds: [],
  runs: null,
  selectedCourse: null,
  selectedStartTime: null,
  racesCourseNames: [],
  racesStartTime: {},
  currentDate: null,
  currentDateFormat: 'Do ,YYYY-MM-DD',
  statsMod: TABLE_MODS,
  selectedWp: TABLE_MODS[0],
  selection: { runs: [] },
  entry: null,
  isEntrySubmitted: false,
  isSelectionSubmitted: false,
  isExample: false,
  napsDetailInfo: null,
  selectionsDetailInfo: null,
  selectionsDone: false,
  earlyStage: true,
  total_pages: 1
}

const reducer = {
  [types.FETCH_DATA]: (state) =>
    produce(state, (draft) => {
      draft.isLoading = true
      draft.runs = null
      draft.total_pages = 1
      draft.raceDetails = null
      draft.courseRaces = []
      draft.allRaces = []
    }),

  [types.FETCH_DATA_SUCCESS]: (state, { payload }) =>
    produce(state, (draft) => {
      draft.isLoading = false
      draft.races = payload.races
      draft.racesCourseNames = payload.racesCourseNames
      draft.racesStartTime = payload.racesStartTime
      draft.selection = payload.selections
      draft.entry = payload.entry
      draft.isEntrySubmitted = payload.is_entry_submitted
      draft.isSelectionSubmitted = payload.is_selection_submitted
      draft.isExample = payload.is_example
      draft.earlyStage = payload.early_stage
      draft.submittedIds = payload.sub_ids
    }),

  [types.FETCH_DATA_FAILED]: (state, { payload }) =>
    produce(state, (draft) => {
      draft.isLoading = false
      draft.isCommentLoading = false
      draft.isSingleRaceLoading = false
      draft.errors = payload
    }),

  [types.FETCH_ALL_RACES_DATA]: (state) =>
    produce(state, (draft) => {
      draft.isLoading = true
      draft.runs = null
      draft.raceDetails = null
      draft.courseRaces = []
    }),

  [types.FETCH_ALL_RACES_DATA_SUCCESS]: (state, { payload }) =>
    produce(state, (draft) => {
      draft.isLoading = false
      draft.allRaces = payload.races
      draft.total_pages = payload.total_pages
    }),

  [types.FETCH_ALL_RACES_DATA_FAILED]: (state, { payload }) =>
    produce(state, (draft) => {
      draft.isLoading = false
      draft.isCommentLoading = false
      draft.isSingleRaceLoading = false
      draft.errors = payload
    }),

  [types.FETCH_ALL_RACES_PAGINATION_DATA_SUCCESS]: (state, { payload }) =>
    produce(state, (draft) => {
      draft.allRaces = [...state.allRaces, ...payload.races]
    }),

  [types.FETCH_ALL_RACES_PAGINATION_DATA_FAILED]: (state, { payload }) =>
    produce(state, (draft) => {
      draft.errors = payload
    }),

  [types.FETCH_DETAILED_DATA]: (state) =>
    produce(state, (draft) => {
      draft.isLoading = true
      draft.isSingleRaceLoading = true
      draft.runs = null
      draft.raceDetails = null
      draft.courseRaces = []
      draft.allRaces = []
    }),

  [types.FETCH_DETAILED_DATA_SUCCESS]: (state, { payload }) =>
    produce(state, (draft) => {
      draft.runs = payload.runs
      draft.raceDetails = payload.raceDetails
      draft.courseRaces = payload.courseRaces
      draft.isCommentLoading = payload.isCommentLoading
      draft.isLoading = false
      draft.isSingleRaceLoading = false
    }),

  [types.GET_COMMENTS]: (state) =>
    produce(state, (draft) => {
      draft.isCommentLoading = true
    }),

  [types.LIKE_UNLIKE_COMMENT_SUCCESS]: (state, { payload }) =>
    produce(state, (draft) => {
      if (state.raceDetails) {
        draft.raceDetails.comments = helpers.updateLikeUnlike(
          state.raceDetails.comments,
          payload.raceId,
          payload.commentId,
          payload.hasUserLiked
        )
      }
      if (state.courseRaces && state.courseRaces.length) {
        draft.courseRaces = state.courseRaces.map((race) => {
          const shallowRace = { ...race }
          if (shallowRace.id === payload.raceId) {
            return {
              ...shallowRace,
              comments: helpers.updateLikeUnlike(
                shallowRace.comments,
                payload.raceId,
                payload.commentId,
                payload.hasUserLiked
              )
            }
          }
          return shallowRace
        })
      }
      if (state.allRaces && state.allRaces.length) {
        draft.allRaces = state.allRaces.map((race) => {
          const shallowRace = { ...race }
          if (shallowRace.id === payload.raceId) {
            return {
              ...shallowRace,
              comments: helpers.updateLikeUnlike(
                shallowRace.comments,
                payload.raceId,
                payload.commentId,
                payload.hasUserLiked
              )
            }
          }
          return shallowRace
        })
      }
    }),

  [types.DELETE_COMMENT_SUCCESS]: (state, { payload }) =>
    produce(state, (draft) => {
      if (state.raceDetails) {
        draft.raceDetails.comments = helpers.updateDeleteComment(
          state.raceDetails.comments,
          payload.raceId,
          payload.commentId
        )
      }
      if (state.courseRaces && state.courseRaces.length) {
        draft.courseRaces = state.courseRaces.map((race) => {
          const shallowRace = { ...race }
          if (shallowRace.id === payload.raceId) {
            return {
              ...shallowRace,
              comments: helpers.updateDeleteComment(
                shallowRace.comments,
                payload.raceId,
                payload.commentId
              )
            }
          }
          return shallowRace
        })
      }
      if (state.allRaces && state.allRaces.length) {
        draft.allRaces = state.allRaces.map((race) => {
          const shallowRace = { ...race }
          if (shallowRace.id === payload.raceId) {
            return {
              ...shallowRace,
              comments: helpers.updateDeleteComment(
                shallowRace.comments,
                payload.raceId,
                payload.commentId
              )
            }
          }
          return shallowRace
        })
      }
    }),

  [types.GET_REPLIED_COMMENT]: (state) =>
    produce(state, (draft) => {
      draft.isCommentLoading = true
    }),

  [types.GET_REPLIED_COMMENT_SUCCESS]: (state, { payload }) =>
    produce(state, (draft) => {
      if (state.raceDetails) {
        draft.raceDetails.comments = helpers.updateRepliedComments(
          state.raceDetails.comments,
          payload.raceId,
          payload.commentId,
          payload.childComments,
          payload.previousReply,
          payload.nextReply,
          payload.reply_count,
          payload.hasReplied
        )
      }
      if (state.courseRaces && state.courseRaces.length) {
        draft.courseRaces = state.courseRaces.map((race) => {
          const shallowRace = { ...race }
          if (shallowRace.id === payload.raceId) {
            return {
              ...shallowRace,
              comments: helpers.updateRepliedComments(
                shallowRace.comments,
                payload.raceId,
                payload.commentId,
                payload.childComments,
                payload.previousReply,
                payload.nextReply,
                payload.reply_count,
                payload.hasReplied
              )
            }
          }
          return shallowRace
        })
      }
      if (state.allRaces && state.allRaces.length) {
        draft.allRaces = state.allRaces.map((race) => {
          const shallowRace = { ...race }
          if (shallowRace.id === payload.raceId) {
            return {
              ...shallowRace,
              comments: helpers.updateRepliedComments(
                shallowRace.comments,
                payload.raceId,
                payload.commentId,
                payload.childComments,
                payload.previousReply,
                payload.nextReply,
                payload.reply_count,
                payload.hasReplied
              )
            }
          }
          return shallowRace
        })
      }
      draft.isCommentLoading = false
    }),

  [types.GET_COMMENTS_SUCCESS]: (state, { payload }) =>
    produce(state, (draft) => {
      if (state.raceDetails) {
        draft.raceDetails.comments =
          parseInt(payload.page) === 1
            ? helpers.updateComments(payload.comments)
            : helpers.updateComments(
                state.raceDetails.comments.concat(payload.comments)
              )
        draft.raceDetails.previousComment = payload.previousComment
        draft.raceDetails.nextComment = payload.nextComment
        draft.raceDetails.comment_count = payload.comment_count
      }
      if (state.courseRaces && state.courseRaces.length) {
        draft.courseRaces = state.courseRaces.map((race) => {
          const shallowRace = { ...race }
          if (shallowRace.id === payload.raceId) {
            return {
              ...shallowRace,
              comments:
                parseInt(payload.page) === 1
                  ? helpers.updateComments(payload.comments)
                  : helpers.updateComments(
                      shallowRace.comments.concat(payload.comments)
                    ),
              previousComment: payload.previousComment,
              nextComment: payload.nextComment,
              comment_count: payload.comment_count
            }
          }
          return shallowRace
        })
      }
      if (state.allRaces && state.allRaces.length) {
        draft.allRaces = state.allRaces.map((race) => {
          const shallowRace = { ...race }
          if (shallowRace.id === payload.raceId) {
            return {
              ...shallowRace,
              comments:
                parseInt(payload.page) === 1
                  ? helpers.updateComments(payload.comments)
                  : helpers.updateComments(
                      shallowRace.comments.concat(payload.comments)
                    ),
              previousComment: payload.previousComment,
              nextComment: payload.nextComment,
              comment_count: payload.comment_count
            }
          }
          return shallowRace
        })
      }
      draft.isCommentLoading = false
    }),

  [types.CREATE_COMMENT]: (state) =>
    produce(state, (draft) => {
      draft.isCommentLoading = true
    }),

  [types.CHANGE_DATE]: (state, { payload }) =>
    produce(state, (draft) => {
      draft.currentDate = payload
    }),

  [types.CHANGE_COURSE]: (state, { payload }) =>
    produce(state, (draft) => {
      draft.selectedCourse = payload
    }),

  [types.CHANGE_START_TIME]: (state, { payload }) =>
    produce(state, (draft) => {
      draft.selectedStartTime = payload
    }),

  [types.CHANGE_START_TIMES_OPTIONS]: (state, { payload }) =>
    produce(state, (draft) => {
      draft.racesStartTime = payload
    }),

  [types.CHANGE_STATS_MODE]: (state, { payload }) =>
    produce(state, (draft) => {
      draft.selectedWp = payload
    }),

  [types.ADD_SELECTION_SUCCESS]: (state, { payload }) =>
    produce(state, (draft) => {
      draft.selection = { runs: payload.selected }
      draft.isSelectionSubmitted =
        state.submittedIds.length === payload.selected.length &&
        isEqual(
          [...state.submittedIds].sort(),
          [...payload.selected.map(({ id }) => id)].sort()
        )
    }),

  [types.ADD_SELECTION_FAILED]: (state, { payload }) =>
    produce(state, (draft) => {
      draft.isLoading = false
      draft.errors = payload
    }),

  [types.REMOVE_SELECTIONS_SUCCESS]: (state, { payload }) =>
    produce(state, (draft) => {
      draft.selection = {
        runs: state.selection.runs.filter(
          (elem) => !payload.deletedIds.find((id) => elem.id === id)
        )
      }
      draft.isSelectionSubmitted = false
    }),

  [types.REMOVE_SELECTIONS_FAILED]: (state, { payload }) =>
    produce(state, (draft) => {
      draft.isLoading = false
      draft.selection = { runs: [] }
      draft.isSelectionSubmitted = false
      draft.errors = payload
    }),

  [types.FETCH_SELECTION_DATA]: (state) =>
    produce(state, (draft) => {
      draft.selectionsDetailInfo = null
    }),

  [types.FETCH_SELECTION_DATA_SUCCESS]: (state, { payload }) =>
    produce(state, (draft) => {
      draft.selectionsDetailInfo = payload
    }),

  [types.SUBMIT_SELECTIONS_SUCCESS]: (state, { payload }) =>
    produce(state, (draft) => {
      draft.selectionsDetailInfo = null
      draft.isSelectionSubmitted = true
      draft.submittedIds = payload.ids
    }),

  [types.RESET_SELECTIONS_SUCCESS]: (state) =>
    produce(state, (draft) => {
      draft.selection = { runs: [] }
    }),

  [types.RESET_SELECTIONS_FAILED]: (state) =>
    produce(state, (draft) => {
      draft.selection = { runs: [] }
    }),

  [types.RESET_COURSE]: (state) =>
    produce(state, (draft) => {
      draft.selectedCourse = null
    }),

  [types.RESET_START_TIME]: (state) =>
    produce(state, (draft) => {
      draft.selectedStartTime = null
    }),

  [types.ADD_NAP_SUCCESS]: (state, { payload }) =>
    produce(state, (draft) => {
      draft.isEntrySubmitted = payload.is_entry_submitted
      draft.entry = {
        ...payload
      }
    }),

  [types.FETCH_NAPS_DATA_SUCCESS]: (state, { payload }) =>
    produce(state, (draft) => {
      draft.napsDetailInfo = payload
    }),

  [types.SUBMIT_NAPS_SUCCESS]: (state) =>
    produce(state, (draft) => {
      draft.isEntrySubmitted = true
    }),

  [types.UPDATE_NAGME_IN_RACES]: (state, { payload }) =>
    produce(state, (draft) => {
      if (state.runs && state.runs.length) {
        draft.runs = state.runs.map((run) => {
          const shallowRun = { ...run }
          if (run.horse.id === payload.data.horse.id) {
            return {
              ...shallowRun,
              nag_me: {
                auto_delete: payload.data.auto_delete,
                horse_id: payload.data.horse.id,
                id: payload.data.id,
                note: payload.data.note
              }
            }
          }
          return shallowRun
        })
      }
      if (state.courseRaces && state.courseRaces.length) {
        draft.courseRaces = state.courseRaces.map((race) => {
          const shallowRace = { ...race }
          shallowRace.runs = race.runs.map((run) => {
            const shallowRun = { ...run }
            if (run.horse.id === payload.data.horse.id) {
              return {
                ...shallowRun,
                nag_me: {
                  auto_delete: payload.data.auto_delete,
                  horse_id: payload.data.horse.id,
                  id: payload.data.id,
                  note: payload.data.note
                }
              }
            }
            return shallowRun
          })
          return shallowRace
        })
      }
      if (state.allRaces && state.allRaces.length) {
        draft.allRaces = state.allRaces.map((race) => {
          const shallowRace = { ...race }
          shallowRace.runs = race.runs.map((run) => {
            const shallowRun = { ...run }
            if (run.horse.id === payload.data.horse.id) {
              return {
                ...shallowRun,
                nag_me: {
                  auto_delete: payload.data.auto_delete,
                  horse_id: payload.data.horse.id,
                  id: payload.data.id,
                  note: payload.data.note
                }
              }
            }
            return shallowRun
          })
          return shallowRace
        })
      }
    })
}

export const racesReducer = handleActions(reducer, initialState, {
  prefix: types.PREFIX
})
