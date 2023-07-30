import React from "react";
import {View , Text , TouchableOpacity , StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';



const Header = (props:any) => {
    const {name , style , leftIcon , rightIcon , leftClick , rightClick , isLeft , isRight  } = props;

    return (
      <View>
        <View style={[Mystyle.container , {...style}]}>
            <TouchableOpacity onPress={leftClick} style={{alignItems:'flex-start' ,marginLeft:20 }}>
                {isLeft && <Icon name={leftIcon} size={30} color="gray" />}
            </TouchableOpacity>
            <View style={{alignItems:'center' , justifyContent:'center' , alignContent:'center' ,alignSelf:'center', }}>
                <Text style={{fontSize:20 , fontWeight:'500'}}>{name}</Text>
            </View>
            <TouchableOpacity onPress={rightClick} style={{alignItems:'flex-end' , marginRight:20}}>
                {isRight && <Icon name={rightIcon} size={30} color="gray" />}
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
   leftIcon : 'user',
   rightIcon : 'plus',
   isLeft : true,
   isRight : true,
   leftClick : ()=> {},
   rightClick : ()=> {},
}

export default Header;
