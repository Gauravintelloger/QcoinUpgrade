import C from '../constants';

const getLeaderBoardAction = payload => {
  return {
    type: C.GET_LEADER_BOARD_REQUESTED,
    payload
  }
};


export {
  getLeaderBoardAction
};