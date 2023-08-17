import {
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  Text,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faPlus,
  faSortAlphaAsc,
  faSortAlphaDesc,
  faSearch,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import PhoneList from './PhoneList';
import {useState} from 'react';

const SearchContact = ({navigation}: {navigation: any}) => {
  const [q, setQ] = useState('');

  const [searchParam] = useState(['name', 'phone']);

  const [isSearch, setIsSearch] = useState(false);

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
      <View style={{backgroundColor: '#0080ff', padding: 10}}>
        <View id="search" style={styles.container}>
          <TouchableOpacity onPress={onSortChange}>
            <View style={styles.icon}>
              <FontAwesomeIcon icon={sortIcon} />
            </View>
          </TouchableOpacity>
          {isSearch != true && (
            <View style={{alignItems: 'center'}}>
              <Text style={{fontWeight: 'bold', color: 'white'}}>
                PhoneBook App
              </Text>
              <Text>Contact List</Text>
            </View>
          )}
          {isSearch ? (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  alignItems: 'center',
                  backgroundColor: '#fff',
                  width: 200,
                  marginRight: 40,
                }}>
                <TextInput
                  placeholder="search"
                  placeholderTextColor="black"
                  style={styles.input}
                  value={q}
                  onChangeText={value => {
                    setQ(value);
                  }}
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  setIsSearch(false), setQ('');
                }}>
                <View style={styles.icon}>
                  <FontAwesomeIcon icon={faArrowLeft} />
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity onPress={() => setIsSearch(true)}>
              <View style={styles.icon}>
                <FontAwesomeIcon icon={faSearch} />
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View>
        <PhoneList
          q={q}
          searchParam={searchParam}
          sortTypes={sortTypes}
          currenSort={currenSort}
          navigation={navigation}
        />
      </View>
      <View>
        <View style={{position: 'absolute'}}>
          <TouchableOpacity onPress={() => navigation.navigate('Add')}>
            <Image
              source={require('../../public/images/addcontact.jpeg')}
              style={{
                height: 55,
                width: 55,
                borderRadius: 25,
                marginLeft: 300,
                marginTop: -380,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
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
    margin: 10,
    padding: 5,
    borderRadius: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: 'black',
    borderStyle: 'solid',
    alignItems: 'center',
  },
  icon: {
    backgroundColor: 'white',
    borderRadius: 5,
    margin: 4,
    padding: 4,
  },
  input: {
    color: 'black',
  },
});
