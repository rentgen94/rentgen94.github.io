import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from '../../css/App.css';
import NavbarHolder from './NavbarHolder';
import ContentHolder from './ContentHolder';

const gridStyles = classNames(styles.margin, styles.maxGridWidth);

class App extends React.Component {
    render() {
        return (
            <Grid fluid className={ gridStyles }>
                <Row>
                    <Col xs={ 12 } sm={ 4 } className={ styles.navBar }>
                        <NavbarHolder />
                        <br />
                    </Col>
                    <Col xs={ 12 } sm={ 8 } className={ styles.context }>
                        <ContentHolder />
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default App;
