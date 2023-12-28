import { useSelector } from "react-redux";
import { useGetRowsQuery } from '../../services/api/api';
import './Table.style.scss';
import { RowTree } from "components/TableRow/TableRow.types";
import TableRow from "components/TableRow";
import { RootState } from "store/store";

export const Table = () => {
  const { isLoading, isError } = useGetRowsQuery();
  const rows = useSelector((state: RootState) => state.rows);

  const createTree = (row: RowTree, depth: number = 0, parentId: number = null): JSX.Element => {
    const style = { "--data-x": depth } as React.CSSProperties;
    return (
      <div key={row.id} className="table__element table__group">
        <TableRow row={row} parentId={parentId} level={depth}/>
        {row.child.length > 0 && <div className={`level-${depth} table__child table__group`} style={style}>{row.child.map((childRow: RowTree) => createTree(childRow, depth + 1, row.id))}</div>}
      </div>
    );
  };

  return (
    <div className="table__wrapper">
      {isLoading
        ? 'loading...'
        : isError
          ? 'Error'
          : <div className="table">
            <header>
              <div className="table__row">
                <div className="table__data">Уровень</div>
                <div className="table__data">Наименование работ</div>
                <div className="table__data">Основная з/п</div>
                <div className="table__data">Оборудование</div>
                <div className="table__data">Накладные расходы</div>
                <div className="table__data">Сметная прибыль</div>
              </div>
            </header>
            {rows.length && rows.map((row) => createTree(row))}
          </div>
      }
    </div>
  );
};