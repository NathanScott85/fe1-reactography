import React from 'react'

const Events = ({ events }) => {
    // console.log(events)
    return (
        <ul>
            {events.map((event, index) => {
                return (
                    <li key={index} >
                        {Object.keys(event)}
                        {console.log(event.classifications[0].segment.name)}
                    </li>
                )
            })}
        </ul>
    )

}


export default Events