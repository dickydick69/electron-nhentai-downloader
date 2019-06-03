import { GET_DOWNLOAD_DIR, ADD_DOUJIN_LIST, UPDATE_DOUJIN_PROGRESS } from './types'
import { ipcRenderer } from 'electron'
import store from '../store'
import axios from 'axios'

ipcRenderer.on('download-path', (event, downloadPath) => {
    store.dispatch({
        type: GET_DOWNLOAD_DIR,
        payload: downloadPath
    })
})

ipcRenderer.on('download-progress', (event, progress, id) => {
    store.dispatch({
        type: UPDATE_DOUJIN_PROGRESS,
        payload: {
            progress, id
        }
    })
})

export const getDownloadPath = () => dispatch => {
    ipcRenderer.send('get-current-download-path')
}

export const fetchDoujin = (id) => async dispatch => {
    const { data } = await axios.get(`https://nhent.ai/api/gallery/${id}`)
    let links = []
    if (data) {
        for (let i = 1; i <= data.images.pages.length; i++) {
            links.push(`https://cdn.nhent.ai/galleries/${data.media_id}/${i}.${data.images.pages[i - 1].t === 'j' ? 'jpg' : 'png'}`)
        }

        const { id, media_id, num_pages, title } = data
        dispatch({
            type: ADD_DOUJIN_LIST,
            payload: {
                id,
                media_id,
                num_pages,
                title: title.pretty,
                progress: 0,
                imageSrc: `https://cdn.nhent.ai/galleries/${data.media_id}/1.${data.images.cover.t === 'j' ? 'jpg' : 'png'}`
            }
        })

        ipcRenderer.send('download', links, data)
    }
}