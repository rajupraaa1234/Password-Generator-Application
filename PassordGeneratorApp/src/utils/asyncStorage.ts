import AsyncStorage from '@react-native-async-storage/async-storage';

export async function setAsValue(key: string, value: any) {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (e) {
    console.log(e);
  }
}

export async function getAsValue(key: string) {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e) {
    console.log(e);
    // read error
  }
}

export async function MultigetAsValue(keys: string) {
  try {
    const value = await AsyncStorage.multiGet(keys);
    return value;
  } catch (e) {
    console.log(e);
    // read error
  }
}



export async function multiRemoveValue(key: string) {
  try {
    await AsyncStorage.multiRemove(key, err => {
      console.log('is any error while async multi remove - ', err);
    });
  } catch (error) {
    console.log('Error Remove multi async storage ');
  }
}

export async function clearStorage() {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.log('Error in clear async storage');
  }
}
