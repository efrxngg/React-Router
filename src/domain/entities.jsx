

export const Product = (props) => {

    console.log(props)

    return (
        <div>
            <h3>{props.name}</h3>
            {props.price}
            {props.count}
            {props.img}
        </div>
    )
}