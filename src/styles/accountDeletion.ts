import {red, black, white, green, orange} from './variables';

export const accountDeletionStyles = {
  container:{
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems:'center',
    marginTop: 80,
  },
  confirmationTitle:{
    fontSize: 30,
    textAlign: 'center',
    color: black,
    fontFamily: 'MontserratBold',
  },
  confirmationSubtitle:{
    fontSize: 20,
    textAlign: 'center',
    color: red,
    fontFamily: 'MontserratBold',
    marginTop: 10,
  },
  disclaimerContainer:{
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    bottom: 100,
    left: 20,
    width: "100%",
    // backgroundColor: 'rgb(21, 164, 90)',
  },
  disclaimerText:{
    textAlign: 'justify',
    color: black,
    fontFamily: 'Montserrat'
  },
  buttonText: {
    textTransform: "uppercase",
    fontSize: 20,
    color: white,
    fontFamily: 'MontserratBold',
  }
}
