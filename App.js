// App.js
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { getPosts, updatePost } from './services/axios'; // kita ubah ke posts

function PostsScreen({ navigation }) {
  const [posts, setPosts] = useState([]);

  const getAllPosts = () => {
    getPosts().then((res) => {
      if (res.status === 200) {
        setPosts(res.data);
      }
    });
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <ScrollView style={{ flex: 1 }}>
      {posts.map((post) => (
        <TouchableOpacity
          key={post.id}
          onPress={() => navigation.navigate('Forms', { post })}
          style={styles.card}
        >
          <Text style={styles.title}>{post.title}</Text>
          <Text numberOfLines={2} style={styles.body}>{post.body}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

function FormsScreen({ route, navigation }) {
  const { post } = route.params;
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);

  const handleUpdatePost = () => {
    updatePost(post.id, { title, body }).then((res) => {
      if (res.status === 200) {
        console.log('Post updated', res.data);
        navigation.goBack();
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Edit Post</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
        style={styles.input}
      />
      <TextInput
        value={body}
        onChangeText={setBody}
        placeholder="Body"
        multiline
        style={[styles.input, { height: 100 }]}
      />
      <TouchableOpacity onPress={handleUpdatePost} style={styles.button}>
        <Text style={{ color: '#fff' }}>Update Post</Text>
      </TouchableOpacity>
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Posts">
        <Stack.Screen name="Posts" component={PostsScreen} />
        <Stack.Screen name="Forms" component={FormsScreen} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

import { TextInput } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  card: {
    margin: 10,
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ccc',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  body: {
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 12,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#007BFF',
    alignItems: 'center',
    padding: 12,
    borderRadius: 5,
  },
});

// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
// import { getUsers } from './services/axios';

// export default function App() {
//   const getAllUsers = () => {
//     getUsers().then((res) => {
//       if (res.status === 200) {
//         console.log(res.data);
//       }
//     });
//   };

//   useEffect(() => {
//     getAllUsers();
//   });
  
//   const data = {
//     title: "Title",
//     body: "Body",
//     userId: 1,
//   };

//   const handlePostData = () => {
//     postData(data).then((res) => {
//       console.log(res);
//     });
//   };  

//   return (
//     <View style={styles.container}>
//       <Text>Atanasius Raditya Henrkristito - 00000044898</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
