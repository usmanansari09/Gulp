import React, { useState } from 'react';
import {
  Animated,
  ScrollView,
  SafeAreaView,
  View,
  Text,
  RefreshControl
} from 'react-native';
import { Colors } from 'Theme';
import SafeArea from './SafeArea';
import {
  HEADER_EXPANDED_HEIGHT,
  HEADER_COLLAPSED_HEIGHT,
  TITLE_COLLAPSED_HEIGHT,
  TITLE_EXPANDED_HEIGHT
} from './constants';
import CustomBackButton from 'Components/CustomBackButton';
import { styles } from './styles';

const CollapsibleToolbar = ({
  headerColor,
  headerColorDark,
  bottomBarColor,
  image,
  backPress,
  children,
  title,
  header,
  headerComponentHeight,
  scrollContainerStyle,
  onRefresh
}) => {
  const customHeaderHeight = headerComponentHeight ?? HEADER_EXPANDED_HEIGHT;
  const [scrollY] = useState(new Animated.Value(0));
  const [open, setOpen] = useState(true);
  const [refreshing, setRefresh] = useState(false);
  const headerHeight = scrollY.interpolate({
    inputRange: [0, customHeaderHeight - HEADER_COLLAPSED_HEIGHT],
    outputRange: [customHeaderHeight, HEADER_COLLAPSED_HEIGHT],
    extrapolate: 'clamp'
  });
  const refreshContent = async () => {
    setRefresh(true);
    await onRefresh();
    setRefresh(false);
  };
  const headerSlide = scrollY.interpolate({
    inputRange: [0, customHeaderHeight - HEADER_COLLAPSED_HEIGHT],
    outputRange: [0, 32],
    extrapolate: 'clamp'
  });

  const headerTitleSize = scrollY.interpolate({
    inputRange: [0, customHeaderHeight - HEADER_COLLAPSED_HEIGHT],
    outputRange: [TITLE_EXPANDED_HEIGHT, TITLE_COLLAPSED_HEIGHT],
    extrapolate: 'clamp'
  });

  const headerTitleOpacity = scrollY.interpolate({
    inputRange: [0, customHeaderHeight - HEADER_COLLAPSED_HEIGHT],
    outputRange: [1, 0],
    extrapolate: 'clamp'
  });

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, customHeaderHeight - HEADER_COLLAPSED_HEIGHT],
    outputRange: [1, 0],
    extrapolate: 'clamp'
  });

  const onLayout = event => {
    const { x, y, height, width } = event.nativeEvent.layout;
    setOpen(height - 35 > HEADER_COLLAPSED_HEIGHT);
  };
  return (
    <SafeArea
      statusBarColor={open ? headerColor : headerColorDark}
      bottomBarColor={bottomBarColor ? bottomBarColor : Colors.white}
      statusBarStyle={'dark-content'}>
      <View style={styles.container}>
        {open && typeof backPress === 'function' && (
          <View style={{ position: 'absolute', top: 20, left: 20, zIndex: 99 }}>
            <CustomBackButton onPress={backPress} />
          </View>
        )}
        <Animated.View
          onLayout={event => onLayout(event)}
          style={[
            styles.header,
            {
              height: headerHeight,
              ...(!open && { zIndex: 2 }),
              backgroundColor: headerColor ? headerColor : Colors.white
            }
          ]}>
          {header ? (
            <>
              <Animated.View
                style={[
                  styles.headerView,
                  { opacity: open ? imageOpacity : 0 }
                ]}>
                {header}
              </Animated.View>
              <Animated.View style={[styles.appBar, { opacity: open ? 0 : 1 }]}>
                {!open && (
                  <View
                    style={{
                      alignSelf: 'center',
                      height: HEADER_COLLAPSED_HEIGHT,
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center'
                    }}>
                    {backPress && <CustomBackButton onPress={backPress} />}
                    <SafeAreaView>
                      <Text style={styles.minHeader}>{title ? title : ''}</Text>
                    </SafeAreaView>
                  </View>
                )}
              </Animated.View>
            </>
          ) : (
            <>
              <Animated.Image
                style={[styles.image, { opacity: imageOpacity }]}
                source={image}
              />
              <Animated.Text
                style={[
                  styles.headerTitle,
                  styles.maxHeader,
                  {
                    color: Colors.black,
                    paddingLeft: headerSlide,
                    fontSize: headerTitleSize,
                    opacity: headerTitleOpacity
                  }
                ]}>
                {title ? title : ''}
              </Animated.Text>
              <View style={styles.appBar}>
                <CustomBackButton onPress={backPress} />
                {!open && (
                  <Text style={styles.minHeader}>{title ? title : ''}</Text>
                )}
              </View>
            </>
          )}
        </Animated.View>
        <ScrollView
          contentContainerStyle={scrollContainerStyle ?? styles.scrollContainer}
          refreshControl={
            onRefresh && (
              <RefreshControl
                refreshing={refreshing}
                onRefresh={refreshContent}
                tintColor={Colors.orange}
                enabled={true}
                size={20}
                progressViewOffset={20}
                colors={[Colors.orange]}
                progressBackgroundColor={Colors.white}
              />
            )
          }
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    y: scrollY
                  }
                }
              }
            ],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}>
          {children}
        </ScrollView>
      </View>
    </SafeArea>
  );
};

export default CollapsibleToolbar;
