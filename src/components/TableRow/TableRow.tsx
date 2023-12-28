import { useAddRowMutation, useDeleteRowMutation, useUpdateRowMutation } from '../../services/api/api';
import { RowTree, RowCreateRequest } from './TableRow.types';
import { useState, useEffect } from 'react';
import './TableRow.style.scss';
import { useDispatch } from 'react-redux';
import { createNewRow } from 'store/store';
import EditableField from 'components/EditableField';

let newRowCounter = 0;

export const TableRow = ({ row, parentId, level }: { row: RowTree, parentId?: number, level: number }) => {
  const dispatch = useDispatch();
  const [isEdited, setIsEdited] = useState(row.new);
  const [addRowRequest] = useAddRowMutation();
  const [updateRowRequest] = useUpdateRowMutation();
  const [deleteRowRequest] = useDeleteRowMutation();
  const [fields, setFields] = useState({
    rowName: row?.rowName || '',
    salary: row?.salary || 0,
    equipmentCosts: row?.equipmentCosts || 0,
    overheads: row?.overheads || 0,
    estimatedProfit: row?.estimatedProfit || 0
  });

  useEffect(() => {
    setFields({
      rowName: row?.rowName || '',
      salary: row?.salary || 0,
      equipmentCosts: row?.equipmentCosts || 0,
      overheads: row?.overheads || 0,
      estimatedProfit: row?.estimatedProfit || 0
    });
  }, [row])

  const handleKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      let body: RowCreateRequest = {
        ...fields,
        machineOperatorSalary: 0,
        mainCosts: 0,
        materials: 0,
        mimExploitation: 0,
        supportCosts: 0,
      };
      let response;
      if (row.new) {
        body.parentId = parentId;
        response = await addRowRequest({ body, id: row.id });
      } else {
        response = await updateRowRequest({ body, id: row.id });
      }
      if (response['error']) {
        console.error(response['error']);
      } else {
        setIsEdited(false);
      }
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
    const value = e.currentTarget.value;
    setFields((state) => {
      return ({
        ...state,
        [name]: value
      })
    });
  };
  const addRow = () => {
    newRowCounter++;
    dispatch(createNewRow({ parentId: row.id, cliendId: Number(`${row.id}0000000${newRowCounter}`) }));
  };
  const deleteRow = async () => {
    let res = await deleteRowRequest(row.id);
    if (res['error']) console.error(res['error']);
  };

  return (
    <div
      className={`table__row ${isEdited ? 'edited' : ''}`}
      onDoubleClick={() => setIsEdited(true)}>
      <div className={`table__data ${row.child.length > 0 ? 'haschild' : ''}`}>
        <div className="table__btns">
          <button type="button" className="table__btn table__btn--add" onClick={addRow} disabled={isEdited}></button>
          {!isEdited && <button type="button" className="table__btn table__btn--delete" onClick={deleteRow}></button>}
        </div>
      </div>
      {
        Object.entries(fields).map((el, index) => <div className="table__data" key={`${el[0]}_${index}`}>
          <EditableField
            handleChange={handleChange}
            handleKeyDown={handleKeyDown}
            value={el[1]}
            name={el[0]}
            readonly={!isEdited} />
        </div>)
      }
    </div>
  );
};