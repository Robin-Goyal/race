import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import isEmpty from 'lodash/isEmpty'
import { KeyboardArrowDown } from '@material-ui/icons/'
import {
  Avatar,
  useTheme,
  makeStyles,
  Button,
  Tooltip,
  IconButton
} from '@material-ui/core'
import {
  AccountCircle,
  ThumbUp,
  ThumbUpOutlined,
  ChatBubbleOutline,
  ChatBubble,
  FlagOutlined,
  DeleteForever
} from '@material-ui/icons/'
import { isAdmin } from '@store/memberStore/selectors'
import useMemberStore from '@utils/customHook/useMembersStore'
import Comment from '@components/shared/Comment'
import helpers from '@utils/helpers'
import './comment-item.scss'

const useCommentItemStyles = makeStyles(() => ({
  commentIcon: {
    width: 18,
    height: 18
  },
  icons: {
    height: 50,
    width: 50
  },
  actionButton: {
    fontSize: 14,
    fontFamily: '"Lato",sans-serif',
    textTransform: 'inherit',
    letterSpacing: '0.2px'
  },
  viewMore: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 5
  },
  viewMoreButton: {
    fontSize: 15,
    fontFamily: '"Lato",sans-serif',
    color: '#11141A',
    fontWeight: 700,
    textTransform: 'inherit'
  }
}))

