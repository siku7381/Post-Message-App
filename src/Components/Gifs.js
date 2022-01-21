import React from 'react';


const Gifs = ({renderError ,selectedGif, renderGifs, handleSearchChange, handleSubmit}) =>{
    
    return (
        <div className='m-2'>
            {renderError()}
            
            <div className='container'>
                <form className='form-inline justify-content-center m-2' onSubmit={handleSubmit}>
                    <input type="text" placeholder='Search GIFs' className='form-control' onChange={handleSearchChange} />
                </form>
                <div className='d-flex flex-column'>
                    
                    <p>{selectedGif && <img src={selectedGif.target.currentSrc} />}</p>
                    {renderGifs()}
                </div>
            </div>
            
        </div>
        
    );
    
}
export default Gifs;