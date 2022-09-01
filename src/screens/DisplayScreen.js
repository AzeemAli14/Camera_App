// import React, {useState, useCallback} from 'react';
// import {
//   View,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   Text,
//   StatusBar,
//   Image
// } from 'react-native';
// import ImagePicker from 'react-native-image-crop-picker';

// const DisplayScreen = () => {
//   const [fileList, setFileList] = useState([]);
//   const onSelectedImage = useCallback(
//     image => {
//       setFileList(fileList => {
//         let newDataImg = [...fileList];

//         const source = {uri: image.path};
//         let item = {
//           id: fileList.length + 1,
//           url: source,
//         };
//         newDataImg.push(item);
//         return newDataImg;
//       });
//     },
//     [onSelectedImage],
//   );

//   const takePhotoFromCamera = useCallback(() => {
//     ImagePicker.openCamera({
//       width: 300,
//       height: 400,
//     }).then(image => {
//       onSelectedImage(image);
//     });
//   }, []);

//   const choosePhotoFromLibrary = useCallback(() => {
//     ImagePicker.openPicker({
//       width: 300,
//       height: 400,
//     })
//       .then(image => {
//         onSelectedImage(image);
//       })
//       .catch(error => {
//         if (error.code === 'E_PICKER_CANCELLED') {
//           alert('Error in uploading image from gallery');
//           return false;
//         }
//       });
//   }, [onSelectedImage]);

//   const onDelete = id => {
//     const arr = fileList.filter(function (item) {
//       return item.id !== id;
//     });
//     setFileList(arr);
//   };

//   const renderItem = useCallback(
//     ({item}) => {
//       return (
//         <View style={{justifyContent: 'center', alignItems: 'center'}}>
//           <TouchableOpacity
//           // onPress={() => onClickItem(item, index)}
//           // onLongPress={() => handleLongPress(item, index)}
//           >
//             <View style={{padding: 8}}>
//               <Image source={item.url} style={styles.itemImage} />
//               <View>
//                 <TouchableOpacity
//                   style={styles.buttonStyle}
//                   activeOpacity={1.5}
//                   onPress={() => onDelete(item.id)}>
//                   <Image
//                     source={require('../images/delete.png')}
//                     style={styles.imageStyle}
//                   />
//                   <Text style={styles.textStyle}>Delete</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </TouchableOpacity>
//         </View>
//       );
//     },
//     [fileList],
//   );

//   return (
//     <View style={styles.container}>
//       <StatusBar backgroundColor="white" />
//       <FlatList numColumns={3} data={fileList} renderItem={renderItem} />

//       <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
//         <TouchableOpacity
//           style={styles.viewData}
//           onPress={list => takePhotoFromCamera(setFileList)}>
//           <Text>Camera</Text>
//         </TouchableOpacity>

//         {/* <TouchableOpacity
//           style={styles.viewData}
//           onPress={() => choosePhotoFromLibrary()}>
//           <Text>Gallery</Text>
//         </TouchableOpacity> */}
//       </View>
//     </View>
//   );
// };

// export default DisplayScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   viewData: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     margin: 10,
//     width: 150,
//     borderRadius: 30,
//     height: 45,
//     elevation: 10,
//     backgroundColor: '#7a1f5c',
//   },
//   itemImage: {
//     height: 100,
//     width: 100,
//   },
//   imageStyle: {
//     padding: 10,
//     margin: 5,
//     height: 25,
//     width: 25,
//     resizeMode: 'stretch',
//   },
//   textStyle: {
//     color: 'black',
//   },
//   buttonStyle: {
//     width: 100,
//     height: 100,
//   },
// });

import { Text, View } from 'react-native'
import React, { Component } from 'react'

export class DisplayScreen extends Component {
  render() {
    return (
      <View>
        <Text>DisplayScreen</Text>
      </View>
    )
  }
}

export default DisplayScreen