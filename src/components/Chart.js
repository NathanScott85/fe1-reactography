import React from 'react'
import { Doughnut } from 'react-chartjs-2'


const Chart = ({ events }) => {
    console.log(events)

    /*
    create tally object of category and value
    create keys variable 
    create values variable 
    change values of labels and data


    {
        music: 50
        theatre: 25
        sport: 25
    }

    */

    const tally = events.reduce((acc, val, i) => {
        if (acc[val.genre] === undefined) acc[val.genre] = 1;
        else acc[val.genre]++;
        return acc;
    }, {})

    const categoryProperties = Object.keys(tally)
    const categoryValues = Object.values(tally)

    const data = {
        labels: categoryProperties,
        datasets: [{
            data: categoryValues,
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
            ],
            hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
            ]
        }]
    };
    return (
        <div>
            <h2>Doughnut Example</h2>
            <Doughnut data={data} />
        </div>
    );
}




export default Chart 