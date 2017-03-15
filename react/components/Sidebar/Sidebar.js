// Sidebar.js
// Our Navigation Center

import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import { navigateCourse, displayLecture } from '../../redux/actions';
import { browserHistory } from 'react-router';
import { database } from './../../../database/database_init';
import Spinner from 'react-spinkit';
import CourseListContainer from './CourseList.js';
import LectureListContainer from './LectureList.js';
import { MenuItem } from 'react-toolbox/lib/menu';

class InstructorEntrance extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MenuItem className="instructor-entrance">
                <Link to="/instructor">Instructor Entrance</Link>
            </MenuItem>
        );
    }
}

class Sidebar extends React.Component {

    constructor(props) {
        super(props);

        // Initial state
        this.state = {
            loading: true
        };

        // functions
        this.back = this.back.bind(this);
        this.selectCourse = this.selectCourse.bind(this);

        // course selection variable
        this.courses = undefined;

        // database query
        var that = this;
        database.ref('courses').once('value').then(function(snapshot) {
            that.courses = snapshot.val();
            that.setState({loading: false});
        });
    }

    /**
     * Routine before rendering LectureList.
     * Queries database for lecture information regarding selected course.
     */
    componentWillMount() {
        var that = this;

        // if the link contains course id
        if (this.props.courseID) {
            database.ref('lectures/' + this.props.courseID).once('value').then(function(snapshot) {
                that.lectures = snapshot.val();
                var course = that.courses[that.props.courseID];
                var lecture = that.lectures[course.lectures[that.props.lectureNum]];

                // if the link also contains lecture num
                if (that.props.courseID) {
                    that.props.navigateCourse(that.courses[that.props.courseID]);
                    if (that.props.lectureNum) {
                        that.props.displayLecture(course, lecture);
                    }
                }
            });
        }
    }


    /**
     * Handler for the back button.
     * Navigate from LectureList back to CoureList
     */
    back() {
        browserHistory.push('/');
        this.props.navigateCourse(null);
    }


    /**
     * Handler for the course selection..
     * Display LectureList of the selected course.
     */
    selectCourse(course) {
        var that = this;
        database.ref('lectures/' + course.id).once('value').then(function(snapshot) {
            that.lectures = snapshot.val();
            browserHistory.push('/' + course.id);
            that.props.navigateCourse(course);
        });
    }


    render () {

        var list = null;

        // loading
        if (this.state.loading) {
            return <Spinner className="sidebar-loading" spinnerName="three-bounce" />;
        }

        // render lecture list
        else {
            return (
                <div className="sidebar">
                    {this.props.navCourse ? <LectureListContainer back={this.back} lectures={this.lectures} />
                                          : <CourseListContainer courses={this.courses} selectCourse={this.selectCourse} />}
                </div>
            );
                    // <InstructorEntrance />
        }
    }

}

function mapStateToProps (state) {
    return {
        userType:   state.userType,
        navCourse:  state.navCourse
    };
}

function mapDispatchToProps (dispatch) {
    return {
        navigateCourse: (navCourse) => {
            dispatch(navigateCourse(navCourse));
        },
        displayLecture: (currentCourse, currentLecture) => {
            dispatch(displayLecture(currentCourse, currentLecture));
        }
    };
}

const SidebarContainer = connect (mapStateToProps, mapDispatchToProps)(Sidebar);
export default SidebarContainer;
