import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';

function Todo({ todoItem, onDelete, onEdit }) {
  // Local state for managing edit mode and input text
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todoItem.text);

  const handleEdit = () => {
    if (isEditing) {
      onEdit(todoItem.id, editText);  // Call the passed `onEdit` function to update the main list
      setIsEditing(false);  // Exit edit mode
    } else {
      setIsEditing(true);  // Enter edit mode
      setEditText(todoItem.text);  // Initialize the text input with current todo text
    }
  };

  return (
    <View style={styles.todoContainer}>
      {isEditing ? (
        <TextInput
          style={styles.input}
          onChangeText={setEditText}
          value={editText}
          autoFocus={true}
          onSubmitEditing={handleEdit}  // Handle edit on submit (keyboard "Done" press)
        />
      ) : (
        <Text style={styles.todoText}>{todoItem.text}</Text>
      )}
      <Button onPress={() => onDelete(todoItem.id)} title="Delete" />
      <Button onPress={handleEdit} title={isEditing ? "Save" : "Edit"} />
    </View>
  );
}

const styles = StyleSheet.create({
  todoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
  },
  todoText: {
    fontSize: 16,
  },
  input: {
    flex: 1,  // Take up as much space as possible
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
});

export default Todo;