import { Fonts } from '@/assets/fonts';
import { IMAGES } from '@/assets/images';
import CustomButton from '@/components/CustomButton';
import CustomImage from '@/components/CustomImage';
import CustomText from '@/components/CustomText';
import { Colors } from '@/constants/colors';
import { metrics } from '@/utils/metrics';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useCallback, useMemo } from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Category = {
  id: string;
  name: string;
  icon: string;
};

type Product = {
  id: string;
  name: string;
  price: string;
  rating: number;
  reviews: number;
  image?: any;
  onSale?: boolean;
  salePrice?: string;
};

type NewsItem = {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  image?: any;
};

const CATEGORIES: Category[] = [
  { id: '1', name: 'Mobiles', icon: 'phone-android' },
  { id: '2', name: 'Electronics', icon: 'radio' },
  { id: '3', name: 'Gadgets', icon: 'mouse' },
  { id: '4', name: 'Bikes', icon: 'two-wheeler' },
  { id: '5', name: 'Notebooks', icon: 'laptop' },
];

const MOCK_PRODUCTS: Product[] = [
  { id: '1', name: 'TMA-2 HD Wireless', price: 'Rp. 1.500.000', rating: 4.6, reviews: 96 },
  { id: '2', name: 'TMA-2 HD Wireless', price: 'Rp. 1.500.000', rating: 4.6, reviews: 96 },
  { id: '3', name: 'TMA-2 HD Wireless', price: 'Rp. 1.500.000', rating: 4.6, reviews: 96 },
];

const MOCK_NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'Exploring Ethical Concepts on Campus',
    description: 'Lorem Ipsum Dolor',
    date: 'January 13, 2026 - Campus Learning',
    category: 'Campus Learning',
  },
  {
    id: '2',
    title: 'Exploring Ethical Dilemmas in Campus Life',
    description: 'The university environment often presents unique moral quandaries that challenge students\' values and beliefs.',
    date: 'January 13, 2026 - Campus Learning',
    category: 'Campus Learning',
  },
  {
    id: '3',
    title: 'The Role of Student Activism In Shaping University Policies',
    description: 'Student movements have historically influenced institutional change',
    date: 'January 13, 2026 - Campus Events',
    category: 'Campus Events',
  },
];

