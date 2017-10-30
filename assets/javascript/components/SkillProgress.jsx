import React from 'react';
import { Button, ProgressBar } from 'react-bootstrap';
import styles from '../../css/SkillProgress.css';

class SkillProgress extends React.Component {
    render() {
        const localProgress = (
            <ProgressBar>
                <ProgressBar
                    className={ styles.customProgress }
                    active
                    now={ this.props.progress }
                    label={ `${this.props.progress}%` }
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
