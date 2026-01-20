import { AppRegistry } from 'react-native';
import { setRoot } from './src/navigation';
import { name as appName } from './app.json';
// import SigninScreen from './src/screens/WelcomeScreen/WelcomeScreen';


AppRegistry.registerComponent(appName, () => setRoot());

// import { AppRegistry } from 'react-native';
// import { name as appName } from './app.json';
// import SigninScreen from './src/screens/UserInformationScreen/UserInformationScreen';

// AppRegistry.registerComponent(appName, () => SigninScreen);
