import React from 'react';
import { StyleSheet, Image, View, TextInput, ScrollView } from 'react-native';
import { Button, Text } from 'react-native-ui-lib';
import { colors } from '../../styles';

const CreateCustomer = ({ route }) => {
  const { edit, data} = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={{ fontWeight: '300', fontSize: 40 }}>
        {edit ? 'Edit customer' : 'Create a new customer'}
      </Text>
      <View style={{ flex: 1, padding: 10, marginTop: 10 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            height: 70,
          }}
        >
          <Image
            source={require('../../../assets/images/photos.jpeg')}
            style={{ height: 70, width: 70, borderRadius: 30 }}
          />
          <Button
            label={'Choose Profile Photo'}
            backgroundColor={colors.blue}
          />
        </View>
        <TextInput placeholder={'First Name'} style={styles.input} value={data?.firstname} />
        <TextInput placeholder={'Last Name'} style={styles.input} value={data?.lastname} />
        <TextInput placeholder={'Email Address'} style={styles.input} value={data?.email}/>
        <TextInput placeholder={'City'} style={styles.input}  value={data?.city}/>
        <TextInput placeholder={'Country'} style={styles.input} value={data?.country}/>
        <Button label={'Save'} />
      </View>
    </ScrollView>
  );
};

export default CreateCustomer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
  },
  input: {
    marginVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey,
  },
});
