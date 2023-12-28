import { EditableFieldProps } from "./EditableField.types";
import './EditableField.style.scss';

export const EditableField = ({ handleKeyDown, handleChange, value, name, readonly }: EditableFieldProps) => {
  return (
    <input
      className="table__field"
      onChange={(e) => handleChange(e, name)}
      onKeyDown={handleKeyDown}
      value={value}
      name={name}
      type={name === 'rowName' ? 'text' : 'number'}
      readOnly={readonly} />
  );
};