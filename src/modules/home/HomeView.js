import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

import { fonts, colors } from '../../styles';
import { Text } from '../../components/StyledText';

import {
  S3Client,
  CreateBucketCommand,
  DeleteBucketCommand,
  ListBucketsCommand,
} from '@aws-sdk/client-s3';
import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity';
import { Button, TextInput } from 'react-native-paper';

export default function HomeScreen({ isExtended, setIsExtended }) {
  // const rnsUrl = 'https://reactnativestarter.com';
  // const handleClick = () => {
  //   Linking.canOpenURL(rnsUrl).then(supported => {
  //     if (supported) {
  //       Linking.openURL(rnsUrl);
  //     } else {
  //       console.log(`Don't know how to open URI: ${rnsUrl}`);
  //     }
  //   });
  // };
  const [message, setMessage] = useState('');
  const [bucket, setBucket] = useState('');
  const [buckets, setBuckets] = useState([]);

  const region = 'us-east-1';

  const client = new S3Client({
    region,
    credentials: fromCognitoIdentityPool({
      client: new CognitoIdentityClient({ region }),
      identityPoolId: '',
    }),
  });

  useEffect(() => {
    const listBuckets = async () => {
      try {
        const data = await client.send(new ListBucketsCommand({}));
        console.log('Success', data.Buckets);
        return setBuckets(data.Buckets);
      } catch (err) {
        console.log('Error', err);
      }
    };
    return () => {
      listBuckets;
    };
  }, []);

  const createBucket = async () => {
    setMessage('');
    try {
      await client.send(new CreateBucketCommand({ Bucket: bucket }));
      setMessage(`Bucket "${bucket}" created.`);
    } catch (e) {
      setMessage('Bucket not implemented');
    }
  };

  // console.log('client', client.defaultUserAgentProvider)
  console.log('buckets', buckets);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/background.png')}
        style={styles.bgImage}
        resizeMode="cover"
      >
        <View style={styles.section}>
          <Text size={20} white>
            Home
          </Text>
          <Text size={30} bold white style={styles.title}>
            Customer Management
          </Text>
        </View>
<View><Text style={{ color: 'white'}}>Total Bucket List: {buckets.length}</Text></View>
        <View style={styles.section}>
          <Text>{message}</Text>
          <TextInput
            style={{ width: 200 }}
            label={'bucket name'}
            value={bucket}
            onChangeText={text => setBucket(text)}
          />
          <Button onPress={() => createBucket()}>Create Bucket</Button>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  bgImage: {
    flex: 1,
    // marginHorizontal: -20,
  },
  section: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionLarge: {
    flex: 2,
    justifyContent: 'space-around',
  },
  sectionHeader: {
    marginBottom: 8,
  },
  priceContainer: {
    alignItems: 'center',
  },
  description: {
    padding: 15,
    lineHeight: 25,
  },
  titleDescription: {
    color: '#19e7f7',
    textAlign: 'center',
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
  },
  title: {
    marginTop: 30,
  },
  price: {
    marginBottom: 5,
  },
  priceLink: {
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
  },
});
