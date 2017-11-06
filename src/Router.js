import { StackNavigator } from 'react-navigation';
import ConfigAge from './screens/ConfigAge';
import HomeScreen from './screens/HomeScreen';
import SingleChildConfig from './screens/SingleChildConfig';
import CalendarSelection from './screens/CalendarSelection';
import TimeToSchoolSelection from './screens/TimeToSchoolSelection';
import EndOfConfig from './screens/EndOfConfig';

const Router = StackNavigator(
  {
    home: { screen: ConfigAge }, /*HomeScreen*/
    config: { screen: ConfigAge },
    singlechildconfig: { screen: SingleChildConfig },
    calendarselection: { screen: CalendarSelection },
    timetoschoolselection: { screen: TimeToSchoolSelection },
    endofconfig: { screen: EndOfConfig },
  });

  export default Router;
