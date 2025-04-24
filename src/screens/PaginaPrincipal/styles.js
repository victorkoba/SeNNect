import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
    background:#ffffff;
    flex:1;
`;

export const ButtonPost = styled.TouchableOpacity`
    position:absolute;
    bottom:5%;
    right:6%;
    width:60px;
    height:60px;
    background:#ff0000;
    border-radius:30px;
    justify-content:center;
    align-items:center;
    z-index:999;
`;