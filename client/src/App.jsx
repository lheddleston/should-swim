import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import styles from '../dist/css/App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: 0,
            dayRain: 0,
            temp: 0,
            windSpeed: 0,
            answer: "Yes, you should",
            reason: ""
        }
    }
    getWeather() {
        axios.get('/weather')
            .then((response) => {
                this.setState({
                    date: response.data[0].date,
                    dayRain: response.data[0].dayRain,
                    temp: response.data[0].temp,
                    windSpeed: response.data[0].windSpeed
                })
            })
            .catch((error) => {
                console.log('Error getting weather data from database: ', error);
            })
            .finally(() => {
                console.log('GET listing request sent')
            })
    }
    getRain() {

    }
    getAnswer() {
        if (this.state.dayRain === 1) {
            this.setState({
                answer: "No, you should not",
                reason: "It rained within the last day so bacteria levels in the water could be high. Gross!"
            })
        }
        else if (this.state.windSpeed > 8) {
            this.setState({
                answer: "No, you should not",
                reason: "It's too windy, you could be swept out to sea!"
            })
        }
    }

    componentDidMount() {
        this.getWeather();
        this.getRain();
        this.getAnswer();
    }
    render() {

        return (
            <div className={styles.app}>
                <h1 className={styles.title}>{this.state.answer} swim in the San Francisco Bay today! </h1>
                <h2 className={styles.reason}>{this.state.reason}</h2>
                <h3 className={styles.temp}>The temperature is {this.state.temp} degrees Fahrenheit</h3>
                <h3 className={styles.wind}>The wind is blowing at {this.state.windSpeed} meters per second</h3>
                <div className={styles.gridGallery}>
                    <div>
                        <img className={styles.images} src={'https://no-cap.s3-us-west-1.amazonaws.com/Screen+Shot+2020-03-23+at+9.54.17+AM.png'} alt="SwimmerMan" />
                    </div>
                    <div>
                        <img className={styles.images} src={'https://no-cap.s3-us-west-1.amazonaws.com/Screen+Shot+2020-03-24+at+11.39.36+AM.png'} alt="Seal" />
                    </div>
                    <div>
                        <img className={styles.images} src={'https://no-cap.s3-us-west-1.amazonaws.com/Screen+Shot+2020-03-24+at+11.49.17+AM.png'} alt="Dog" />
                    </div>
                    <div>
                        <img className={styles.images} src={'https://no-cap.s3-us-west-1.amazonaws.com/Screen+Shot+2020-03-24+at+11.53.06+AM.png'} alt="SwimmerWoman" />
                    </div>
                </div>
            </div>
        )
    }
}


ReactDOM.render(<App />, document.getElementById("app"));