const CommentItem = ({
  className,
  parentComment,
  comment,
  isLoading,
  handleDelete,
  handleReply,
  handleLike,
  fetchMoreReplies,
  handleReplyComment,
  showReplyButton,
  openReportCommentOpen,
  hideReplyBox
}) => {
  const [showReply, setReply] = React.useState(
    comment.replies && comment.replies.length > 0 ? true : false
  )
  const classes = useCommentItemStyles()
  const isAdminUser = useSelector(isAdmin)
  const theme = useTheme()
  const {
    memberStorage: { profile }
  } = useMemberStore()

  useEffect(() => {
    if (hideReplyBox) {
      setReply(false)
    }
  }, [hideReplyBox])

  const handleLikeAction = () => {
    if (!isLoading) {
      handleLike(comment)
    }
  }

  const handleReplyAction = async () => {
    if (!isLoading) {
      await handleReply(comment, showReply)
      setReply(!showReply)
    }
  }

  const handleDeleteAction = async () => {
    if (!isLoading) {
      await handleDelete(comment)
    }
  }

  const onSubmit = (data) => {
    if (!isLoading) {
      handleReplyComment(comment, data)
    }
  }

  const openReportComment = () => {
    if (!isLoading) {
      openReportCommentOpen(comment)
    }
  }

  const handleMoreReplies = () => {
    if (!isLoading) {
      fetchMoreReplies(comment)
    }
  }

  return (
    <div className={className} id={comment.id}>
      <div className="rtr-comment-wrap">
        <div className="rtr-comment-left-section">
          <div
            className="rtr-comment-avatar rtr-comment-margin-right"
            style={{ display: 'none' }}
          >
            {!isEmpty(comment.image) ? (
              <Avatar className={classes.icons} src={comment.image} />
            ) : (
              <AccountCircle
                className={classes.icons}
                style={{ color: '#a4afb7' }}
              />
            )}
          </div>
          <div className="rtr-comment-section">
            <div className="rtr-comment-section-author">
              <div className="rtr-comment-section-author-name rtr-comment-margin-right">
                {comment.comment_by || comment.reply_by || 'Unknown'}
              </div>
              <div className="rtr-comment-section-author-time">
                (
                {helpers.timeDifference(new Date(), new Date(comment.modified))}
                )
              </div>
            </div>
            <div className="rtr-comment-section-text">
              {parentComment && !isEmpty(parentComment) ? (
                <span>
                  @
                  {`${parentComment.comment_by} ` ||
                    `${parentComment.reply_by} ` ||
                    'Unknown '}
                </span>
              ) : (
                ''
              )}
              {comment.comment_text}
            </div>
          </div>
        </div>
        <div className="rtr-comment-right-section">
          <div
            className="rtr-comment-like rtr-comment-action"
            style={{ marginRight: showReplyButton ? 25 : 5 }}
          >
            <Button
              startIcon={
                comment.has_current_user_liked ? (
                  <ThumbUp
                    className={classes.commentIcon}
                    style={{ color: theme.palette.primary.light }}
                  />
                ) : (
                  <ThumbUpOutlined className={classes.commentIcon} />
                )
              }
              onClick={handleLikeAction}
              className={classes.actionButton}
              style={
                comment.has_current_user_liked
                  ? { color: theme.palette.primary.light, fontWeight: 700 }
                  : null
              }
              disabled={
                profile.user_id &&
                (+profile.user_id === comment.commenter_id ||
                  +profile.user_id === comment.replier_id)
              }
            >
              Like ({comment.like_count})
            </Button>
          </div>
          {showReplyButton && (
            <div className="rtr-comment-reply rtr-comment-action">
              <Button
                startIcon={
                  comment.has_current_user_replied ? (
                    <ChatBubble
                      className={classes.commentIcon}
                      style={{ color: theme.palette.primary.light }}
                    />
                  ) : (
                    <ChatBubbleOutline className={classes.commentIcon} />
                  )
                }
                onClick={handleReplyAction}
                className={classes.actionButton}
                style={
                  comment.has_current_user_replied
                    ? { color: theme.palette.primary.light, fontWeight: 700 }
                    : null
                }
              >
                Reply ({comment.reply_count})
              </Button>
            </div>
          )}
          {profile.user_id &&
            +profile.user_id !== comment.commenter_id &&
            +profile.user_id !== comment.replier_id && (
              <div className="rtr-comment-report rtr-comment-action">
                <Tooltip title="Report Comment">
                  <IconButton onClick={openReportComment}>
                    <FlagOutlined className={classes.commentIcon} />
                  </IconButton>
                </Tooltip>
              </div>
            )}
          {profile.user_id &&
            (+profile.user_id === comment.commenter_id ||
              +profile.user_id === comment.replier_id ||
              isAdminUser) && (
              <div className="rtr-comment-report rtr-comment-action">
                <Tooltip title="Delete Comment">
                  <IconButton onClick={handleDeleteAction}>
                    <DeleteForever className={classes.commentIcon} />
                  </IconButton>
                </Tooltip>
              </div>
            )}
        </div>
      </div>
      {comment.replies && comment.replies.length > 0 && (
        <div className="rtr-comment-inner-list-section">
          {comment.replies.map((childComment) => (
            <CommentItem
              key={childComment.id}
              comment={childComment}
              parentComment={comment}
              handleLike={handleLike}
              fetchMoreReplies={fetchMoreReplies}
              handleDelete={handleDelete}
              handleReply={handleReply}
              handleReplyComment={handleReplyComment}
              isLoading={isLoading}
              showReplyButton={false}
              openReportCommentOpen={openReportCommentOpen}
              className="rtr-comment-child-item"
            />
          ))}
        </div>
      )}
      {comment.replies &&
        comment.reply_count > comment.replies.length &&
        comment.nextReply &&
        showReply && (
          <div className={classes.viewMore}>
            <Button
              endIcon={<KeyboardArrowDown className={classes.arrowIcon} />}
              onClick={handleMoreReplies}
              className={classes.viewMoreButton}
            >
              See more replies
            </Button>
          </div>
        )}
      <div className="rtr-comment-reply-section">
        {showReply && (
          <Comment
            className="rtr-comments"
            id={`rtr-comments-${comment.id}`}
            name={`comments-${comment.id}`}
            placeholder="Write your comments here ...."
            onSubmit={onSubmit}
            count={comment.reply_count}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  )
}

CommentItem.defaultProps = {
  className: 'rtr-comment-item',
  comment: {},
  parentComment: {},
  isLoading: false,
  showReplyButton: true,
  hideReplyBox: false,
  handleDelete: () => void 0,
  handleReply: () => void 0,
  handleLike: () => void 0,
  fetchMoreReplies: () => void 0,
  handleReplyComment: () => void 0,
  openReportCommentOpen: () => void 0
}

CommentItem.propTypes = {
  className: PropTypes.string,
  comment: PropTypes.object,
  parentComment: PropTypes.object,
  isLoading: PropTypes.bool,
  showReplyButton: PropTypes.bool,
  hideReplyBox: PropTypes.bool,
  handleDelete: PropTypes.func,
  handleReply: PropTypes.func,
  handleLike: PropTypes.func,
  fetchMoreReplies: PropTypes.func,
  handleReplyComment: PropTypes.func,
  openReportCommentOpen: PropTypes.func
}

export default CommentItem
