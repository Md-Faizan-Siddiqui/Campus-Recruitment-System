let initialState = {
    loginUser: null,
    loginStatus: false,
    isLoader: true,
    role: null,
    allUsers: [],
    allJobs: []
}

const addUser = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_USER":
            // console.log("action", action)
            return {
                ...state,
                ...action.payload
            }
        default: return state
    }
}

export default addUser