import React from 'react';
import './ActionButtons.css';

const ActionButton = (props) =>{
    
    return(
        <div className='action-buttons'>
            <div className='d-flex flex-row justify-content-around mb-2'>
                <button className=''><i className="fas fa-user-tag icon-1"/> Tag Friends</button>
                <button className=''><i className="fas fa-map-marker-alt icon-2"/> Check In</button>
            </div>
            <div className='d-flex flex-row justify-content-around'>
                <button className='' onClick={props.clickGif}><img className="icon-1" src="https://img.icons8.com/ios-glyphs/30/000000/attach-gif.png" alt='gif icon'/> GIF</button>
                <button className=''><i className="far fa-calendar-alt icon-2"/> Tag Event</button>
            </div>
            
            
        </div>
    );
}
export default ActionButton;