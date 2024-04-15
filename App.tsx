import React, {useState} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import Todo from './components/todo';

import {Colors} from 'react-native/Libraries/NewAppScreen';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const [todo, setTodo] = useState('');
  const [todoList, setTodoList] = useState([]);
  function handleClick() {
    if (todo !== '') {
      addTodo(todo);
      setTodo(''); // Reset input field after adding todo
    }
  }

  function addTodo(newTodo: string) {
    setTodoList(currentTodos => [...currentTodos, { id: Date.now(), text: newTodo }]);
  }

  function deleteTodo(id: number){
    setTodoList(currentTodos => currentTodos.filter(todo => todo.id !== id));
  }

  function editTodo(id: number, newText: string){
    setTodoList(currentTodos =>
      currentTodos.map(todo => {
        if (todo.id === id) {
          return {...todo, text: newText};
        }
        return todo;
      }),
    );
  }

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <ScrollView>
      <Text style={styles.sectionTitle}> Add Todos </Text>
      <TextInput
        onChangeText={setTodo}
        value={todo}
        placeholder="please enter your to-dos"
        style={styles.sectionContainer}
      />
      <Button onPress={handleClick} title="Add To Do" />
      {todoList.map((todoItem, index) => (
          <Todo onDelete={deleteTodo} onEdit={editTodo} todoItem={todoItem} id={todoItem.id}/>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
