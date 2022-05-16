import React from 'react';
import { View, Image, TouchableNativeFeedback } from 'react-native';
import { Content, Container } from 'native-base';
import { AppText } from 'Components/AppText';
import LoadingIndicator from 'Components/LoadingIndicator';
import styles from './styles';
import useGetDeals from 'Hooks/getDeals';
import { Images } from 'Theme';

const BadgeCollection = props => {
  const { deals, loading, navigateToRestaurant, category } = useGetDeals();
  return (
    <Container>
      <Content contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.recentlyEarned}>
            {category ? (
              <AppText style={styles.headerText}>
                Deals for {category.name}
              </AppText>
            ) : (
              <AppText style={styles.headerText}>All Deals</AppText>
            )}
            <View style={styles.flexWrap}>
              {deals.results.map((deal, index) => (
                <View
                  style={[
                    styles.content,
                    (index + 1) % 2 === 0 && { marginLeft: 10 },
                    index > 1 && { marginTop: 20 }
                  ]}
                  key={index}>
                  <TouchableNativeFeedback
                    onPress={() => navigateToRestaurant(deal)}>
                    <View>
                      <Image
                        source={
                          deal.img_url
                            ? {
                                uri: deal.img_url.split('X-Amz-Algorithm=')[0]
                              }
                            : Images.foodItem
                        }
                        style={styles.imageView}
                      />
                      <View style={styles.titleView}>
                        <View style={styles.descView}>
                          <AppText numberOfLines={1} style={styles.textMid}>
                            {deal.restaurant.name}
                          </AppText>
                          <AppText style={[styles.textSmall, styles.sizeText]}>
                            245ft
                          </AppText>
                        </View>
                        <View style={styles.textContainer}>
                          <AppText numberOfLines={1} style={styles.textBig}>
                            {deal.name}
                          </AppText>
                        </View>
                        <View style={styles.textContainer}>
                          <AppText style={styles.textExtra}>
                            ${deal.reduced_price}
                          </AppText>
                        </View>
                        <View style={styles.textContainer}>
                          <AppText numberOfLines={1} style={styles.textSmall}>
                            02:00P.M. - 05:00P.M.
                          </AppText>
                        </View>
                      </View>
                    </View>
                  </TouchableNativeFeedback>
                </View>
              ))}
            </View>
          </View>
          {!deals.results.length && !loading && (
            <View style={styles.empty}>
              <AppText style={styles.textSmall}>No results found</AppText>
            </View>
          )}
          <LoadingIndicator size="small" visible={loading} />
        </View>
      </Content>
    </Container>
  );
};

export default BadgeCollection;
