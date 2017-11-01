import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../css/ContentItem.css';

class ContentItem extends React.Component {
    render() {
        let Calendar = null;
        const hr = (this.props.hr ? <hr /> : null);
        if (this.props.finish !== undefined) {
            if (this.props.secondInLabel) {
                Calendar = (
                    <h6>
                        <i className="fa fa-calendar fa-fw" />
                        { this.props.start } - <span className={ styles.labelDefault }>
                            { this.props.finish }
                        </span>
                    </h6>
                );
            } else {
                Calendar = (
                    <h6>
                        <i className="fa fa-calendar fa-fw" />
                        { this.props.start } - { this.props.finish }
                    </h6>
                );
            }
        } else {
            Calendar = (
                <h6>
                    <i className="fa fa-calendar fa-fw" />
                    { this.props.start }
                </h6>
            );
        }

        return (
            <div className={ styles.contentItem }>
                <h5>
                    <b>
                        { this.props.header }
                    </b>
                </h5>
                { Calendar }
                <p>
                    { this.props.text }
                </p>
                { hr }
            </div>
        );
    }
}

export default ContentItem;
