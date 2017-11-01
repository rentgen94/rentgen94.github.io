import React from 'react';
import { bootstrapUtils } from 'react-bootstrap/lib/utils';
import { Image, ProgressBar } from 'react-bootstrap';
import styles from '../../css/NavBar.css';
import InfoP from './InfoP';
// import Skills from './Skills';
import SkillProgress from './SkillProgress';

bootstrapUtils.addStyle(ProgressBar, styles.customProgress);

class NavbarHolder extends React.Component {
    render() {
        return (
            <div className={ styles.card }>
                <div className={ styles.displayContainer }>
                    <Image src="../assets/images/Avatar.png" responsive alt="Avatar" />
                    <h2 className={ styles.displayBottomRight }>Schurbin Egor</h2>
                </div>
                <div className={ styles.infoContainer }>
                    <InfoP imgClass="fa-briefcase" name="Engineer & Developer" />
                    <InfoP imgClass="fa-home" name="Russia, RU" />
                    <InfoP imgClass="fa-envelope" name="rentgen.94@mail.ru" />
                    <hr />
                    <InfoP imgClass="fa-asterisk" name="Skills:" isBold />
                    {/* <Skills /> */}
                    <SkillProgress name="Java" progress={ 78 } active showLabel />
                    <SkillProgress name="Spring" progress={ 40 } active showLabel />
                    <SkillProgress name="HTML" progress={ 75 } active showLabel />
                    <SkillProgress name="CSS" progress={ 75 } active showLabel />
                    <SkillProgress name="JavaScript" progress={ 60 } active showLabel />
                    <hr />
                    <InfoP imgClass="fa-globe" name="Languages" isBold />
                    <SkillProgress name="English" progress={ 75 } />
                    <SkillProgress name="Russian" progress={ 100 } />
                </div>
            </div>
        );
    }
}

export default NavbarHolder;

