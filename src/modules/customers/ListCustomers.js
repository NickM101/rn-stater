import React from 'react';
import { StyleSheet, View, FlatList, Image, Pressable } from 'react-native';
import { ListItem, Text, TextField, Button } from 'react-native-ui-lib';
import { colors } from '../../styles';

const contacts = [
  {
    random: 45,
    date: '1983-10-03',
    firstname: 'Nick',
    lastname: 'Munene',
    city: 'Nairobi',
    country: 'Kenya',
    countryCode: 'Ke',
    email: 'nickmunene101@gmail.com',
  },
  {
    random: 2,
    date: '1980-04-09',
    firstname: 'Lenna',
    lastname: 'Diann',
    city: 'Alor Star',
    country: 'Tonga',
    countryCode: 'PE',
    email: 'Lenna.Diann@gmail.com',
  },
  {
    random: 20,
    date: '1991-01-10',
    firstname: 'Aeriela',
    lastname: 'Kare',
    city: 'Medina',
    country: 'Montserrat',
    countryCode: 'PE',
    email: 'Aeriela.Kare@gmail.com',
  },
  {
    random: 52,
    date: '1996-07-10',
    firstname: 'Latisha',
    lastname: 'Middleton',
    city: 'Chiang Mai',
    country: 'Zambia',
    countryCode: 'PS',
    email: 'Latisha.Middleton@gmail.com',
  },
  {
    random: 40,
    date: '1985-09-23',
    firstname: 'Heddie',
    lastname: 'Bethany',
    city: 'Brazzaville',
    country: 'Djibouti',
    countryCode: 'KW',
    email: 'Heddie.Bethany@gmail.com',
  },
];

const ListCustomers = ({ navigation }) => {
  const [search, setSearch] = React.useState('');
  const [customer, setCustomer] = React.useState(contacts);

  const renderCustomer = (item, id) => {
    return (
      <View style={{ flex: 1, padding: 5, flexDirection: 'row', marginVertical: 10}}>
        <Pressable onPress={() => navigation.navigate('Details', { data: item })}  style={styles.left}>
          <Image 
            source={require('../../../assets/images/photos.jpeg')}
            style={styles.avatar}/>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Details', { data: item })} style={styles.middle}>
          <Text>{`${item.firstname} ${item.lastname}`}</Text>
          <Text> {item.date}</Text>
        </Pressable>
        <Pressable onPress={() => console.log(`deleting id:`, id)} style={styles.right}>
        <Image 
            source={require('../../../assets/images/delete.png')}
            style={styles.delete}/>
        </Pressable>
      </View>
    )
  }

  const _searchList = word => {
    let list = contacts.filter(
      contact =>
        contact.firstname.toLowerCase().includes(word.toLowerCase()) ||
        contact.lastname.toLowerCase().includes(word.toLowerCase()),
    );
    return setCustomer(list), setSearch(word);
  };

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={item => item.random.toString()}
        data={customer}
        renderItem={({ item, index }) => renderCustomer(item, index)}
        ItemSeparatorComponent={() => <View style={{ borderBottomColor: colors.black, borderBottomWidth: 1 }}/>}
        ListHeaderComponent={() => (
          <View style={{ backgroundColor: '#ffffff', margin: 10 }}>
            <TextField
              text60
              placeholder={'Try Nick'}
              hideUnderline={true}
              containerStyle={{
                borderWidth: 1,
                borderColor: colors.darkGray,
                borderRadius: 5,
                alignContent: 'center',
                paddingLeft: 20,
              }}
              value={search}
              onChangeText={_searchList}
            />
            <Button 
                label={'Add Customer'}
                borderRadius={3}
                backgroundColor={colors.primary}
                onPress={() => navigation.navigate("Add", { edit: false})}
                style={{ marginVertical: 10 }}
            />
          </View>
        )}
      />
    </View>
  );
};

export default ListCustomers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  border: {
    borderBottomWidth: 2,
    borderColor: colors.grey,
  },
  avatar: {
    borderRadius: 20,
    height: 60,
    width: 60,
    marginHorizontal: 10,
  },
  delete: {
      height: 40,
      width: 40,
      // alignContent: 'center'
      alignSelf: 'center',
      // marginHorizontal: 20
  },
  left: {
    flex: 0.4,
    justifyContent: 'flex-start',
    alignContent: `center`,
  },
  middle: {
    flex: 1,
    flexDirection: `column`,
    justifyContent: `center`,
  },
  right: {
    flex: 0.4,
    justifyContent: `flex-end`,
    alignSelf: `flex-end`
  }
});
