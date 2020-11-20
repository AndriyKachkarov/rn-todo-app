import React, {useState} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import {Navbar} from "./src/components/Navbar";
import {MainScreen} from "./src/screens/MainScreen";
import {TodoScreen} from "./src/screens/TodoScreen";

export default function App() {
    const [todoId, setTodoId] = useState('2');
    const [todos, setTodos] = useState([
        {id: '1', title: 'Learn React Native'},
        {id: '2', title: 'Create React Native App'},
    ]);

    const addTodo = (title) => {
        setTodos((prevTodos) => [...prevTodos, {
            id: Date.now().toString(),
            title
        }]);
    };

    const removeTodo = id => {
        const todo = todos.find(t => t.id === id);
        Alert.alert(
            'Delete todo',
            `Are you sure you want to delete "${todo.title}"?`,
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        setTodoId(null);
                        setTodos(prev => prev.filter(todo => todo.id !== id));
                    }
                }
            ]
        );
    };

    let content = (<MainScreen
        addTodo={addTodo}
        removeTodo={removeTodo}
        todos={todos}
        openTodo={(id) => {setTodoId(id)}}
    />);

    if (todoId) {
      content = (<TodoScreen onRemove={removeTodo} todo={todos.find(todo => todo.id === todoId)} goBack={() => setTodoId(null)}/>);
    }

    return (
        <View style={styles.background}>
            <Navbar
                title='Todo App'
            />
          {content}
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    list: {}
});
