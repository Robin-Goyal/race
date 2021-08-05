/* eslint-disable react/prop-types */
import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import Loader from '@components/shared/Loader'
import Comment from '@components/shared/Comment'
import CommentItem from '@components/shared/CommentItem'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import * as qs from 'query-string'
import useModal from '@utils/customHook/useModal'
import { MODALS_LIST } from '@constants/common'
import kebabCase from 'lodash/kebabCase'
import { TIME_TRIMMED_FORMAT } from '@constants/dateFormatsList'
import { KeyboardArrowDown } from '@material-ui/icons/'
import dateConversations from '@utils/timeUtils'
import { makeStyles, Button } from '@material-ui/core'
import ReportCommentModal from '@components/shared/ReportCommentModal'
import {
  createComment,
  getComments,
  deleteComment,
  likeUnlikeComment,
  getRepliedComment,
  replyComment,
  reportComment
} from '../../ducks/actions'

const useRaceCommentsStyles = makeStyles(() => ({
  arrowIcon: {
    marginLeft: 10,
    width: 18,
    height: 18
  },
  viewMore: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 25
  },
  viewMoreButton: {
    fontSize: 15,
    fontFamily: '"Lato",sans-serif',
    color: '#11141A',
    fontWeight: 700,
    textTransform: 'inherit'
  }
}))

