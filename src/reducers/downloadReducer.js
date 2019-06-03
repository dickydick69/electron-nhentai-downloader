import { GET_DOWNLOAD_DIR, ADD_DOUJIN_LIST, UPDATE_DOUJIN_PROGRESS } from '../actions/types'

const initialState = {
    downloadPath: 'C:/Awkwkwk',
    doujinList: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_DOWNLOAD_DIR:
            return {
                ...state,
                downloadPath: action.payload
            }
        case ADD_DOUJIN_LIST:
            return {
                ...state,
                doujinList: [...state.doujinList, action.payload]
            }
        case UPDATE_DOUJIN_PROGRESS:
            return {
                ...state,
                doujinList: state.doujinList.map(doujin => {
                    if (doujin.id === action.payload.id) {
                        return { ...doujin, progress: action.payload.progress }
                    }
                    return doujin
                })
            }
        default:
            return state
    }
}