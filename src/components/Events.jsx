import React from 'react'

const Events = ({ events, }) => {
    return (
        <ul> {events.map(event => {
            return (<li>{event.name} </li>)
        })} </ul>
    )
}


export default Events