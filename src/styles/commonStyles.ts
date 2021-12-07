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
    color: black,
  },
  redSpan:{
    color: red,
  },
  textInput:{
    borderRadius: 10,
    borderWidth: 1,
    padding: 2,
    paddingLeft: 5,
    paddingRight: 5,
    marginTop: 2,
    fontFamily: 'Montserrat',
  },
  textLabel:{
    fontFamily: 'Montserrat',
    marginTop: 20,
    fontSize: 20,
    color: black,
  },
  successText:{
    color: green,
    fontSize: 20,
    textAlign: 'center',
  },
  failureText:{
    color: red,
    fontSize: 20,
    textAlign: 'center',
  },
  datePickerOpenner:{
    borderRadius: 10,
    borderWidth: 1,
    height: 30,
    padding: 2,
    paddingLeft: 5,
    paddingRight: 5,
    marginTop: 2,
    fontFamily: 'Montserrat',
    justifyContent: 'center',
  },
  datePickerOpennerText:{
    fontSize: 15
  }
}
