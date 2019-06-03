import React from 'react'
import {Link} from 'react-router-dom'

export default function First() {
    return (
        <div className="text-center">
            <h1 className="display-4">
                Welcome to nHentai Downloader!
            </h1>
            <Link className="btn btn-outline-danger" to="/">
            Ｄｏｏｒ
            </Link>
        </div>
    )
}
