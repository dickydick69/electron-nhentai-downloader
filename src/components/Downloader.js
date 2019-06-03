import React, { Component } from 'react'
import { Card, Button, Form, FormControl } from 'react-bootstrap'
import { connect } from 'react-redux'
import { getDownloadPath,fetchDoujin } from '../actions/downloadAction'
import { ipcRenderer } from 'electron'

class Download extends Component {
    state = {
        id: ''
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = e => {
        e.preventDefault()
        this.props.fetchDoujin(this.state.id)
    }

    componentDidMount() {
        this.props.getDownloadPath()
    }

    render() {
        return (
            <Card>
                <Card.Body>
                    <Form onSubmit={this.onSubmit}>
                        <FormControl
                            type="text"
                            placeholder="Enter nHentai ID"
                            name="id"
                            onChange={this.onChange}
                            value={this.state.id} />
                        <Button type="submit" block variant="outline-danger" className="mt-2">Download</Button>
                    </Form>
                    <div className="font-italic text-center mt-1">
                        Current Download Path: 
                        <br /> {this.props.downloadPath}
                    </div>
                </Card.Body>
            </Card>
        )
    }
}

const mapStateToProps = state => ({
    downloadPath: state.download.downloadPath
})

export default connect(mapStateToProps, { getDownloadPath,fetchDoujin })(Download)