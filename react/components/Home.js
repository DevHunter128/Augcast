// Home.js
// The landing page for our amazing app
import React from 'react';
import {connect} from 'react-redux';
import SidebarContainer from './Sidebar/Sidebar.js';
import PodcastViewContainer from './PodcastView.js';

class Home extends React.Component {
    constructor(props) {
        super(props);

        // Initial state
        this.state = {
            playing: undefined
        };

        this.selectLecture = this.selectLecture.bind(this);
    }

    selectLecture(lectureID) {
        this.setState({playing: lectureID});
    }

    render () {
        var main = null;
        if (this.props.currentLecture) {
            main = <PodcastViewContainer />;
        } else {
            main = <div className="blank">select lecture to start</div>;
        }

        document.title = 'Augcast';

        return (
            <div>
<<<<<<< HEAD
                <SidebarContainer courseID={this.props.params.courseID}
                                  lectureNum={this.props.params.lectureNum}
                                  selectLecture={this.selectLecture} />
                <div className="main">
                    {main}
                </div>
=======
            <h1>Home</h1>
            <Link to="/test">Open Sidebar (/test)</Link>
            <br/>
            <Link to="/podcastview">Open PodcastView (/podcastview)</Link>
            <br/>
            <Link to="/upload">Open Upload Page (/upload)</Link>
            <br/>
            <Link to="/pdf">Open PDF Display Page (/pdf)</Link>
            <br/>
            <Link to="/elab-request">Open Elab-Request Page</Link>
            <div className="main">
                <SidebarContainer courseID={this.props.params.courseID}
                                  lectureNum={this.props.params.lectureNum}
                                  selectLecture={this.selectLecture} />
                {main}
>>>>>>> 01d2b9f52136502bbc1012273e8b1a57458bb501
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        currentLecture: state.currentLecture,
        username:       state.username
    };
}

const HomeContainer = connect(mapStateToProps)(Home);
export default HomeContainer;
