import {View, TouchableOpacity, TextInput, StyleSheet} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faPlus,
  faSortAlphaAsc,
  faSortAlphaDesc,
} from '@fortawesome/free-solid-svg-icons';
import PhoneList from './PhoneList';
import {useState} from 'react';

const SearchContact = ({navigation}: {navigation: any}) => {
  const [q, setQ] = useState('');

  const [searchParam] = useState(['name', 'phone']);

  //this is state to sort asc and desc
  const sortTypes = {
    up: {
      class: 'faSortAlphaAsc',
      fn: (a?: any | undefined, b?: any | undefined) =>
        a.name.localeCompare(b.name),
    },
    down: {
      class: 'faSortAlphaDesc',
      fn: (a?: any | undefined, b?: any | undefined) =>
        b.name.localeCompare(a.name),
    },
  };

  const [currenSort, setCurrentSort] = useState('up');

  const onSortChange = () => {
    let nexSort: any;

    if (currenSort === 'down') nexSort = 'up';
    else if (currenSort === 'up') nexSort = 'down';

    setCurrentSort(nexSort);
  };
  const sortIcon = currenSort === 'up' ? faSortAlphaAsc : faSortAlphaDesc;

  return (
    <View>
      <View id="search" style={styles.container}>
        <TouchableOpacity onPress={onSortChange}>
          <View id="icon" style={styles.icon}>
            <FontAwesomeIcon icon={sortIcon} />
          </View>
        </TouchableOpacity>
        <TextInput
          placeholder="search"
          placeholderTextColor="black"
          style={styles.input}
          value={q}
          onChangeText={value => {
            setQ(value);
          }}
        />
        <TouchableOpacity onPress={() => navigation.navigate('Add')}>
          <View id="icon" style={styles.icon}>
            <FontAwesomeIcon icon={faPlus} />
          </View>
        </TouchableOpacity>
      </View>
      <PhoneList
        q={q}
        searchParam={searchParam}
        sortTypes={sortTypes}
        currenSort={currenSort}
        navigation={navigation}
      />
    </View>
  );
};

export default function PhoneBox({navigation}: {navigation: any}) {
  return (
    <View>
      <SearchContact navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#fff',
    margin: 10,
    padding: 5,
    borderRadius: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: 'black',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    alignItems: 'center',
  },
  icon: {
    backgroundColor: 'brown',
    borderRadius: 5,
    margin: 4,
    padding: 4,
  },
  input: {
    color: 'black',
  },
});
