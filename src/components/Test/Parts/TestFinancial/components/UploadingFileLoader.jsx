import { Loader, Text, View } from '@aws-amplify/ui-react';
import React from 'react';

const UploadingFileLoader = () => (
  <View>
    <Text>Uploading data</Text>
    <Loader variation="linear" />
  </View>
);

export default UploadingFileLoader;
