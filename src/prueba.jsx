const Prueba = (description) => {
    let name = description ?? "Button";
    return (
        <button type="button">{name}</button>
    )
}