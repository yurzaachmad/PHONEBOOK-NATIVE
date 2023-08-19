import {useDispatch, useSelector} from 'react-redux';
import React, {useState, useEffect} from 'react';
import {loadStudent} from '../actions/users';
import PhoneItem from './PhoneItem';
import {View, StyleSheet, ScrollView, Image} from 'react-native';

const ITEMS_PER_PAGE = 6; // Number of items to display per page

export default function PhoneList({
  q,
  searchParam,
  sortTypes,
  currenSort,
  navigation,
}: {
  q: any;
  searchParam: any;
  sortTypes: any;
  currenSort: any;
  navigation: any;
}) {
  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(loadStudent());
  }, [dispatch]);

  const contact = useSelector((state: any) => state.users);

  //this state is to set a page data
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);

  // this function is to set a search data
  const search = (contact: any) => {
    return contact.filter((item: any) => {
      return searchParam.some((newItem: any) => {
        return (
          item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
        );
      });
    });
  };

  useEffect(() => {
    // Update the currentItems whenever listPhone, q, or currenSort changes
    const filteredItems = search([...contact].sort(sortTypes[currenSort].fn));
    setCurrentItems(filteredItems.slice(0, currentPage * ITEMS_PER_PAGE));
  }, [contact, currenSort, currentPage, sortTypes]);

  // Function to handle the end reached event and trigger pagination
  const handleEndReached = () => {
    // User has reached the end, load more data
    setCurrentPage(prevPage => prevPage + 1);
  };

  return (
    <View>
      <View>
        <View style={styles.container}>
          <ScrollView onScroll={handleEndReached}>
            {currentItems.map((student: any, index) => (
              <PhoneItem
                key={student.id}
                student={student}
                navigation={navigation}
              />
            ))}
            <View style={{height: 300}} />
          </ScrollView>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    paddingTop: 22,
  },
});
