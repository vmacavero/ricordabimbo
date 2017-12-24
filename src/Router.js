import { StackNavigator } from 'react-navigation';
import ConfigAge from './screens/ConfigAge';
import HomeScreen from './screens/HomeScreen';
import SingleChildConfig from './screens/SingleChildConfig';
import CalendarSelection from './screens/CalendarSelection';
import TimeToSchoolSelection from './screens/TimeToSchoolSelection';
import EndOfConfig from './screens/EndOfConfig';
import ReminderOk from './screens/ReminderOk';
import Reload from './screens/Reload';

const Router = StackNavigator(
  {
    home: { screen: HomeScreen }, /*HomeScreen, ConfigAge*/
    config: { screen: ConfigAge },
    singlechildconfig: { screen: SingleChildConfig },
    calendarselection: { screen: CalendarSelection },
    timetoschoolselection: { screen: TimeToSchoolSelection },
    endofconfig: { screen: EndOfConfig },
    reminderok: { screen: ReminderOk }
  });

  export default Router;
