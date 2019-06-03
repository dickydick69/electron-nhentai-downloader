import React, { Component } from 'react'
import Downloader from './Downloader'
import DownloadList from './DownloadList'

export default class Home extends Component {
    render() {
        return (
            <>
                <Downloader />
                <DownloadList />
            </>
        )
    }
}
