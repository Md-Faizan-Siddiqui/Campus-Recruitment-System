let initialState = {
    loginUser: null,
    loginStatus: false,
    isLoader: true,
    role: null,
    allUsers: [],
    allJobs: [],
    // jobDetail: {}
}

const addUser = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_USER":
            return {
                ...state,
                ...action.payload
            }
        default: return state
    }
}

export default addUser