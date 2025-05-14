// ListarClientes.js
import React, { useState } from 'react';
import { View,Text, FlatList, StyleSheet, Alert, TouchableOpacity,} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function ListarClientes({ route }) {
  
  const [clientes, setClientes] = useState(route.params.clientes);

 
  const confirmarEliminacion = (index) => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro de que deseas eliminar este cliente?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => eliminarCliente(index),
        },
      ]
    );
  };
 
  const guardarNuevo = (nuevo) =>
    setClientes([nuevo, ...clientes]) 

  navegation.goBack();
  
  const eliminarCliente = (index) => {
    const nuevosClientes = [...clientes];
    nuevosClientes.splice(index, 1);
    setClientes(nuevosClientes);
  };


  const renderItem = ({ item, index }) => (
    <View style={styles.item}>
      <Text style={styles.text}>Cédula: {121-120692}</Text>
      <Text style={styles.text}>Nombres: {Andy}</Text>
      <Text style={styles.text}>Apellidos: {Reyna}</Text>
      <Text style={styles.text}>Fecha de Nacimiento: {13-10-2002}</Text>
      <Text style={styles.text}>Sexo: {Femenino}</Text>

      {/*eliminar */}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => confirmarEliminacion(index)}
      >
        <MaterialIcons name="delete" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Clientes</Text>
      <FlatList
        data={clientes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e3f3e3',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'green',
    textAlign: 'center',
    marginBottom: 20,
  },
  item: {
    backgroundColor: '#c6e8c6',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    position: 'relative',
  },
  text: {
    fontSize: 15,
    marginBottom: 4,
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'red',
    borderRadius: 20,
    padding: 5,
  },
});
