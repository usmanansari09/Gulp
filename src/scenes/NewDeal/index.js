import React from 'react';
import { View, Image, TouchableNativeFeedback, FlatList } from 'react-native';

import { AppText } from 'Components/AppText';
import styles from './styles';
import { Icon, Button, Container, Content } from 'native-base';

import TextField from 'Components/TextField';

import useNewDealHook from 'Hooks/useNewDealHook';
import Categories from 'Scenes/Home/Categories';
import MenuItem from 'Components/MenuItem';
import AddTimeline from 'Components/TimelinePicker';
import LoadingIndicator from 'Components/LoadingIndicator';

const NewDeal = props => {
  const {
    toggleCategoryVisibility,
    categoryVisible,
    dealImage,
    selectRecentDeal,
    dealName,
    setDealName,
    price,
    setPrice,
    specialOffer,
    setSpecialOffer,
    dealDate,
    setDealDate,
    dealCategory,
    setDealCategory,
    reducedPrice,
    setReducedPrice,
    selectImage,
    showTimelinePicker,
    setShowTimelinePicker,
    loading,
    categories,
    createDeal,
    dealData
  } = useNewDealHook();

  return (
    <Container style={styles.background}>
      <Content style={styles.container}>
        <View style={[styles.recentDealsLabel, styles.marginHorizontal]}>
          <AppText style={styles.recentDealsText}>Recent</AppText>
        </View>
        <FlatList
          horizontal={true}
          contentContainerStyle={styles.horizontalScrollView}
          showsHorizontalScrollIndicator={false}
          data={dealData}
          renderItem={({ item }) => (
            <MenuItem
              data={item}
              horizontalLayout={false}
              onPress={selectRecentDeal}
            />
          )}
          keyExtractor={(item, index) => item.toString() + index.toString()}
        />

        <View
          style={[
            styles.flexRowContainer,
            styles.paddingBottom,
            styles.marginHorizontal
          ]}>
          <TextField
            label="Name:"
            value={dealName}
            onChange={setDealName}
            labelStyle={styles.textLabel}
            style={styles.underlinedInput}
          />
        </View>
        <View
          style={[
            styles.flexRowContainer,
            styles.paddingBottom,
            styles.marginHorizontal
          ]}>
          <TextField
            label="Price:"
            value={price}
            onChange={setPrice}
            keyboardType="email-address"
            style={styles.underlinedInput}
            labelStyle={styles.textLabel}
            keyboardType='numeric'
          />
        </View>
        <View
          style={[
            styles.flexSpaceBetween,
            styles.paddingBottom,
            styles.marginHorizontal
          ]}>
          <TextField
            label="Reduced Price:"
            value={reducedPrice}
            onChange={setReducedPrice}
            style={styles.underlinedInput}
            labelStyle={styles.textLabel}
            keyboardType='numeric'
          />
        </View>
        <View
          style={[
            styles.flexSpaceBetween,
            !categoryVisible && styles.paddingBottom,
            styles.marginHorizontal
          ]}>
          <View style={[styles.labelContainer, styles.column80]}>
            <View style={[styles.paddingBottom, styles.dealDateContainer]}>
              <AppText style={styles.textLabel}>Category:</AppText>
              {dealCategory && (
                <AppText style={[styles.textLabel, styles.dealDate]}>
                  {dealCategory.name}
                </AppText>
              )}
            </View>
          </View>
          <TouchableNativeFeedback onPress={toggleCategoryVisibility}>
            <View style={{ padding: 10 }}>
              <Icon
                name={`${categoryVisible ? 'caretup' : 'caretdown'}`}
                type="AntDesign"
                style={styles.disclosureIcon}
              />
            </View>
          </TouchableNativeFeedback>
        </View>
        {categoryVisible && (
          <View style={[styles.paddingBottom, styles.marginHorizontal]}>
            <Categories
              data={categories}
              showTitle={false}
              onPress={setDealCategory}
            />
          </View>
        )}
        <View
          style={[
            styles.flexSpaceBetween,
            styles.paddingBottom,
            styles.marginHorizontal
          ]}>
          <View style={[styles.labelContainer, styles.column80]}>
            <View style={[styles.paddingBottom, styles.dealDateContainer]}>
              <AppText style={styles.textLabel}>Date:</AppText>
              {dealDate.weekday && dealDate.time_from && dealDate.time_to && (
                <AppText style={[styles.textLabel, styles.dealDate]}>
                  {dealDate.weekday}, {dealDate.time_from} - {dealDate.time_to}
                </AppText>
              )}
            </View>
          </View>
          <TouchableNativeFeedback
            onPress={() => setShowTimelinePicker(!showTimelinePicker)}>
            <View style={{ padding: 10 }}>
              <Icon
                name="plus"
                type="AntDesign"
                style={styles.disclosureIcon}
              />
            </View>
          </TouchableNativeFeedback>
        </View>
        <View
          style={[
            styles.flexSpaceBetween,
            !dealImage && styles.paddingBottom,
            styles.marginHorizontal
          ]}>
          <View style={[styles.labelContainer, styles.column80]}>
            <View style={styles.paddingBottom}>
              <AppText style={styles.textLabel}>Add Image (optional):</AppText>
            </View>
          </View>
          <TouchableNativeFeedback onPress={selectImage}>
            <View style={{ padding: 10 }}>
              <Icon
                name="plus"
                type="AntDesign"
                style={styles.disclosureIcon}
              />
            </View>
          </TouchableNativeFeedback>
        </View>
        {dealImage && (
          <View style={[styles.paddingBottom, styles.marginHorizontal]}>
            <Image
              style={styles.menuItemImage}
              source={{ uri: dealImage.uri }}
            />
          </View>
        )}
        <View
          style={[
            styles.flexSpaceBetween,
            styles.paddingBottom,
            styles.marginHorizontal
          ]}>
          <TextField
            label="Special offer (optonal):"
            value={specialOffer}
            onChange={setSpecialOffer}
            style={styles.underlinedInput}
            labelStyle={styles.textLabel}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <Button full rounded style={styles.button} onPress={createDeal}>
            <AppText style={styles.buttonText}>Add Deal</AppText>
          </Button>
        </View>
        <AddTimeline
          isVisible={showTimelinePicker}
          buttonLabel="Confirm"
          onSubmit={date => {
            setShowTimelinePicker(!showTimelinePicker);
            setDealDate(date);
          }}
          onDismiss={() => setShowTimelinePicker(!showTimelinePicker)}
        />
        <LoadingIndicator size="small" visible={loading} />
      </Content>
    </Container>
  );
};
export default NewDeal;
