import React from 'react'

export default function About() {
    return (
        <div className="text-center">
            <h1 className="display-4">
                About
            </h1>
            <p>
                nHentai Downloader is pretty self-explanatory. It's a tool to download from nHentai quickly. 
            </p>
            <p>
                This is my very first Electron project and also my first JS project. So forgive me if there are many dirty codes.
                Anyway, hope this little tool can help ya all! ^^
            </p>
            <h1 className="display-4">
                Why?
            </h1>
            <p>I know. I know there are already tons of nHentai Downloader out there. So why I create another one?</p>
            <p>Well, I don't know. I just literally got bored and had nothing to do. So yeah...</p>
            <h1 className="display-4">
                Special Thanks to:
            </h1>
            <p>
                py7hon - for mirroring nHentai to makes things easier.
                <br /> Node
                <br /> electron-download-manager
                <br /> React Team
                <br /> ArchiverJS
                <br /> et cetera, I can't put everyone here.
            </p>
        </div>
    )
}
