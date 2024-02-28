import React from 'react';
import {
  View,
  StyleSheet,
  TextInput as RNTextInput,
  TextInputSubmitEditingEventData,
  NativeSyntheticEvent,
  ReturnKeyTypeOptions,
  TextInputFocusEventData,
} from 'react-native';
import {Control, Controller, FieldValues, Path} from 'react-hook-form';
import {HelperText, TextInput} from 'react-native-paper';

interface IFormTextInput<T extends FieldValues> {
  type?: 'text' | 'password';
  name: Path<T>;
  label: string;
  control: Control<T, any>;
  disabled?: boolean;
  mode?: 'flat' | 'outlined';
  multiline?: boolean;
  editable?: boolean;
  right?: React.ReactNode;
  left?: React.ReactNode;
  returnKeyLabel?: string;
  returnKeyType?: ReturnKeyTypeOptions;
  onSubmitEditing?: (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => void;
  onBlur?: ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void) &
    ((args: any) => void);
  onChange?: (text: string) => void;
  inputRef?: React.Ref<RNTextInput> | null;
}

export const FormTextInput = <T extends FieldValues>(
  props: IFormTextInput<T>,
) => {
  const {
    inputRef,
    type = 'text',
    name,
    label,
    control,
    disabled = false,
    mode = 'outlined',
    multiline = false,
    editable = true,
    right,
    left,
    returnKeyLabel,
    returnKeyType,
    onSubmitEditing,
    onBlur,
  } = props;

  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  return (
    <View style={styles.root}>
      <Controller
        name={name}
        control={control}
        render={({field: {value, onChange}, fieldState: {error, invalid}}) => (
          <>
            <TextInput
              ref={inputRef}
              label={label}
              mode={mode}
              value={value}
              returnKeyLabel={returnKeyLabel}
              returnKeyType={returnKeyType}
              onSubmitEditing={onSubmitEditing}
              editable={editable}
              onChangeText={onChange}
              onBlur={onBlur}
              disabled={disabled}
              error={!!error}
              autoCapitalize="none"
              multiline={multiline}
              scrollEnabled={false}
              left={left}
              right={
                type === 'password' ? (
                  <TextInput.Icon
                    icon={showPassword ? 'eye-off' : 'eye'}
                    forceTextInputFocus={false}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  right
                )
              }
              secureTextEntry={type === 'password' ? !showPassword : false}
            />

            {invalid && (
              <HelperText type="error" visible={invalid}>
                {error?.message}
              </HelperText>
            )}
          </>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {marginVertical: 2},
});
