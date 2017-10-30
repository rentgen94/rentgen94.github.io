import React from 'react';
import { Collapse } from 'react-bootstrap';
import styles from '../../css/Skills.css';
import SkillProgress from './SkillProgress';

class Skills extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            open: true,
        };
    }

    handleClick = () => {
        this.setState({ open: !this.state.open });
    }

    render() {
        return (
            <div>
                <SkillProgress
                    name="Backend"
                    progress={ 75 }
                    header
                    onClick
                />
                <Collapse in={ this.state.open }>
                    <div>
                        <SkillProgress name="Java" progress={ 78 } />
                        <SkillProgress name="Spring" progress={ 40 } />
                    </div>
                </Collapse>
            </div>
        );
    }
}

export default Skills;
