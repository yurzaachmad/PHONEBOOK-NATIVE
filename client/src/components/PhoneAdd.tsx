import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {addContact} from '../actions/users';
import {useState} from 'react';

export default function PhoneAdd({navigation}: {navigation: any}) {
  const dispatch: any = useDispatch();
  const [user, setUser] = useState({name: '', phone: ''});

  const submit = () => {
    dispatch(addContact(user.name, user.phone));
    setUser({name: '', phone: ''});
    navigation.navigate('Home');
    // setPlus(false);
  };
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="name"
        placeholderTextColor="black"
        onChangeText={value => setUser({...user, name: value})}
        defaultValue={user.name}
      />
      <TextInput
        style={styles.input}
        placeholder="phone"
        placeholderTextColor="black"
        onChangeText={value => setUser({...user, phone: value})}
        defaultValue={user.phone}
      />
      <TouchableOpacity onPress={submit} style={styles.button}>
        <Text style={{textAlign: 'center', color: '#fff'}}>Tambah</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fff',
    padding: 12,
    margin: 8,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: 'blue',
    color: 'black',
  },
  button: {
    backgroundColor: '#04AA6D',
    color: 'white',
    padding: 14,
    margin: 8,
  },
});
