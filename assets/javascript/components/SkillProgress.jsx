import React from 'react';
import PropTypes from 'prop-types';
import { Button, ProgressBar } from 'react-bootstrap';
import styles from '../../css/SkillProgress.css';

class SkillProgress extends React.Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        progress: PropTypes.number.isRequired,
        header: PropTypes.bool,
        active: PropTypes.bool,
        showLabel: PropTypes.bool,
    }

    static defaultProps = {
        header: false,
        active: false,
        showLabel: false,
    }

    render() {
        const localProgress = (
            <ProgressBar>
                <ProgressBar
                    className={ styles.customProgress }
                    active={ this.props.active }
                    now={ this.props.progress }
                    label={ this.props.showLabel ? `${this.props.progress}%` : false }
                />
            </ProgressBar>
        );

        let block = null;
        if (this.props.header) {
            block = (
                <Button>
                    <p className={ styles.test }>{ this.props.name }</p>
                    { localProgress }
                </Button>
            );
        } else {
            block = (
                <div>
                    <p>{ this.props.name }</p>
                    { localProgress }
                </div>
            );
        }

        return (
            <div>
                { block }
            </div>
        );
    }
}

export default SkillProgress;
