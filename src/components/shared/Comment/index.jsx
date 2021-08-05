import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import {
  TextField,
  useTheme,
  makeStyles,
  CircularProgress,
  Button
} from '@material-ui/core'
import {
  KeyboardArrowUp,
  KeyboardArrowDown,
  ChatBubble,
  ChatBubbleOutline
} from '@material-ui/icons/'
import './comment.scss'

const useCommentStyles = makeStyles(() => ({
  commentIcon: {
    marginRight: 8,
    width: 18,
    height: 18
  },
  arrowIcon: {
    marginLeft: 6,
    width: 18,
    height: 18
  },
  helperText: {
    color: '#a4afb7',
    textAlign: 'right',
    fontSize: 14,
    marginRight: 10
  }
}))

const Comment = ({
  className,
  errors,
  placeholder,
  id,
  name,
  count,
  showComments,
  isLoading,
  handleComment,
  visibleCommentsCount,
  ...props
}) => {
  const classes = useCommentStyles()
  const wrapperClassNames = classnames('form-input', className)
  const inputClassNames = classnames('form-input__input')
  const [data, setData] = React.useState(props.value)
  const theme = useTheme()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.onSubmit(data)
    setData('')
  }

  const handleChange = (e) => {
    setData(e.target.value)
    props.inputOnChange(e.target.value)
  }

  return (
    <div className={wrapperClassNames}>
      <div className="form-input__wrapper">
        <TextField
          id={id}
          name={name}
          type="text"
          fullWidth
          value={data}
          variant="outlined"
          multiline
          rowsMax="15"
          className={
            !showComments
              ? `post-reply-input ${inputClassNames}`
              : inputClassNames
          }
          helperText={errors}
          placeholder={placeholder}
          error={!!errors}
          onChange={handleChange}
        />
        <div className="comment-right-section">
          {isLoading && (
            <div className="comment-loader">
              <CircularProgress
                disableShrink
                color="primary"
                style={{ width: 18, height: 18 }}
              />
            </div>
          )}
          <Button
            color="primary"
            disabled={isLoading || !data}
            onClick={handleSubmit}
            style={{ marginRight: 10 }}
          >
            Submit
          </Button>
          {showComments && (
            <div
              className="comments-count"
              onClick={handleComment}
              style={count !== 0 ? { cursor: 'pointer' } : null}
            >
              {count === 0 ? (
                <ChatBubbleOutline className={classes.commentIcon} />
              ) : (
                <ChatBubble
                  className={classes.commentIcon}
                  style={{ color: theme.palette.primary.light }}
                />
              )}
              {count} {count === 1 ? 'Comment' : 'Comments'}
              {count !== 0 && (
                <>
                  {visibleCommentsCount > 0 ? (
                    <KeyboardArrowUp className={classes.arrowIcon} />
                  ) : (
                    <KeyboardArrowDown className={classes.arrowIcon} />
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

Comment.defaultProps = {
  value: '',
  errors: '',
  placeholder: '',
  count: 0,
  visibleCommentsCount: 0,
  showComments: false,
  isLoading: false,
  inputOnChange: () => void 0,
  onSubmit: () => void 0
}

Comment.propTypes = {
  value: PropTypes.any,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  errors: PropTypes.string,
  inputOnChange: PropTypes.func,
  onSubmit: PropTypes.func,
  handleComment: PropTypes.func,
  visibleCommentsCount: PropTypes.number,
  count: PropTypes.number,
  showComments: PropTypes.bool,
  isLoading: PropTypes.bool
}

export default Comment
