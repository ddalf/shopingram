const defaultValue = {
    avatarUrl: '',
    username: null,
    account: '',
    abstract: false,
    email: '',
    userId: '',
    businessman: ''
}

const userInfo = (state = defaultValue, action) => {
    switch (action.type) {
      case 'ADD_USERINFO':
        return Object.assign({}, state, action.info)
      case 'CHANGE_AVATARURL':
        return   Object.assign({}, state, action.info)
      default:
        return state
    }
  }
  export default userInfo