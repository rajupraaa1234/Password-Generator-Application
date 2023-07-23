import React from "react";
import {View , Text , TouchableOpacity , StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';



const Header = (props:any) => {
    const {name , style , leftIcon , rightIcon } = props;

    return (
      <View>
        <View style={[Mystyle.container , {...style}]}>
            <TouchableOpacity style={{alignItems:'flex-start' ,marginLeft:20 }}>
                <Icon name="user" size={30} color="gray" />
            </TouchableOpacity>
            <View style={{alignItems:'center' , }}>
                <Text style={{fontSize:20 , fontWeight:'500'}}>{name}</Text>
            </View>
            <TouchableOpacity style={{alignItems:'flex-end' , marginRight:20}}>
                <Icon name="plus" size={30} color="gray" />
            </TouchableOpacity>
        </View>
          <View style={{height:1,backgroundColor:'#D3D3D3',width:'100%'}}/>
        </View>
    )

}


const Mystyle = StyleSheet.create({
    container : {
        width:'100%',
        height:80,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between' , 
        position:'relative',
        alignContent:'space-between',
    }
})

Header.defaultProps = {
   name :  "Password",
}

export default Header;
