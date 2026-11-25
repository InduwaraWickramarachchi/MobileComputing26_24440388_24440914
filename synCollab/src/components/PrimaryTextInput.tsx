import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import { theme } from '../constants/theme';
import { IconProps } from 'phosphor-react-native';

type PrimaryTextInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  keyboardType?: TextInputProps['keyboardType'];
  autoCapitalize?: TextInputProps['autoCapitalize'];
  secureTextEntry?: boolean;
  multiline?: boolean;
  leftIcon?: React.FC<IconProps>;
};

const PrimaryTextInput = ({
  value,
  onChangeText,
  placeholder,
  keyboardType,
  autoCapitalize,
  secureTextEntry = false,
  multiline = false,
  leftIcon: LeftIcon,
}: PrimaryTextInputProps) => {
  return (
    <View style={styles.container}>
      {LeftIcon && <LeftIcon style={styles.leftIcon} size={24} color={theme.colors.gray} />}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
        autoCorrect={false}
        style={[styles.input, multiline && styles.multilineInput]}
      />
    </View>
  );
};

export default PrimaryTextInput;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderWidth: 1,
    borderRadius: theme.radius.sm,
    borderColor: theme.colors.gray,
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    borderRadius: 5,
    marginVertical: 10,
    paddingHorizontal: 10,
    fontSize: theme.fonts.size.body,
  },
  leftIcon: {
    marginRight: 8,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
});
