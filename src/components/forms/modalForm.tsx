import React, { useState, useEffect } from "react";
import FileInfo from "./FileInfo";
import FileUploadForm from "./uploadForm";
import axios, { AxiosResponse } from 'axios';
import { urlLogs } from '../../endpoints';
import { ListDTO } from "../../DTOs/listDTO";

type ModalFormProps = {
  showModal: boolean;
  handleModalClose: (showModal: boolean) => void;
  onDisplayChange: (_selectedLogs: string[]) => void;
};

export default function ModalForm(props: ModalFormProps) {
  const [filesDB, setFilesDB] = useState<ListDTO[]>([]);
  const [selectedLogs, setSelectedLogs] = useState<string[]>([]);
  const [isNewUpload, setIsNewUpload] = useState(true);

  useEffect(() => {
    axios.get<ListDTO[]>(`${urlLogs}/import`)
      .then(response => {
        setFilesDB(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [isNewUpload]);

  const handleIsNewUploadChange = (change: boolean) => {
    const tempBool = isNewUpload;
    setIsNewUpload(!tempBool);
    setFilesDB([]);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.handleModalClose(false);
    props.onDisplayChange(selectedLogs);
  };

  const handleCheckBoxChange = (event: React.FormEvent<HTMLInputElement>) => {
    const id = event.currentTarget.id;
    const isChecked = event.currentTarget.checked;
    if (isChecked) {
      const tempSelectedLogs = selectedLogs
      setSelectedLogs([...selectedLogs, id]);
    } else {
      setSelectedLogs(selectedLogs.filter((logId) => logId !== id));
    }
  };


  return (
    <>
      {/* pokud je showModal true zobrazi se mofal */}
      {props.showModal && (
        <div className="modal">
          <div className="modal-content">
            <form onSubmit={handleSubmit} className="justify-items-center">
              <h2>Vyberte zaznamy z DB</h2>
              <button type="submit" className="file-submit-btn">Zobrazit vybrane zaznamy</button>
              <table className="container ListOfRecords">
                <thead>
                  <tr className="row">
                    <th className="col-2">Soubor</th>
                    <th className="col-3">Nahráno</th>
                    <th className="col-3">Začátek záznamu</th>
                    <th className="col-3">Konec záznamu</th>
                    <th className="col-1">Zobrazit</th>
                  </tr>
                </thead>

                <tbody>
                  {filesDB.map((log, index) => (
                    <tr key={index} className="row">
                      <FileInfo
                        key={index}
                        csvFileId={log.csvFileId}
                        csvFileName={log.csvFileName}
                        userId={log.userId}
                        uploadDate={log.uploadDate}
                        firstTimeStamp={log.firstTimeStamp}
                        lastTimeStamp={log.lastTimeStamp}
                        logId={index}
                      />
                      <td className='col-1'><input type='checkbox' id={log.csvFileId} onChange={handleCheckBoxChange} /></td>
                    </tr>
                  ))}
                </tbody>

              </table>


            </form>
            <FileUploadForm isNewUpload={handleIsNewUploadChange} />
            <button
              className="close-button"
              onClick={() => props.handleModalClose(false)}
            >
              X
            </button>
          </div>
        </div>
      )}
    </>
  );
}
