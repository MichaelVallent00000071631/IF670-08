import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { RootStackParamList } from './types'; // import tipe yang kita buat

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <ScrollView>
      {posts.map((post) => (
        <TouchableOpacity 
          key={post.id} 
          onPress={() => navigation.navigate('Forms', { post })}
          style={{
            margin: 10, 
            padding: 10, 
            borderWidth: 1, 
            borderRadius: 10
          }}
        >
          <Text style={{ fontWeight: 'bold' }}>{post.title}</Text>
          <Text numberOfLines={2}>{post.body}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
