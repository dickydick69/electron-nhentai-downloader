import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Button, Form, FormControl, ListGroup, ProgressBar } from 'react-bootstrap'
import DownloadItem from './DownloadItem'

class DownloadList extends Component {
    render() {
        const {doujinList} = this.props
        return (
            <Card className="mt-3" style={{ height: '60vh', maxHeight: '60vh', overflowY: 'auto' }}>
                <Card.Body>
                    <ListGroup variant="flush">
                        {
                            doujinList.map(doujin => (
                                <DownloadItem key={doujin.id} doujin={doujin} />
                            ))
                        }
                    </ListGroup>
                </Card.Body>
            </Card>
        )
    }
}

const mapStateToProps = state => ({
    doujinList: state.download.doujinList
})

export default connect(mapStateToProps, {})(DownloadList)