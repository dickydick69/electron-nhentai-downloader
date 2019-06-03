import React, { Component } from 'react'
import { Card, Button, Form, FormControl, ListGroup, ProgressBar } from 'react-bootstrap'
import cover from '../assets/cover.jpg'

class DownloadItem extends Component {
    render() {
        const { id, title, progress, imageSrc } = this.props.doujin
        return (
            <ListGroup.Item className="py-3">
                <img src={imageSrc} className="float-left" style={{ height: '6rem', width: '4rem', maxHeight: '6rem', maxWidth: '4rem' }} />
                <div style={{ marginLeft: '5rem' }}>
                    {title}
                    <br />
                    {id}
                    <ProgressBar variant={progress < 50 ? "danger" : (progress < 100 ? "warning" : "success") } now={progress} label={progress < 100 ? `${progress}%` : 'Done'} style={{ position: 'absolute', width: '70%', bottom: '1rem' }} />
                </div>
            </ListGroup.Item>
        )
    }
}

export default DownloadItem