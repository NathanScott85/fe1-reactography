import React from 'react'


const Events = ({ events }) => {
    return (
        <ul> {events.map(event => {
            return (
                <div>
                    <li>
                        {event.name}
                        {event.info}
                    </li>
                    <br />
                    <li>
                        <img src={event.image} />
                    </li>
                </div>
            )
        })} </ul>
    )
}


export default Events