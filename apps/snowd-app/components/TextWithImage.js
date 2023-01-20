import { Image, Text } from 'react-native';

export default function TextWithImage({ text, imageSource, textAfterImg }) {
  return (
    <Text>
      {!textAfterImg && text}
      <Image source={imageSource} style={{ height: 32, width: 32 }} />
      {textAfterImg && text}
    </Text>
  );
}
