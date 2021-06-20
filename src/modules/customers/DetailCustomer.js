import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text, Button } from 'react-native-ui-lib';
import { colors } from '../../styles';

const DetailCustomer = ({ route, navigation }) => {
  const { data } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.imageBlock}>
        <Image
          source={require('../../../assets/images/photos.jpeg')}
          style={styles.avatar}
        />
      </View>
      <View style={styles.body}>
        <Text style={styles.label}>Full Name</Text>
        <Text
          style={styles.detail}
        >{`${data.firstname} ${data.lastname}`}</Text>
        <Text style={styles.label}>Email Address</Text>
        <Text style={styles.detail}>{data.email}</Text>
        <Text style={styles.label}>Date of birth</Text>
        <Text style={styles.detail}>{data.date}</Text>
        <Text style={styles.label}>City</Text>
        <Text style={styles.detail}>{data.city}</Text>
        <Text style={styles.label}>Country</Text>
        <Text style={styles.detail}>{data.country}</Text>
      </View>
      <Button
        label={'Edit Customer'}
        backgroundColor={colors.secondary}
        onPress={() => navigation.navigate(`Add`, { edit: true, data: data })}
      />
    </View>
  );
};

export default DetailCustomer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    margin: 10,
  },
  body: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'flex-start',
    margin: 10,
  },
  border: {
    marginBottom: 5,
    borderBottomWidth: 2,
    borderColor: colors.grey,
  },
  imageBlock: {
    backgroundColor: colors.primary,
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  avatar: {
    borderRadius: 75,
    height: 150,
    width: 150,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.blue,
  },
  label: {
    padding: 5,
    fontWeight: 'bold',
    fontSize: 20,
  },
  detail: {
    padding: 5,
    fontWeight: '500',
    fontSize: 15,
  },
});
