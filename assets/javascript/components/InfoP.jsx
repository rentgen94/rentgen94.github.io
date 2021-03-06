import React from 'react';
import PropTypes from 'prop-types';

class InfoP extends React.Component {
    static propTypes = {
        imgClass: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        isBold: PropTypes.bool,
    }

    static defaultProps = {
        isBold: false,
    }

    constructor(props) {
        super(props);
        this.state = { isBold: this.props.isBold !== undefined };
    }

    render() {
        const isBolded = this.state.isBold;

        let text = null;
        if (!isBolded) {
            text = (
                <p>
                    <i className={ `fa ${this.props.imgClass} fa-fw` } />
                    { this.props.name }
                </p>
            );
        } else {
            text = (
                <p>
                    <b>
                        <i className={ `fa ${this.props.imgClass} fa-fw` } />
                        { this.props.name }
                    </b>
                </p>
            );
        }

        return (
            <div>
                { text }
            </div>
        );
    }
}

export default InfoP;
