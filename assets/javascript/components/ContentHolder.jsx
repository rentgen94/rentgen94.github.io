import React from 'react';
import classNames from 'classnames/bind';
import { Grid, Row, Col } from 'react-bootstrap';
import styles from '../../css/ContextHolder.css';

const gridStyles = classNames(styles.card);

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
                                <div className={ styles.contextItem }>
                                    <h5><b>Front End Developer / w3schools.com</b></h5>
                                    <h6>
                                        <i className="fa fa-calendar fa-fw" />
                                        Jan 2015 - <span>Current</span>
                                    </h6>
                                    <p>
                                        Lorem ipsum dolor sit amet. 
                                        Praesentium magnam consectetur vel 
                                        in deserunt aspernatur est reprehenderit sunt hic.
                                        Nulla tempora soluta ea et odio, unde doloremque
                                        repellendus iure, iste.</p>
                                    <hr />
                                </div>
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
                            <Col xs={ 12 }>
                                <div className={ styles.contextItem }>
                                    <h5><b>W3Schools.com</b></h5>
                                    <h6>
                                        <i className="fa fa-calendar fa-fw" />
                                        Forever
                                    </h6>
                                    <p>Web Development! All I need to know in one place</p>
                                    <hr />
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default ContentHolder;
