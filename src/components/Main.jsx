export default function Main(props) {
    const {data} = props
    return (
        <div className="imgContainer">
            {data.media_type === 'video' ?
                <iframe src={data.url} alt={data.title} className="bgImage" />
            :
                <img src={data.url} alt={data.title || 'bg-img'} className="bgImage" />
            }
         </div>
    )
}