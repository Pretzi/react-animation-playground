import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated';

type DrawerItem = {
  name: string;
};

interface Props {
  children: React.ReactNode;
  drawerItems: DrawerItem[]
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  main: {
    flex: 1,
    backgroundColor: '#ffffff',
    zIndex: 1,
    borderRadius: 40,
    paddingTop: 60
  },
  drawer: {
    backgroundColor: '#110F35',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    zIndex: 0,
    borderRadius: 40,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    padding: 20
  },
  menuBtnContaienr: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  menuBtn: {
    marginLeft: 25
  },
  menuTitle: {
    marginLeft: 30,
    fontSize: 19,
    color: 'gray',
    textTransform: 'uppercase',
    letterSpacing: 3
  },
  drawerItemBtn: {
    width: 140,
    height: 45,
    borderRadius: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  drawerItemTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "400"
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 140,
    marginTop: 80,
    marginBottom: 40
  },
  logo: {
    color: "white",
    fontSize: 23,
    fontWeight: "700"
  },
  overlay: {
    position: 'absolute',
    backgroundColor: '#c73461',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.2,
    borderRadius: 10,
  },
  breakLine: {
    borderTopWidth: 1,
    borderColor: "#ffffff",
    width: 140,
    opacity: 0.2,
    marginTop: 40,
    marginBottom: 40
  }
});

const easingConfig = Easing.bezier(0.5, 0.01, 0, 1);

const mainConfig = {
  duration: 900,
  easing: easingConfig,
};

const drawerConfig = {
  duration: 700,
  easing: easingConfig,
};

export function Drawer({ children, drawerItems }: Props) {
  const [showDrawer, setShowDrawer] = React.useState(false);
  const [activeItem, setActiveItem] = React.useState(drawerItems[0]);

  const rotateDeg = useSharedValue(0);
  const mainTranslateX = useSharedValue(0);
  const mainTranslateY = useSharedValue(0);
  const drawerTranslateY = useSharedValue(0);
  const drawerButtonY = useSharedValue(0);

  const mainStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: withTiming(`${rotateDeg.value}deg`, mainConfig) },
        { translateX: withTiming(mainTranslateX.value, mainConfig) },
        { translateY: withTiming(mainTranslateY.value, mainConfig) }
      ],
    };
  });

  const drawerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: withTiming(drawerTranslateY.value, drawerConfig) }
      ],
    };
  });

  const drawerBtnStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: withTiming(drawerButtonY.value, drawerConfig) }
      ],
    };
  });

  const handleAnimations = () => {
    rotateDeg.value = showDrawer ? -10 : 0;
    mainTranslateX.value = showDrawer ? 230 : 0;
    mainTranslateY.value = showDrawer ? 100 : 0;
    drawerTranslateY.value = showDrawer ? 52 : 0;
    drawerButtonY.value = showDrawer ? -30 : 0
  };

  React.useEffect(() => {
    handleAnimations();
  }, [showDrawer]);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={[
          styles.main,
          mainStyle,
        ]}
      >
        <Animated.View style={[styles.menuBtnContaienr, drawerBtnStyle]}>
          <TouchableOpacity
            style={[styles.menuBtn]}
            onPress={() => setShowDrawer(!showDrawer)}
          >
            <Feather name="menu" size={24} color="#BFBFBF" />
          </TouchableOpacity>
          <Text style={styles.menuTitle}>{activeItem.name}</Text>
        </Animated.View>
        {children}
      </Animated.View>
      <Animated.View
        style={[
          styles.drawer,
          drawerStyle
        ]}
      >
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>
            Beka
          </Text>
        </View>
        {drawerItems.map((item, key) => {
          const isActive = item.name === activeItem.name;

          return (
            <TouchableOpacity
              style={[styles.drawerItemBtn]}
              onPress={() => {
                setActiveItem(item);
                setShowDrawer(!showDrawer);
              }}
              key={key}
            >
              <Text style={[
                styles.drawerItemTitle,
                { color: isActive ? '#A95557' : '#ffffff' }
                ]}>{item.name}</Text>
              {isActive ? <View style={styles.overlay}/> : null}
            </TouchableOpacity>
          )
        })}
        <View style={styles.breakLine}/>
        <TouchableOpacity
              style={[styles.drawerItemBtn]}
              onPress={() => alert("Sign Out")}
            >
              <Text style={[styles.drawerItemTitle]}>Sign Out</Text>
            </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}
