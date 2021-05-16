import './NotFound.css';
const NotFound = () => {
    return (
        <div className="NotFound">
            <div className="notFoundIformation">
                <div className="notFoundStatus">
                    404
                </div>
                <div className="notFoundMessage">
                    Page does not exist
                </div>
            </div>
        </div>
    )
}

export default NotFound;