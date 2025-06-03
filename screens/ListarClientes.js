import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  collection,
  doc,
  getDocs,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../BasedeDatos/Firebase';

export default function ListarClientes({ navigation }) {
  const [clientes, setClientes] = useState([]);
  const [busquedaTexto, setBusquedaTexto] = useState('');

  const cargarClientes = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'clientes'));
      const lista = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setClientes(lista);
    } catch (error) {
      console.error('Error al cargar clientes:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', cargarClientes);
    return unsubscribe;
  }, [navigation]);

  const eliminarCliente = (id) => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Está seguro de que desea eliminar este cliente?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          onPress: async () => {
            try {
              await deleteDoc(doc(db, 'clientes', id));
              cargarClientes();
            } catch (error) {
              console.error('Error al eliminar cliente:', error);
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  const texto = busquedaTexto.toLowerCase();
  const clientesFiltrados = clientes.filter((item) =>
    item.nuevacedula?.toLowerCase().includes(texto) ||
    item.nuevosnombres?.toLowerCase().includes(texto) ||
    item.nuevosapellidos?.toLowerCase().includes(texto) ||
    item.nuevafechanac?.toLowerCase().includes(texto) ||
    item.nuevosexo?.toLowerCase().includes(texto)
  );

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={{ flex: 1 }}>
        <Text style={styles.text}><Text style={styles.label}>Cédula:</Text> {item.nuevacedula}</Text>
        <Text style={styles.text}><Text style={styles.label}>Nombres:</Text> {item.nuevosnombres}</Text>
        <Text style={styles.text}><Text style={styles.label}>Apellidos:</Text> {item.nuevosapellidos}</Text>
        <Text style={styles.text}><Text style={styles.label}>Fecha de nacimiento:</Text> {item.nuevafechanac}</Text>
        <Text style={styles.text}><Text style={styles.label}>Sexo:</Text> {item.nuevosexo}</Text>
      </View>
      <View style={{ justifyContent: 'space-between' }}>
        <TouchableOpacity onPress={() => eliminarCliente(item.id)}>
          <MaterialCommunityIcons name="trash-can-outline" size={32} color="red" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('RegistrarCliente', { cliente: item })}>
          <MaterialCommunityIcons name="account-edit-outline" size={32} color="blue" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Lista de Clientes</Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegistrarCliente')}>
          <MaterialCommunityIcons name="account-plus-outline" size={30} color="green" />
        </TouchableOpacity>
      </View>

      {/* 🔍 Campo de búsqueda fijo */}
      <View style={styles.buscador}>
        <MaterialCommunityIcons name="magnify" size={24} color="gray" />
        <TextInput
          placeholder="Buscar cliente..."
          value={busquedaTexto}
          onChangeText={setBusquedaTexto}
          style={styles.inputBuscar}
        />
      </View>

      <FlatList
        data={clientesFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdeaf2',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'green',
  },
  buscador: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  inputBuscar: {
    flex: 1,
    fontSize: 16,
    height: 40,
    color: '#333',
    marginLeft: 5,
  },
  item: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 15,
    marginBottom: 4,
  },
  label: {
    fontWeight: 'bold',
  },
});