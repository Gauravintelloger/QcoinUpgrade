import C from '../constants';
import { fromJS } from 'immutable';

const commentsForPost = {
  pending: false,
  list: [],
  error: null,
  success: false,
  // page: 1,
  // hasMore: true,
  // lastRequest: {}
};

const defaultState = fromJS({
  commentsForPost: {
    ...commentsForPost,
  },
});

const comments = (state = defaultState, action) => {
  switch (action.type) {
    case C.GET_COMMENTS_FOR_POST_REQUESTED:
      // const pageNum = action.payload.page ? action.payload.page : 1
      let people = state.get('commentsForPost')[action.payload.id]
        ? state.get('commentsForPost')[action.payload.id].list
        : [];
      return state.merge({
        commentsForPost: {
          ...state.get('commentsForPost'),
          [action.payload.id]: {
            pending: true,
            success: false,
            list: people,
          },
          // error: null,
        },
      });
    case C.GET_COMMENTS_FOR_POST_SUCCEEDED:
      const commentsForPostbyID = state.get('commentsForPost')[
        action.payload.id
      ]
        ? state.get('commentsForPost')[action.payload.id]
        : { list: [] };
      let lastPeople =
        action.payload.comments.current_page === 1
          ? []
          : [...commentsForPostbyID.list];
      let data1 = [...action.payload.comments.data];
      delete action.payload.comments.data;
      return state.merge({
        commentsForPost: {
          ...state.get('commentsForPost'),
          [action.payload.id]: {
            ...commentsForPostbyID,
            pending: false,
            list: [...lastPeople, ...data1],
            success: true,
            ...action.payload.comments,
          },
        },
      });

    case C.GET_COMMENTS_FOR_POST_FAILED:
      return state.merge({
        commentsForPost: {
          ...state.get('commentsForPost'),
          [action.payload.id]: {
            pending: false,
            list: [],
            error: action.payload,
            success: false,
          },
        },
      });
    case C.CREATE_COMMENT_FOR_POST_REQUESTED:
      return state.merge({});
    case C.CREATE_COMMENT_FOR_POST_SUCCEEDED:
      let commentsForPostbyI = state.get('commentsForPost')[action.payload.id]
        ? state.get('commentsForPost')[action.payload.id]
        : { list: [] };
      return state.merge({
        commentsForPost: {
          ...state.get('commentsForPost'),
          [action.payload.id]: {
            ...commentsForPostbyI,
            list: [
              {
                id: action.payload.comment.post_id,
                body: action.payload.comment.body,
                user_id: 30,
                created_at: 'now',
                commenter: {
                  ...action.payload.user,
                },
              },
              ...commentsForPostbyI.list,
            ],
          },
        },
      });
    case C.DELETE_COMMENT_FOR_POST_SUCCEEDED:
      let commentsForPostbyI11 = state.get('commentsForPost')[action.payload.postId]
        ? state.get('commentsForPost')[action.payload.postId]
        : { list: [] };
      return state.merge({
        commentsForPost: {
          ...state.get('commentsForPost'),
          [action.payload.postId]: {
            ...commentsForPostbyI11,
            list: commentsForPostbyI11.list.filter(comment => comment.id != action.payload.commentId),
          },
        },
      });
    default:
      return state;
  }
};

export default comments;
