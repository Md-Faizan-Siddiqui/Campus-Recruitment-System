import addUser from './userReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    addUser
})

export default rootReducer