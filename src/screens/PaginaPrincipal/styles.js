// Miguel Francisco da Silva Sales e Victor Luiz Koba Batista
import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  background: #f9f9f9;
  flex: 1;
  padding: 16px;
`;

export const PostContainer = styled.View`
  background: #fff;
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 10px;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 10px;
  elevation: 5;
`;

export const PostImage = styled.Image`
  width: 100%;
  height: 200px;
  border-radius: 8px;
  margin-top: 8px;
`;

export const ButtonPost = styled.TouchableOpacity`
  position: absolute;
  bottom: 5%;
  right: 6%;
  width: 60px;
  height: 60px;
  background: #e60000;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  z-index: 999;
  shadow-color: #000;
  shadow-opacity: 0.2;
  shadow-radius: 6px;
  elevation: 5;
`;

export const ProfileImage = styled.Image`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  margin-right: 8px;
`;

export const PostHeader = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

export const PostUserName = styled.Text`
  font-weight: bold;
  font-size: 16px;
  color: #333;
`;

export const LikeButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-top: 12px;
`;

export const LikeText = styled.Text`
  margin-left: 8px;
  font-size: 14px;
  color: #555;
`;

export const CommentInput = styled.TextInput`
  height: 40px;
  background-color: #f0f0f0;
  padding: 8px 12px;
  border-radius: 20px;
  margin-top: 12px;
  font-size: 14px;
`;

export const CommentText = styled.Text`
  font-size: 13px;
  margin-top: 6px;
  color: #555;
`;

export const PostDescription = styled.Text`
  margin-top: 8px;
  font-size: 14px;
  color: #333;
`;
