import axios from 'axios';
import React,{useState} from 'react';
import Gifs from './Gifs';
import ActionButton from './ActionButtons';
import Loader from './Loader';
import './MessageBody.css';

const MessageBody = () =>{

    const api_key = 'ytqbCQv98u6It7viRUgDNivUwEZD8A1D';
    const [ selectedGif , setSelectedGif ] = useState('');
    const [isLoading,setLoading] = useState(false)
    const [searchText,setSearchText] = useState('cat');
    const [ isError,setIsError ] = useState(false);
    const limit = 15;
    const [gifs,setGifs] = useState([]);

    const handleClickGif = async (event) =>{
        event.preventDefault();
        setLoading(true);
        setIsError(false);
        try {
            const result = await axios(`https://api.giphy.com/v1/gifs/trending`,{
                params:{
                    api_key ,
                    limit
                }
            });
            setGifs(result.data.data)
            setLoading(false)
        } catch (error) {
            setIsError(true);
            setTimeout(() =>{
                setIsError(false)
            },4000)
        }
        
    }

    const onGifSelect = (gif) =>{
        setSelectedGif(gif);
    }

    const renderSelectedGif = ()=>{
        return (
            <div>
                {!selectedGif ? <img src={selectedGif.images.fixed_height.url} /> : ''}
            </div>
        );
    }

    const gifsData = gifs.map((gif) =>{
        return (
            <img key={gif.id} src={gif.images.fixed_height.url} alt={gif.title} onClick={onGifSelect}/>
        );
    })
    const renderGifs = () =>{
        if (isLoading) {
            return <Loader />
        }
        return (
            <div className=''  style={{ width: '45em',overflowX: 'auto',whiteSpace: "nowrap"}}>
                
                <div className='d-flex justify-content-around' >
                    {gifsData}
                </div>
                
            </div>
        );
    }
    
    const renderError = () =>{
        if (isError) {
            return (
                <div className='alert alert-danger alert-dismissible fade show' role="alert">
                    Unable to get the Gifs, Please try again in a few minutes !
                </div>

            );
        }
    }
    const handleSearchChange = (event) =>{
        setSearchText(event.target.value);
    }
    const handleSubmit = async (event) =>{
        event.preventDefault();
        setLoading(true);
        setIsError(false);
        
        try {
            const result = await axios(`https://api.giphy.com/v1/gifs/search`,{
                params:{
                    api_key ,
                    limit,
                    q:searchText
                }
            });
            setGifs(result.data.data)
            setLoading(false)
        } catch (error) {
            setIsError(true);
            setTimeout(() =>{
                setIsError(false)
            },4000)
        }

    }
    
    
    return (
        <div className='container mt-5 message-body' >
            <div className='d-flex justify-content-around my-4'>
                <h3 className='mx-3'><i className="fab fa-facebook fb"/> Post Message App</h3>
                <button type="button" className="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#messageModal">
                    Add Post
                </button>
            </div>
            <div className="card " style={{width: "25rem",margin:"auto"}}>
                <h5 className="card-title">My First Post</h5>
                <div className="card-body">
                    <img src="https://developers.giphy.com/branch/master/static/use_case_messaging-bbab18ff6f9851eafcda5b49b087ebb3.gif" className="card-img-top" alt="..." />
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    
                </div>
                <div className="card-footer">
                    <small className="text-muted">Last updated 3 mins ago</small>
                </div>
            </div>
            

            <div className="modal fade" id="messageModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="modal-title flex-header" id="exampleModalLabel">
                            <div><i className="fas fa-pencil-alt" /> Compose Post</div>
                            <div><i className="fas fa-image" /> Photo/Video Album</div>
                            <div><i className="fas fa-video" /> Live Video</div>
                            </div>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className='d-flex justify-content-start'>
                                <i className='fas fa-user-circle' style={{fontSize:"2em"}}/>
                                <input type="text" style={{outline:'none',border:'none'}} placeholder='Write Something Here'/>
                            </div>
                            <div>
                                {selectedGif && renderSelectedGif()}
                            </div>
                            <div>
                                <Gifs 
                                    onGifSelect={onGifSelect} 
                                    selectedGif={selectedGif}
                                    renderError={renderError} 
                                    renderGifs={renderGifs} 
                                    handleSearchChange={handleSearchChange} 
                                    handleSubmit={handleSubmit}
                                />
                            </div>
                            <ActionButton clickGif={handleClickGif}/>
                        </div>
                        
                        <div className="modal-footer">
                            <button type="button" className="btn border" ><i className='fas fa-lock' /> Only me <i className='fas fa-caret-down' /></button>
                            <button type="button" className="btn btn-primary">Post</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MessageBody;