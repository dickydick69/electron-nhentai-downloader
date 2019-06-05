import React, { Component } from 'react'
import { Card, Button, Form, FormControl } from 'react-bootstrap'
import { connect } from 'react-redux'
import { getDownloadPath, fetchDoujin } from '../actions/downloadAction'
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
        if (!this.props.doujinList.some(list => list.id == this.state.id)) {
            this.props.fetchDoujin(this.state.id)
        }
        this.setState({
            id: ''
        })
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
    downloadPath: state.download.downloadPath,
    doujinList: state.download.doujinList
})

export default connect(mapStateToProps, { getDownloadPath, fetchDoujin })(Download)