import {StatusBar, StyleSheet} from 'react-native';
import {red, black, white, green} from './variables';


export const commonStyles = {
  viewStyle:{
    paddingTop: StatusBar.currentHeight,
    paddingLeft: 20,
    paddingRight: 20
  },
  button:{
    backgroundColor: red,
    borderRadius: 10,
    height: 45,
    flexDirection: 'row',
    // margin: 2,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
  },
  buttonText:{
    fontFamily: 'MontserratBold',
    textTransform: 'uppercase',
    fontSize: 20,
  },
  forgotPass:{
    fontFamily: 'Montserrat',
    textDecorationLine: 'underline',
    fontSize: 18,
    marginTop: 10,
  }
}
