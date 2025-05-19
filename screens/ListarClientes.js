import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity, } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

export default function ListarClientes({ navigation }) {
  const [clientes, setClientes] = useState([
    {
      nuevacedula: '001-150504-1000K',
      nuevosnombres: 'Ivania Socorro',
      nuevosapellidos: 'Hurtado Aragon',
      nuevafechanac: '1884-05-22',
      nuevosexo: 'Femenino',
    },
    {
      nuevacedula: '002-131002-1000S',
      nuevosnombres: 'Stefano Liam',
      nuevosapellidos: 'Reyes Casco',
      nuevafechanac: '2000-02-10',
      nuevosexo: 'Masculino',
    },
    {
      nuevacedula: '003-040803-1000J',
      nuevosnombres: 'Leyla Sofia',
      nuevosapellidos: 'Lopez Aragon',
      nuevafechanac: '2004-03-25',
      nuevosexo: 'Femenino',
    },
    {
      nuevacedula: '004-021204-1000M',
      nuevosnombres: 'Ian Antonio',
      nuevosapellidos: 'Lopez Alvarez',
      nuevafechanac: '2002-07-05',
      nuevosexo: 'Masculino',
    },
  ]);

  const guardarNuevo = (nuevoCliente) => {
    setClientes([
      ...clientes, nuevoCliente
    ]);
  };

  const eliminarCliente = (index) => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Está seguro de que desea eliminar este cliente?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          onPress: () => {
            const nuevaLista = [...clientes];
            nuevaLista.splice(index, 1);
            setClientes(nuevaLista);
          },
          style: 'destructive',
        },
      ]
    );
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.item}>
      <View style={{ flex: 1 }}>
        <Text style={styles.text}>
          <Text style={styles.label}>Cédula:</Text> {item.nuevacedula}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Nombres:</Text> {item.nuevosnombres}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Apellidos:</Text> {item.nuevosapellidos}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Fecha de nacimiento:</Text> {item.nuevafechanac}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Sexo:</Text> {item.nuevosexo}
        </Text>
      </View>
      <TouchableOpacity onPress={() => eliminarCliente(index)}>
        <MaterialCommunityIcons name="trash-can-outline" size={36} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Lista de Clientes</Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegistrarCliente', { guardarNuevo })}>
          <MaterialCommunityIcons name="account-plus-outline" size={30} color="green" />
        </TouchableOpacity>
      </View>
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
    backgroundColor: '#c6d0c7', 
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0077b6', 
  },
  item: {
    backgroundColor: '#bde0fe', 
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  text: {
    fontSize: 15,
    marginBottom: 4,
    color: '#333',
  },
  label: {
    fontWeight: 'bold',
    color: '#516091', 
  },
});