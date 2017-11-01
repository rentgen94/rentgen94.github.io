import React from 'react';
import classNames from 'classnames/bind';
import { Grid, Row, Col } from 'react-bootstrap';
import styles from '../../css/ContextHolder.css';
import ContentItem from './ContentItem';
import TimeLine from './TimeLine';

const gridStyles = classNames(styles.card);
const workExp1 = 'Create modal dialogs for CAD GETR-1 with JavaFX. Support and modification tech-elements library for visualization technological-algorithms. Develop web-server on Spring for web-algorithms-visualization.';

class ContentHolder extends React.Component {
    render() {
        return (
            <Grid fluid>
                <Row className={ gridStyles }>
                    <Col xs={ 12 } className={ styles.workExp }>
                        <h2 className={ styles.cardh2 }>
                            <i className="fa fa-suitcase fa-fw" />
                            Work Experience
                        </h2>
                        <Row>
                            <Col xs={ 12 }>
                                <ContentItem
                                    header="Java Developer / MEPhI National Research Nuclear University"
                                    start="March 2014"
                                    finish="Current"
                                    secondInLabel
                                    text={ workExp1 }
                                    hr
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className={ gridStyles }>
                    <Col xs={ 12 } className={ styles.education }>
                        <h2 className={ styles.cardh2 }>
                            <i className="fa fa-certificate fa-fw" />
                            Education
                        </h2>
                        <Row>
                            <Col xs={ 12 } style={ { paddingBottom: '16px' } }>
                                <TimeLine />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default ContentHolder;
