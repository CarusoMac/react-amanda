import React, { useState, useEffect } from "react";
import FileInfo from "./FileInfo";
import FileUploadForm from "./uploadForm";
import axios from 'axios';
import { urlLogs } from '../../endpoints';
import { ListDTO } from "../../DTOs/listDTO";

interface ModalFormProps {
  showModal: boolean;
  handleModalClose: (showModal: boolean) => void;
  onDisplayChange: (_selectedLogs: string[]) => void;
  preserveCheckBox: string[];
};

export default function ModalForm(props: ModalFormProps) {
  const [filesDB, setFilesDB] = useState<ListDTO[]>([]);
  const [selectedLogs, setSelectedLogs] = useState<string[]>(props.preserveCheckBox);
  const [isNewUpload, setIsNewUpload] = useState(true);

  useEffect(() => {
    axios.get<ListDTO[]>(`${urlLogs}/export`)
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

  const handleSubmit = () => {
    props.handleModalClose(false);
    props.onDisplayChange(selectedLogs);
  };

  const handleCheckBoxChange = (event: React.FormEvent<HTMLInputElement>) => {
    const id = event.currentTarget.id;
    const isChecked = event.currentTarget.checked;
    if (isChecked) {
      setSelectedLogs([...selectedLogs, id]);
    } else {
      setSelectedLogs(selectedLogs.filter((logId) => logId !== id));
    }
  };

  return (
    <>
      {props.showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2 className="mb-3">Dostupné záznamy</h2>
            <form className="justify-items-center">
              <div className="table-container">
                <table className="container ListOfRecords">
                  <thead style={{ position: 'sticky', top: '0', backgroundColor: "white" }}>
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
                        <td className='col-1'><input type='checkbox' id={log.csvFileId} onChange={handleCheckBoxChange} checked={selectedLogs.includes(log.csvFileId)} /></td>
                      </tr>

                    ))}
                  </tbody>
                </table>
              </div>
            </form>
            <FileUploadForm isNewUpload={handleIsNewUploadChange} />
            <button type="button"
              className="file-submit-btn"
              onClick={handleSubmit}
              style={{ marginTop: 30 }}>Zobrazit vybrané</button>

            <button
              className="close-button m-3"
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
