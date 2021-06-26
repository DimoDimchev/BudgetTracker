import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 25,
      fontWeight: 'bold',
      marginHorizontal: 20,
      marginTop: 80,
      paddingBottom: 20,
    },
    paragraph: {
      paddingBottom: 20,
      marginHorizontal: 20,
      fontSize: 16,
    },
    subtitle: {
      marginHorizontal: 20,
      marginTop: 20,
      marginBottom: 10,
      fontSize: 17,
      fontWeight: 'bold',
    },
    header: {
      backgroundColor: '#daffc9',
    },
    body: {
        marginVertical: 10,
        flex: 1,
    },
    subContainer: {
        marginHorizontal: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#dddddd',
        padding: 10,
        marginBottom: 10,
        fontSize: 18,
        borderRadius: 6,
    },
    error: {
        color: 'red',
    },
  });
  
  export default globalStyles