export default function HomeScreen() {
  const handleSearch = useCallback(() => {
    console.log('Search pressed');
  }, []);

  const handleNotification = useCallback(() => {
    console.log('Notification pressed');
  }, []);

  const handleCart = useCallback(() => {
    console.log('Cart pressed');
  }, []);

  const handleCategoryPress = useCallback((category: Category) => {
    console.log('Category pressed:', category.name);
  }, []);

  const handleProductPress = useCallback((product: Product) => {
    console.log('Product pressed:', product.name);
  }, []);

  const handleSeeAll = useCallback((section: string) => {
    console.log('See all pressed:', section);
  }, []);

  const renderCategory = useCallback(
    ({ item }: { item: Category }) => (
      <TouchableOpacity
        style={styles.categoryItem}
        onPress={() => handleCategoryPress(item)}
        activeOpacity={0.7}
      >
        <View style={styles.categoryIcon}>
          <MaterialIcons name={item.icon as any} size={24} color={Colors.primary} />
        </View>
        <CustomText
          label={item.name}
          fontSize={12}
          fontFamily={Fonts.Medium}
          color={Colors.black}
          marginTop={metrics.height(8)}
        />
      </TouchableOpacity>
    ),
    [handleCategoryPress]
  );

  const renderProduct = useCallback(
    ({ item }: { item: Product }) => (
      <TouchableOpacity
        style={styles.productCard}
        onPress={() => handleProductPress(item)}
        activeOpacity={0.7}
      >
        <View style={styles.productImageContainer}>
          {item.onSale && (
            <View style={styles.saleBadge}>
              <CustomText label="SALE" fontSize={10} fontFamily={Fonts.Bold} color={Colors.white} />
            </View>
          )}
        </View>
        <CustomText
          label={item.name}
          fontSize={13}
          fontFamily={Fonts.SemiBold}
          color={Colors.black}
          marginTop={metrics.height(8)}
          numberOfLines={1}
        />
        <CustomText
          label={item.onSale && item.salePrice ? item.salePrice : item.price}
          fontSize={14}
          fontFamily={Fonts.Bold}
          color={Colors.primary}
          marginTop={metrics.height(4)}
        />
        <View style={styles.productRating}>
          <MaterialIcons name="star" size={14} color="#FFB800" />
          <CustomText
            label={`${item.rating} (${item.reviews} Reviews)`}
            fontSize={11}
            fontFamily={Fonts.Regular}
            color={Colors.gray}
            marginLeft={metrics.width(4)}
          />
        </View>
      </TouchableOpacity>
    ),
    [handleProductPress]
  );

  const renderNewsItem = useCallback(
    (item: NewsItem) => (
      <View key={item.id} style={styles.newsCard}>
        <View style={styles.newsContent}>
          <CustomText
            label={item.title}
            fontSize={14}
            fontFamily={Fonts.SemiBold}
            color={Colors.black}
            marginBottom={metrics.height(6)}
            numberOfLines={2}
          />
          <CustomText
            label={item.description}
            fontSize={12}
            fontFamily={Fonts.Regular}
            color={Colors.gray}
            marginBottom={metrics.height(8)}
            numberOfLines={2}
          />
          <CustomText
            label={item.date}
            fontSize={11}
            fontFamily={Fonts.Regular}
            color={Colors.gray}
          />
        </View>
        <View style={styles.newsImagePlaceholder} />
      </View>
    ),
    []
  );

  const sectionHeader = useMemo(
    () => (title: string, onSeeAll?: () => void) => (
      <View style={styles.sectionHeader}>
        <CustomText
          label={title}
          fontSize={18}
          fontFamily={Fonts.Bold}
          color={Colors.black}
        />
        {onSeeAll && (
          <TouchableOpacity onPress={onSeeAll} activeOpacity={0.7}>
            <CustomText
              label="See All"
              fontSize={14}
              fontFamily={Fonts.Medium}
              color={Colors.primary}
            />
          </TouchableOpacity>
        )}
      </View>
    ),
    []
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <MaterialIcons name="link" size={24} color={Colors.primary} />
            <CustomText
              label="CampaLink"
              fontSize={20}
              fontFamily={Fonts.Bold}
              color={Colors.black}
              marginLeft={metrics.width(8)}
            />
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity onPress={handleNotification} activeOpacity={0.7}>
              <MaterialIcons name="notifications-none" size={24} color={Colors.black} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleCart}
              activeOpacity={0.7}
              style={styles.cartButton}
            >
              <MaterialIcons name="shopping-cart" size={24} color={Colors.black} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <TouchableOpacity style={styles.searchBar} onPress={handleSearch} activeOpacity={0.8}>
          <MaterialIcons name="search" size={20} color={Colors.gray} />
          <CustomText
            label="Search Product Name"
            fontSize={14}
            fontFamily={Fonts.Regular}
            color={Colors.gray}
            marginLeft={metrics.width(8)}
          />
        </TouchableOpacity>

        {/* Event Banner */}
        <View style={styles.eventBanner}>
          <View style={styles.eventContent}>
            <CustomText
              label="Qawali Night"
              fontSize={20}
              fontFamily={Fonts.Bold}
              color={Colors.white}
              marginBottom={metrics.height(4)}
            />
            <CustomText
              label="AIR University Islamabad"
              fontSize={12}
              fontFamily={Fonts.Regular}
              color={Colors.white}
              marginBottom={metrics.height(2)}
            />
            <CustomText
              label="November 29, 2026"
              fontSize={12}
              fontFamily={Fonts.Regular}
              color={Colors.white}
            />
          </View>
          <View style={styles.eventImagePlaceholder} />
        </View>

        {/* Categories */}
        {sectionHeader('Categories', () => handleSeeAll('Categories'))}
        <FlatList
          data={CATEGORIES}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />

        {/* Hot Selling */}
        {sectionHeader('Hot Selling', () => handleSeeAll('Hot Selling'))}
        <FlatList
          data={MOCK_PRODUCTS}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.productsList}
        />

        {/* Modular Headphone Banner */}
        <View style={styles.promoBanner}>
          <View style={styles.promoContent}>
            <CustomText
              label="Modular Headphone"
              fontSize={22}
              fontFamily={Fonts.Bold}
              color={Colors.white}
              marginBottom={metrics.height(8)}
            />
            <TouchableOpacity style={styles.shopNowButton} activeOpacity={0.8}>
              <CustomText
                label="Shop now"
                fontSize={14}
                fontFamily={Fonts.Medium}
                color={Colors.white}
                marginRight={metrics.width(4)}
              />
              <MaterialIcons name="arrow-forward" size={16} color={Colors.white} />
            </TouchableOpacity>
          </View>
          <View style={styles.promoImagePlaceholder} />
        </View>

        {/* New Arrivals */}
        {sectionHeader('New Arrivals', () => handleSeeAll('New Arrivals'))}
        <FlatList
          data={MOCK_PRODUCTS}
          renderItem={renderProduct}
          keyExtractor={(item) => `new-${item.id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.productsList}
        />

        {/* Top Rated Product */}
        {sectionHeader('Top Rated Product', () => handleSeeAll('Top Rated'))}
        <FlatList
          data={MOCK_PRODUCTS}
          renderItem={renderProduct}
          keyExtractor={(item) => `rated-${item.id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.productsList}
        />

        {/* Special Offers */}
        {sectionHeader('Special Offers', () => handleSeeAll('Special Offers'))}
        <FlatList
          data={MOCK_PRODUCTS.map((p) => ({ ...p, onSale: true, salePrice: 'Rp. 1.000.000' }))}
          renderItem={renderProduct}
          keyExtractor={(item) => `sale-${item.id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.productsList}
        />

        {/* Latest News */}
        {sectionHeader('Latest News')}
        <View style={styles.newsContainer}>
          {MOCK_NEWS.map(renderNewsItem)}
        </View>
        <CustomButton
          label="See All News"
          onPress={() => handleSeeAll('News')}
          backgroundColor={Colors.white}
          borderColor={Colors.borderLine}
          borderWidth={1}
          borderRadius={8}
          fontSize={14}
          fontFamily={Fonts.Medium}
          color={Colors.black}
          marginTop={metrics.height(20)}
          marginBottom={metrics.height(100)}
        />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} activeOpacity={0.7}>
          <MaterialIcons name="home" size={24} color={Colors.primary} />
          <CustomText label="FEED" fontSize={10} fontFamily={Fonts.Medium} color={Colors.primary} marginTop={4} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} activeOpacity={0.7}>
          <MaterialIcons name="favorite-border" size={24} color={Colors.gray} />
          <CustomText label="WISHLIST" fontSize={10} fontFamily={Fonts.Medium} color={Colors.gray} marginTop={4} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} activeOpacity={0.7}>
          <MaterialIcons name="shopping-bag" size={24} color={Colors.gray} />
          <CustomText label="MARKETPLACE" fontSize={10} fontFamily={Fonts.Medium} color={Colors.gray} marginTop={4} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} activeOpacity={0.7}>
          <MaterialIcons name="person-outline" size={24} color={Colors.gray} />
          <CustomText label="LOGIN" fontSize={10} fontFamily={Fonts.Medium} color={Colors.gray} marginTop={4} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: metrics.height(20),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: metrics.width(20),
    paddingTop: metrics.height(10),
    paddingBottom: metrics.height(16),
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: metrics.width(16),
  },
  cartButton: {
    marginLeft: metrics.width(8),
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: metrics.width(16),
    paddingVertical: metrics.height(12),
    marginHorizontal: metrics.width(20),
    marginBottom: metrics.height(20),
  },
  eventBanner: {
    flexDirection: 'row',
    backgroundColor: '#1A237E',
    borderRadius: 12,
    padding: metrics.width(20),
    marginHorizontal: metrics.width(20),
    marginBottom: metrics.height(30),
    minHeight: metrics.height(120),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventContent: {
    flex: 1,
  },
  eventImagePlaceholder: {
    width: metrics.width(100),
    height: metrics.height(80),
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: metrics.width(20),
    marginBottom: metrics.height(16),
    marginTop: metrics.height(20),
  },
  categoriesList: {
    paddingHorizontal: metrics.width(20),
    gap: metrics.width(16),
  },
  categoryItem: {
    alignItems: 'center',
    width: metrics.width(70),
  },
  categoryIcon: {
    width: metrics.width(56),
    height: metrics.width(56),
    borderRadius: metrics.width(28),
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productsList: {
    paddingHorizontal: metrics.width(20),
    gap: metrics.width(12),
  },
  productCard: {
    width: metrics.width(160),
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: metrics.width(12),
    borderWidth: 1,
    borderColor: Colors.borderLine,
  },
  productImageContainer: {
    width: '100%',
    height: metrics.height(120),
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    marginBottom: metrics.height(8),
    position: 'relative',
  },
  saleBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: Colors.red,
    paddingHorizontal: metrics.width(8),
    paddingVertical: metrics.height(4),
    borderRadius: 4,
  },
  productRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: metrics.height(6),
  },
  promoBanner: {
    flexDirection: 'row',
    backgroundColor: '#1A237E',
    borderRadius: 12,
    padding: metrics.width(20),
    marginHorizontal: metrics.width(20),
    marginTop: metrics.height(20),
    marginBottom: metrics.height(20),
    minHeight: metrics.height(140),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  promoContent: {
    flex: 1,
  },
  shopNowButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  promoImagePlaceholder: {
    width: metrics.width(120),
    height: metrics.height(100),
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8,
  },
  newsContainer: {
    paddingHorizontal: metrics.width(20),
  },
  newsCard: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: metrics.width(16),
    marginBottom: metrics.height(16),
    borderWidth: 1,
    borderColor: Colors.borderLine,
  },
  newsContent: {
    flex: 1,
    marginRight: metrics.width(12),
  },
  newsImagePlaceholder: {
    width: metrics.width(80),
    height: metrics.height(80),
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: metrics.height(12),
    paddingBottom: metrics.height(20),
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLine,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: 'center',
    flex: 1,
  },
});
