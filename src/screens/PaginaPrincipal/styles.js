// Miguel Francisco da Silva Sales e Victor Luiz Koba Batista
import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  background: #ffffff;
  flex: 1;
`;

export const CommentInput = styled.TextInput`
  height: 40px;
  background-color: #f0f0f0;
  padding: 8px 12px;
  border-radius: 8px;
  margin-top: 10px;
`;


export const ButtonPost = styled.TouchableOpacity`
  position: absolute;
  bottom: 5%;
  right: 6%;
  width: 60px;
  height: 60px;
  background: #ff0000;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const PostContainer = styled.View`
  margin: 15px;
  background: #f1f1f1;
  border-radius: 10px;
  overflow: hidden;
`;

export const PostImage = styled.Image`
  width: 100%;
  height: 300px;
`;

export const LikeButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;

export const LikeText = styled.Text`
  margin-left: 8px;
  font-size: 16px;
  color: #333;
`;
