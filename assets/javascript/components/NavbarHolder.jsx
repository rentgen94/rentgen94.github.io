import React from 'react';
import { bootstrapUtils } from 'react-bootstrap/lib/utils';
import { Image, ProgressBar } from 'react-bootstrap';
import styles from '../../css/NavBar.css';
import progStyles from '../../css/SkillProgress.css';
import InfoP from './InfoP';
import Skills from './Skills';
import SkillProgress from './SkillProgress';

bootstrapUtils.addStyle(ProgressBar, styles.customProgress);

class NavbarHolder extends React.Component {
    render() {
        return (
            <div className={ styles.card }>
                <div className={ styles.displayContainer }>
                    <Image src="../assets/images/Desert.jpg" responsive alt="Avatar" />
                    <h2 className={ styles.displayBottomLeft }>Schurbin Egor</h2>
                </div>
                <div className={ styles.infoContainer }>
                    <InfoP imgClass="fa-briefcase" name="Engineer" />
                    <InfoP imgClass="fa-home" name="Russia, RU" />
                    <InfoP imgClass="fa-envelope" name="rentgen.94@mail.ru" />
                    <hr />
                    <InfoP imgClass="fa-asterisk" name="Skills:" isBold />
                    {/* <Skills /> */}
                    <SkillProgress name="Java" progress={ 78 } />
                    <SkillProgress name="Spring" progress={ 40 } />
                    <SkillProgress name="HTML" progress={ 90 } />
                    <SkillProgress name="CSS" progress={ 75 } />
                    <SkillProgress name="JavaScript" progress={ 80 } />
                    <hr />
                    <InfoP imgClass="fa-globe" name="Languages" isBold />
                    <p>English</p>
                    <ProgressBar>
                        <ProgressBar
                            className={ progStyles.customProgress }
                            now={ 75 }
                        />
                    </ProgressBar>
                    <p>Russian</p>
                    <ProgressBar>
                        <ProgressBar
                            className={ progStyles.customProgress }
                            now={ 100 }
                        />
                    </ProgressBar>
                </div>
            </div>
        );
    }
}

export default NavbarHolder;

