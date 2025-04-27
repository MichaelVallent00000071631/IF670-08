import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

// Definisikan tipe untuk route params
type RootStackParamList = {
  Forms: { post: { id: number; title: string; body: string; userId: number } };
};

export default function Forms() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'Forms'>>();
  const { post } = route.params;

  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);

  const handleUpdate = () => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, body }),
    })
    .then((res) => res.json())
    .then((data) => {
      console.log('Updated!', data);
      navigation.goBack();
    })
    .catch((err) => console.error(err));
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <TextInput
        value={body}
        onChangeText={setBody}
        placeholder="Body"
        multiline
        style={{ borderWidth: 1, marginBottom: 10, padding: 8, height: 100 }}
      />
      <Button title="Update Post" onPress={handleUpdate} />
    </View>
  );
}
