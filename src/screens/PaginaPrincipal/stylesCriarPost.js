// Miguel Francisco da Silva Sales e Victor Luiz Koba Batista
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
  padding: 20px;
`;

export const UploadButton = styled.TouchableOpacity`
  background-color: #ededed;
  padding: 12px;
  border-radius: 10px;
  align-items: center;
  margin-bottom: 15px;
`;

export const UploadText = styled.Text`
  font-size: 16px;
  color: #333;
`;

export const ImageArea = styled.View`
  width: 100%;
  height: 200px;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 20px;
  border: 1px solid #ccc;
`;

export const Input = styled.TextInput`
  background-color: #f1f1f1;
  padding: 10px;
  border-radius: 8px;
  font-size: 16px;
  height: 100px;
  margin-bottom: 20px;
  text-align-vertical: top;
`;

export const SubmitButton = styled.TouchableOpacity`
  background-color: #ff0000;
  padding: 15px;
  border-radius: 10px;
  align-items: center;
`;

export const SubmitText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;
