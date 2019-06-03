import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { remote, ipcRenderer } from 'electron'
import { Navbar, Nav, NavDropdown, Image } from 'react-bootstrap'
import nHentai from '../assets/nhentai.png'

const { getCurrentWindow, dialog } = remote

class Menubar extends Component {
    onClick = e => {
        ipcRenderer.send('open-dialog')
    }

    render() {
        return (
            <Navbar variant="dark" bg="dark">
                <Link to="/" className="navbar-brand">

                    <Image src={nHentai} style={{ maxWidth: '3rem' }} />
                    nHentai Downloader
                </Link>
                <NavDropdown title="Menu" className="ml-auto" alignRight>
                    <Link to="/" className="dropdown-item">Home</Link>
                    <NavDropdown.Item onClick={this.onClick}>Change Download Path</NavDropdown.Item>
                    <Link to="/about" className="dropdown-item">About</Link>
                </NavDropdown>
            </Navbar>
        )
    }
}

export default Menubar