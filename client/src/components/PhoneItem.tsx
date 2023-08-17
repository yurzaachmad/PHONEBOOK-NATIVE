import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {
  faFloppyDisk,
  faPenToSquare,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {deleteContact, updateContact} from '../actions/users';
import {
  Image,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';

export default function PhoneItem({
  student,
  navigation,
}: {
  student: any;
  navigation: any;
}) {
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState(student.name);
  const [phone, setPhone] = useState(student.phone);
  const [avatarSource, setAvatar] = useState(
    student.avatar
      ? {uri: `http://192.168.1.25:3001/images/${student.avatar}`}
      : require('../../public/images/bussines-man.png'),
  );

  const [showBox, setShowBox] = useState(true);
  const dispatch: any = useDispatch();

  const showConfirmDelete = () => {
    return Alert.alert(
      'Are you sure?',
      'Are you sure you want to remove this contact?',
      [
        {
          text: 'Yes',
          onPress: () => {
            dispatch(deleteContact(student.id));
            setShowBox(false);
          },
        },
        {
          text: 'No',
        },
      ],
    );
  };

  return (
    <View>
      <View style={styles.item}>
        <View>
          <Image
            source={avatarSource}
            style={{
              borderRadius: 50,
              height: 50,
              width: 50,
              padding: 10,
              margin: 10,
            }}
          />
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('UpdateAvatar', {
                studentId: student.id,
                setAvatar: setAvatar,
              })
            }>
            <Image
              source={require('../../public/images/addicon.png')}
              style={{
                borderRadius: 50,
                height: 20,
                width: 20,
                marginLeft: 50,
                marginTop: -30,
              }}
            />
          </TouchableOpacity>
        </View>
        <View>
          <View>
            {isEdit ? (
              <TextInput
                value={name}
                style={{
                  backgroundColor: '#fff',
                  width: 200,
                  color: 'black',
                  borderWidth: 1,
                }}
                onChangeText={value => setName(value)}
              />
            ) : (
              <Text style={styles.input}>{name}</Text>
            )}
          </View>
          <View>
            {isEdit ? (
              <TextInput
                value={phone}
                style={{
                  backgroundColor: '#fff',
                  width: 200,
                  color: 'black',
                  borderWidth: 1,
                }}
                onChangeText={value => setPhone(value)}
              />
            ) : (
              <Text style={styles.input}>{phone}</Text>
            )}
          </View>
        </View>
        {isEdit ? (
          <TouchableOpacity
            onPress={() => {
              dispatch(updateContact(student.id, name, phone));
              setIsEdit(false);
            }}>
            <View>
              <FontAwesomeIcon
                icon={faFloppyDisk}
                style={{
                  color: 'green',
                  margin: 7,
                  padding: 10,
                  marginTop: 30,
                }}
              />
            </View>
          </TouchableOpacity>
        ) : (
          <View>
            <TouchableOpacity onPress={() => setIsEdit(true)}>
              <View>
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  style={{color: 'black', margin: 7, padding: 10}}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                showConfirmDelete();
              }}>
              <View>
                <FontAwesomeIcon
                  icon={faTrash}
                  style={{color: 'red', margin: 7, padding: 10}}
                />
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    display: 'flex',
    margin: 10,
    padding: 5,
    borderRadius: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  type: {
    color: 'black',
  },
  input: {
    padding: 4,
    margin: 2,
    color: 'black',
  },
});