const RaceComments = ({
  raceInfo,
  currentDate,
  selectedStartTime,
  isLoading = false,
  isCommentLoading = false
}) => {
  const classes = useRaceCommentsStyles()
  const [activeComment, setActiveComment] = React.useState({})
  const [hideReplyBox, setHideReplyBox] = React.useState(false)
  const dispatch = useDispatch()
  const [isReportCommentOpen, toggleReportCommentOpen] = useModal(
    MODALS_LIST.REPORT_COMMENT_MODAL
  )

  const handleLike = (comment) => {
    dispatch(
      likeUnlikeComment({
        isLiked: comment.has_current_user_liked,
        id: comment.id,
        raceId: raceInfo.id
      })
    )
    setHideReplyBox(false)
  }

  const handleReportComment = (data) => {
    dispatch(reportComment({ data }))
  }

  const handleDelete = async (comment) => {
    dispatch(
      deleteComment({
        id: comment.id,
        onSuccess: () => {
          dispatch(
            getComments({
              date: dateConversations.getFormattedDate(currentDate),
              course: kebabCase(raceInfo.course.name),
              time: selectedStartTime
                ? dateConversations.getFormattedUtcDate(
                    selectedStartTime,
                    TIME_TRIMMED_FORMAT,
                    dateConversations.checkDST(selectedStartTime)
                  )
                : '',
              id: raceInfo.id,
              page: 1,
              hideComments: false
            })
          )
        },
        onError: (e) => {
          toast.error(e)
        }
      })
    )
    setHideReplyBox(false)
  }

  const handleReply = async (comment, hideComments) => {
    dispatch(
      getRepliedComment({
        id: comment.id,
        raceId: raceInfo.id,
        page: 1,
        hideComments
      })
    )
    setHideReplyBox(false)
  }

  const handleReplyComment = (comment, data) => {
    dispatch(
      replyComment({
        comment: data,
        id: comment.id,
        page: 1,
        raceId: raceInfo.id
      })
    )
    setHideReplyBox(false)
  }

  const onSubmit = (data) => {
    if (!isCommentLoading && !isLoading) {
      dispatch(
        createComment({
          date: dateConversations.getFormattedDate(currentDate),
          course: kebabCase(raceInfo.course.name),
          time: selectedStartTime
            ? dateConversations.getFormattedUtcDate(
                selectedStartTime,
                TIME_TRIMMED_FORMAT,
                dateConversations.checkDST(selectedStartTime)
              )
            : '',
          comment: data,
          id: raceInfo.id
        })
      )
      setHideReplyBox(true)
    }
  }

  const handleComment = useCallback(() => {
    if (raceInfo.comment_count > 0 && !isCommentLoading && !isLoading) {
      dispatch(
        getComments({
          date: dateConversations.getFormattedDate(currentDate),
          course: kebabCase(raceInfo.course.name),
          time: selectedStartTime
            ? dateConversations.getFormattedUtcDate(
                selectedStartTime,
                TIME_TRIMMED_FORMAT,
                dateConversations.checkDST(selectedStartTime)
              )
            : '',
          id: raceInfo.id,
          page: 1,
          hideComments: raceInfo.comments.length < 1 ? false : true
        })
      )
    }
    setHideReplyBox(false)
  }, [dispatch, raceInfo])

  const fetchMoreComments = () => {
    const {
      query: { page }
    } = qs.parseUrl(raceInfo.nextComment)
    if (page && !isCommentLoading && !isLoading) {
      dispatch(
        getComments({
          date: dateConversations.getFormattedDate(currentDate),
          course: kebabCase(raceInfo.course.name),
          time: selectedStartTime
            ? dateConversations.getFormattedUtcDate(
                selectedStartTime,
                TIME_TRIMMED_FORMAT,
                dateConversations.checkDST(selectedStartTime)
              )
            : '',
          id: raceInfo.id,
          page,
          hideComments: false
        })
      )
    }
    setHideReplyBox(false)
  }

  const fetchMoreReplies = (comment) => {
    const {
      query: { page }
    } = qs.parseUrl(comment.nextReply)
    if (page && !isCommentLoading && !isLoading) {
      dispatch(
        getRepliedComment({
          id: comment.id,
          raceId: raceInfo.id,
          page,
          hideComments: false
        })
      )
      setHideReplyBox(false)
    }
  }

  const openReportCommentOpen = (comment) => {
    setActiveComment(comment)
    toggleReportCommentOpen()
    setHideReplyBox(false)
  }

  return (
    <div className="rtr-race-comments">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="rtr-comment-section">
            <Comment
              className="rtr-comments"
              id={`rtr-comments-${raceInfo.id}`}
              name={`comments-${raceInfo.id}`}
              placeholder="Write your comments here ...."
              onSubmit={onSubmit}
              showComments
              handleComment={handleComment}
              count={raceInfo.comment_count}
              visibleCommentsCount={
                raceInfo.comments ? raceInfo.comments.length : 0
              }
              isLoading={isCommentLoading}
            />
          </div>
        </>
      )}
      {raceInfo.comments && raceInfo.comments.length > 0 && (
        <>
          <div className="rtr-comment-list-section">
            {raceInfo.comments.map((comment) => (
              <CommentItem
                key={comment.id}
                raceInfo={raceInfo}
                comment={comment}
                fetchMoreReplies={fetchMoreReplies}
                handleLike={handleLike}
                handleDelete={handleDelete}
                handleReply={handleReply}
                handleReplyComment={handleReplyComment}
                openReportCommentOpen={openReportCommentOpen}
                isLoading={isCommentLoading}
                showReplyButton={true}
                hideReplyBox={hideReplyBox}
                className="rtr-comment-item"
              />
            ))}
          </div>
          {raceInfo.comment_count > raceInfo.comments.length &&
            raceInfo.nextComment && (
              <div className={classes.viewMore}>
                <Button
                  endIcon={<KeyboardArrowDown className={classes.arrowIcon} />}
                  onClick={fetchMoreComments}
                  className={classes.viewMoreButton}
                >
                  See more comments
                </Button>
              </div>
            )}
        </>
      )}
      {isReportCommentOpen && (
        <ReportCommentModal
          isOpen={isReportCommentOpen}
          handleClose={toggleReportCommentOpen}
          comment={activeComment}
          handleReportComment={handleReportComment}
        />
      )}
    </div>
  )
}

RaceComments.propTypes = {
  raceInfo: PropTypes.shape({}),
  isLoading: PropTypes.bool,
  isCommentLoading: PropTypes.bool
}
export default RaceComments
