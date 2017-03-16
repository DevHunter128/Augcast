// PDFDisplay.js
// Responsible for displaying the PDF

import React from 'react';
import PDF from 'react-pdf-js';
//import { database } from './../../database/database_init';

class PDFDisplay extends React.Component {

    constructor(props) {
        super(props);

        // Initial state
        this.state = {
            page: 1,
            pages: 1
        };

        // Bind all functions so they can refer to "this" correctly
        this.onDocumentComplete = this.onDocumentComplete.bind(this);
        this.skipToTime = this.skipToTime.bind(this);
    }

    onDocumentComplete(documentLength) {
        this.setState({ pages: documentLength });

    }

    skipToTime(timestamp) {
        this.props.onSkipToTime(timestamp);
    }

    prettyTimestamp(timestamp) {
        var minutes = parseInt(timestamp / 60);
        var seconds = timestamp % 60;
        if (seconds < 10) seconds = '0' + seconds;
        if (minutes < 10) minutes = '0' + minutes;
        return minutes + ':' + seconds;
    }

    render() {
        var that = this;
        var sentinelArray = Array.from(Array(this.state.pages));
        var PDFpages = sentinelArray.map(function(x, i){
            var j = i + 1;
            var stamp = that.props.timestamps != undefined ?
                that.props.timestamps[j] :
                undefined;
            return (
                <div key={'ButtonPageCombo' + i} className="pdf-page" onClick={() => {that.skipToTime(stamp);}}>
                    {(that.props.timestamps != undefined && !isNaN(stamp) && stamp != -1) ?
                        <div className="pdf-timestamp">{'Slide ' + j + ' (Skip to ' + that.prettyTimestamp(stamp) + ')'}</div>
                            : <div></div>}
                    <PDF
                        key={'PDFPage' + i}
                        file={that.props.pdfURL}
                        onDocumentComplete={that.onDocumentComplete}
                        scale={1}
                        page= {i + 1} />
                </div>
            );
        });

        return (
            <div className="pdf-pages">{PDFpages}</div>
        );
    }
}

export default PDFDisplay;
