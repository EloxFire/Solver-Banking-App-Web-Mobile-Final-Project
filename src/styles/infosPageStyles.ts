import {red, black, white, green} from './variables';

export const infosPageStyles = {
  statsContainer:{
    flexDirection: 'row',
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderBottomColor: black,
    paddingBottom: 20,
    marginTop: 40,
  },
  statsCard:{
    alignItems:'center',
  },
  statTitle:{
    fontFamily: 'MontserratBold',
    fontSize: 25,
    color: black,
  },
  statSubtitle:{
    fontFamily: 'MontserratBold',
    fontSize: 35,
    color: black,
  },
  applicationInfosTitle:{
    marginTop: 20,
    // marginBottom: 5,
    fontFamily: 'MontserratBold',
    fontSize: 20,
    color: black,
  },
  applicationInfosContainer:{
    marginTop: 30,
  },
  littleAppText:{
    fontFamily: 'MontserratSemiBold',
    fontSize: 15,
    marginVertical: 2
  },
  accountInfoTitle:{
    marginVertical: 10,
    fontSize: 20,
    fontFamily: 'MontserratSemiBold',
  },
  accountInfosContainer:{
    flexDirection: 'column',
    alignItems: 'center',
  },
  row:{
    flexDirection: 'row',
  },
  accountInfoCard:{
    width: '50%',
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountCardText:{
    fontSize: 15,
  },
}
