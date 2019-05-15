import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';


class Calendar extends Component {

  constructor(props) {
      super(props);
      this.state = {trainings: []};
    }

  componentDidMount() {
      this.fetchTrainings();
    }

  fetchTrainings = () => {
      fetch('https://customerrest.herokuapp.com/gettrainings')
      .then(res => res.json())
      .then(jsondata => this.setState({trainings: jsondata}))
    }

    render() {

      const localizer = BigCalendar.momentLocalizer(moment)
      const caledarEvents = [];

      for (let i = 0; i < this.state.trainings.length; i++) {
        const event = {
          id: i,
          start: moment.utc(this.state.trainings[i].date)._d,
          end: moment.utc(this.state.trainings[i].date).add(this.state.trainings[1].duration, 'minute')._d,
          title: this.state.trainings[i].activity
          }
          caledarEvents.push(event);
          moment.locale('ko', {
            week: {
                dow: 1,
                doy: 1,
            },
        });
        BigCalendar.momentLocalizer(moment);
      }

        return (
              <div style ={{height: 700}}>
                <BigCalendar
                  localizer={localizer}
                  events={caledarEvents}
                  views={['month', 'week', 'day']} // eri näkymät 
                  defaultDate={new Date()} //mikä päivä tänään on
                />
              </div>
            )
    }
}

export default Calendar;