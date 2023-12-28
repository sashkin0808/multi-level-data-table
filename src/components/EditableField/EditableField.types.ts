export type EditableFieldProps = {
  handleKeyDown: (e: React.KeyboardEvent) => void,
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void,
  value: string | number,
  name: string,
  readonly: boolean
};