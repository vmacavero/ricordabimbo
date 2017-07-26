import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import ConfigAge from './screens/ConfigAge';
import HomeScreen from './screens/HomeScreen';
import SingleChildConfig from './screens/SingleChildConfig';
import CalendarSelection from './screens/CalendarSelection';
import TimeToSchoolSelection from './screens/TimeToSchoolSelection';

class App extends Component {
constructor(props) {
  super(props);
}
  render() {
    const MainNavigator = StackNavigator(
      {
        home: { screen: HomeScreen },
        config: { screen: ConfigAge },
        singlechildconfig: { screen: SingleChildConfig },
        calendarselection: { screen: CalendarSelection },
        timetoschoolselection: { screen: TimeToSchoolSelection }
      });
    return (
        <MainNavigator />
    );
  }
}
export default App;
