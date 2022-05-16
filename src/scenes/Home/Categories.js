import React from 'react';
import { TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Text, View } from 'native-base';

import { useSelector } from 'react-redux';
import styles from './styles';
import { SvgXml } from 'react-native-svg';

import foodnBites from '../../assets/images/foodnBites.svg';
import wine from '../../assets/images/wine.svg';
import cocktail from '../../assets/images/cocktails.svg';
import hardLiqour from '../../assets/images/hard-liqour.svg';
import beer from '../../assets/images/beer.svg';

const getSVG = name => {
  if (name === 'Wine') {
    return <SvgXml width="45" height="45" xml={wine} />;
  } else if (name === 'Food and Bites') {
    return <SvgXml width="45" height="45" xml={foodnBites} />;
  } else if (name === 'Beer') {
    return <SvgXml width="45" height="45" xml={beer} />;
  } else if (name === 'Hard Liquor') {
    return <SvgXml width="45" height="45" xml={hardLiqour} />;
  } else if (name === 'Cocktails') {
    return <SvgXml width="45" height="45" xml={cocktail} />;
  }
};

const Categories = ({ showTitle = true, onPress }) => {
  const { categories } = useSelector(state => state.app.home);
  return (
    <View style={[styles.categoryView, !showTitle && styles.noTitle]}>
      {showTitle && (
        <Text style={[styles.titleText, styles.categoryTitle]}>Categories</Text>
      )}
      <ScrollView
        style={styles.list}
        horizontal={true}
        contentContainerStyle={[
          styles.listContainer,
          styles.categoryView,
          !showTitle && styles.noTitle
        ]}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        {categories?.results &&
          categories.results.map((category, index) => (
            <TouchableOpacity
              key={category.id.toString() + category.name}
              style={[
                styles.categoryItemView,
                index === categories.length - 1 && styles.marginRight
              ]}
              onPress={() => onPress(category)}>
              <View style={styles.categoryItem}>
                {getSVG(category.name)}
                {/*<Image
                  source={
                    category.icon
                      ? { uri: category.icon.split('X-Amz-Algorithm=')[0] }
                      : Images.wine
                  }
                  style={styles.beerImage}
                />*/}
              </View>
              <Text style={styles.categoryText}>{category.name}</Text>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
};

export default Categories;
