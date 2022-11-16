import React, {memo, useEffect, useRef, useState} from 'react';
import {
  FlatList,
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {
  ActiveOpacity,
  Colors,
  FontSizes,
  FontWeights,
  HitSlop,
  Margins,
  Paddings,
} from '@/constants';

interface Props {
  labels: string[];
  onTabChanged?: (tabIndex: number) => any;
  currentTab?: number;
  style?: StyleProp<ViewStyle>;
}

const Tabs = ({labels, onTabChanged, currentTab, style}: Props) => {
  const [_currentTab, setCurrentTab] = useState<number>(currentTab || 0);
  const tabWidths = useRef<Record<number, number>>({});
  const listRef = React.createRef<FlatList>();

  const _onTabPressed = (page: number) => {
    onTabChanged?.(page);
    setCurrentTab(page);
  };

  const getItemPosition = (index: number) => {
    let result = 0;

    for (let i = 0; i < index; ++i) {
      result += tabWidths.current?.[i] || 0;
    }

    return result;
  };

  useEffect(() => {
    if (typeof currentTab === 'number') {
      setCurrentTab(currentTab);
      listRef.current?.scrollToItem({
        animated: true,
        item: labels[currentTab],
      });
    }
  }, [currentTab, labels, listRef]);

  const _onLayout = (
    index: number,
    {
      nativeEvent: {
        layout: {width},
      },
    }: LayoutChangeEvent,
  ) => {
    tabWidths.current[index] = width;
  };

  const _renderTab = ({item, index}: {item: string; index: number}) => {
    return (
      <TouchableOpacity
        activeOpacity={ActiveOpacity}
        hitSlop={HitSlop}
        onPress={() => _onTabPressed(index)}
        key={item}
        onLayout={e => _onLayout(index, e)}
        style={[
          styles.tabContainer,
          index === _currentTab ? styles.tabActiveContainer : null,
        ]}>
        <Text style={styles.tabTitle}>{item}</Text>
      </TouchableOpacity>
    );
  };

  const _getItemLayout = (data: any, index: number) => ({
    length: tabWidths.current?.[index],
    offset: getItemPosition(index),
    index,
  });

  return (
    <FlatList
      horizontal
      data={labels}
      ref={listRef}
      getItemLayout={_getItemLayout}
      style={[styles.wrapper, style]}
      contentContainerStyle={styles.container}
      renderItem={_renderTab}
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.white,
  },
  container: {
    flexDirection: 'row',
  },
  tabContainer: {
    paddingVertical: Paddings.semiSmall,
    paddingHorizontal: Paddings.medium,
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: Colors.white,
    marginHorizontal: Margins.smallest,
  },
  tabTitle: {
    color: Colors.text,
    fontSize: FontSizes.normal,
    fontWeight: FontWeights.semiBold,
  },
  tabActiveContainer: {
    borderBottomColor: Colors.primary,
  },
});

export default memo(Tabs);
