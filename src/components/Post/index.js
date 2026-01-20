import { connect } from 'react-redux';
import Post from './Post';
import { accessTokenSelector, pendingSelector, errorSelector } from '../../store/selectors/userSelectors';
import { changePasswordAction } from '../../store/actions/userActions';
import { postsByIdSelector } from '../../store/selectors/postsSelectors';
import { likeUnLikeAction } from '../../store/actions/postsActions';

const mapStateToProps = state => {
  return {
    postsById: postsByIdSelector(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    likeUnLike: (payload) => dispatch(likeUnLikeAction(payload))

  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps
  };
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Post);