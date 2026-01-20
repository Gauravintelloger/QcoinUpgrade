import { Easing } from 'react-native';
import { Navigation } from '@react-navigation/native';


const layout = () => {
  return {
    layout: {
      backgroundColor: '#FFFFFF',
      direction: 'ltr',
    },
  };
};

const topBar = () => {
  return {
    topBar: {
      visible: false,
      drawBehind: true,
    },
  };
};

const animations = () => {
  return {
    animations: {
      setRoot: {
        enabled: true,
        waitForRender: true,
        alpha: {
          from: 0,
          to: 1,
          duration: 400,
          startDelay: 100,
          interpolation: Easing.out(Easing.ease),
        },
      },
      push: {
        enabled: true,
        waitForRender: true,
        // content: {
        //   alpha: {
        //     from: 0,
        //     to: 1,
        //     duration: 300,
        //     startDelay: 0,
        //     interpolation: 'accelerate',
        //   },
        // },
        // content: {
        //   alpha: {
        //     from: 0,
        //     to: 1,
        //     duration: 500,
        //     startDelay: 0,
        //     interpolation: 'accelerate'
        //   },
        //   x: {
        //     from: 1000,
        //     to: 0,
        //     duration: 500,
        //     startDelay: 0,
        //     interpolation: 'accelerate'
        //   }
        // }
      },
      // pop: {
      //   enabled: true,
      //   waitForRender: true,
      //   content: {
      //     alpha: {
      //       from: 1,
      //       to: 0,
      //       duration: 300,
      //       startDelay: 0,
      //       interpolation: 'decelerate',
      //     },

      //   },
      // content: {
      //   alpha: {
      //     from: 1,
      //     to: 0,
      //     duration: 500,
      //     startDelay: 0,
      //     interpolation: 'accelerate'
      //   },
      //   x: {
      //     from: 0,
      //     to: 1000,
      //     duration: 500,
      //     startDelay: 0,
      //     interpolation: 'accelerate'
      //   }
      // }
      // }
    },
  };
};

const setDefaultOptions = () => {
  console.log('START d');
  Navigation.setDefaultOptions({
    // statusBar: { style: 'light' },
    topBar: {
      visible: false,
      drawBehind: true,
      // topMargin: 0,
      // hideOnScroll: true,
      // background: { color: '#005EB8' },
      // visible: true,
      // drawBehind: false,
      // title: {
      //   text: 'DASHBOARD',
      //   color: '#fff'
      // },
      // animate: true,
      // largeTitle: {
      //   visible: true,
      //   fontSize: 20,
      //   color: '#fff'
      // }
    },
    statusBar: {
      drawBehind: false,
      backgroundColor: '#005EB8',
      // style: 'dark',
      // backgroundColor: '005EB8',
      style: 'light',
    },
    layout: {
      orientation: ['portrait'],
      direction: 'ltr',
      componentBackgroundColor: 'transparent',
      backgroundColor: '#fff'
    },
    bottomTabs: {
      titleDisplayMode: 'alwaysShow',
      // height: 100,
      visible: true,
      animate: true,
    },
    bottomTab: {
      // elevation: 40,
      textColor: '#CBCBCB',
      selectedTextColor: '#005EB8',
      iconColor: '#CBCBCB',
      selectedIconColor: '#005EB8',
      // iconInsets: { top: 0, left: 0, bottom: -14, right: 0 }, // Change to your numbers
    },
    // ...layout(),
    // ...topBar(),
    ...animations(),
  });
};

export default setDefaultOptions;
