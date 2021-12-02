import * as Font from 'expo-font';

const useFonts = async () => {
  await Font.loadAsync({
    'Montserrat': require('../fonts/Montserrat-Regular.ttf'),
    'MontserratLight': require('../fonts/Montserrat-Light.ttf'),
    'MontserratMedium': require('../fonts/Montserrat-Medium.ttf'),
    'MontserratBold': require('../fonts/Montserrat-Bold.ttf'),
    'MontserratSemiBold': require('../fonts/Montserrat-SemiBold.ttf'),
    'MontserratExtraBold': require('../fonts/Montserrat-ExtraBold.ttf'),
    'MontserratBlack': require('../fonts/Montserrat-Black.ttf'),
  });
};

export default useFonts;
