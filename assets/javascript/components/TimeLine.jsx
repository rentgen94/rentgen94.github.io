import React from 'react';
import classNames from 'classnames/bind';
import styles from '../../css/TimeLine.css';
import ContentItem from './ContentItem';

const containerLeft = classNames(styles.container, styles.left);
const containerRight = classNames(styles.container, styles.right);

class TimeLine extends React.Component {
    render() {
        return (
            <div className={ styles.timeline }>
                <div className={ containerLeft }>
                    <div className={ styles.content }>
                        <ContentItem
                            header="MEPhI National Research Nuclear University"
                            start="2012"
                            finish="Current"
                            secondInLabel
                            text="Electronics and Automation of Physics Installations"
                        />
                    </div>
                </div>
                <div className={ containerRight }>
                    <div className={ styles.content }>
                        <ContentItem
                            header="Course atom.mail.ru"
                            start="Autumn 2016"
                            text="Frontend Development"
                        />
                    </div>
                </div>
                <div className={ containerLeft }>
                    <div className={ styles.content }>
                        <ContentItem
                            header="Course atom.mail.ru"
                            start="Summer 2016"
                            text="HighLoad"
                        />
                    </div>
                </div>
                <div className={ containerRight }>
                    <div className={ styles.content }>
                        <ContentItem
                            header="Course atom.mail.ru"
                            start="Summer 2016"
                            text="Go - backend development language"
                        />
                    </div>
                </div>
                <div className={ containerLeft }>
                    <div className={ styles.content }>
                        <ContentItem
                            header="Course atom.mail.ru"
                            start="Spring 2016"
                            text="Java Development"
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default TimeLine;
