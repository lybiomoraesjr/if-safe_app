import * as FileSystem from 'expo-file-system';

export const saveBase64AsImage = async (base64: string, fileName: string) => {
  const fileUri = `${FileSystem.cacheDirectory}${fileName}`;
  await FileSystem.writeAsStringAsync(fileUri, base64, {
    encoding: FileSystem.EncodingType.Base64,
  });
  return fileUri;
};
