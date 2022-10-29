import React from 'react';
import classes from './MyModal.module.css'

const MyModal = ({children, visible, setVisible}) => {

    const root = [classes.myModal];

    if(visible) {
        root.push(classes.active)
    }

    return (
        <div className={root.join(' ')} onClick={() => setVisible(false)}>
            <div className={classes.myModalContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default MyModal;