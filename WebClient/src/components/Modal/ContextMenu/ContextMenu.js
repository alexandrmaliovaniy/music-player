import './ContextMenu.css';
const ContextMenu = ({title, options, offset, click}) => {
    return (
        <div className="ContextMenu" style={{left: `${offset.x}px`, top: `${offset.y}px`}}>
            <div className="title">{title}</div>
            <ul className="options">
                {
                    options.map(el => {
                        return <li className="option" key={el._id} onClick={()=>click(el._id)}>{el.name}</li> 
                    })
                }
            </ul>
        </div>
    )
}

export default ContextMenu;