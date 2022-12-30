import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { DoctorService } from '../../service/DoctorService';
import { apiMessageConstant } from '../../environments/ApiMessageConstant';

const DataTableList = (props) => {
  //listName : Başlık 
  //rowObje   : Tablo alan isimleri
  //dataList  : tablo datası.

  const { listName, rowObje, dataList } = props;
  const [columns, setColumns] = useState([]);

  //_____
  const [selectedRows, setSelectedRows] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [tableValues, setTableValues] = useState(null);
  const dt = useRef(null);
  const [deleteDialog, setDeleteDialog] = useState(false);

  useEffect(() => {
    debugger
    setColumns(Object.keys(rowObje));
    console.log(props)
    setTableValues(dataList);
  }, [props]);

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0"> {listName}  Listesi</h5>
      <span className="block mt-2 md:mt-0 p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
      </span>
    </div>
  );
  const dynamicColumns = columns.map((col, i) => {
    
    //let column = columns[i].charAt(0).toUpperCase() + columns[i].slice(1);
    return <Column key={col} sortable field={col} header={columns[i]} />;
  });

  return (
    <div className="grid crud-demo">
      <div className="col-12">
        <div className="card">
          {tableValues &&
          <DataTable
            value={tableValues}
            selection={selectedRows}
            onSelectionChange={(e) => setSelectedRows(e.value)}
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users"
            emptyMessage="No User found."
            header={header}
            responsiveLayout="scroll"
          >
            {dynamicColumns}


          </DataTable>}
        </div>
      </div>
    </div>
  );
};

export default DataTableList;
