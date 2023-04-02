import React, { useState, useEffect } from "react";
import LogDbModal from "./logDbModal";
import FileUploadForm from "./uploadForm";
import axios, { AxiosResponse } from 'axios';
import { urlLogs } from '../../endpoints';
import { ListDTO } from "./listDTO";
import Pagination from "../../utils/pagination";

type ModalProps = {
  showModal: boolean;
  handleModalClose: (showModal: boolean) => void;
  // Other props here...
};

export default function ModalForm(props: ModalProps) {
  const [logs, setLogs] = useState<ListDTO[]>([]);
  const [totalAmountOfPages, setTotalAmountOfPages] = useState(0);
  const [recordsPerPage, setRecordsPerPage] = useState(1);
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios.get<ListDTO[]>(`${urlLogs}/import`)
      .then(response => {

        // try {
        //   // const totalAmountOfRecords = parseInt(response.headers["TotalRecordsAmount"], 10);
        //   const totalAmountOfRecords = 10;

        //   setTotalAmountOfPages(Math.ceil(totalAmountOfRecords / recordsPerPage));
        //   // console.log("totalAmountOfRecords" + { totalAmountOfRecords })
        // } catch (exception) {
        //   console.log("nevyslo")
        // }
        setLogs(response.data);

      })
      .catch(error => {
        console.error(error);
      });
    // }, [page, recordsPerPage]);
  }, []);


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission here
    props.handleModalClose(false);
  };

  return (
    <>
      {props.showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Vyberte zaznamy z DB</h2><button type="submit" className="file-submit-btn">Zobrazit vybrane zaznamy</button>

            {/* <Pagination currentPage={page} totalAmountOfPages={totalAmountOfPages} onChange={newPage => setPage(newPage)} radio={2} /> */}
            <form onSubmit={handleSubmit}>

              <table >
                <thead className="container">
                  <tr className="row">
                    <th className="col-2">Soubor</th>
                    <th className="col-3">Nahráno</th>
                    <th className="col-3">Začátek záznamu</th>
                    <th className="col-3">Konec záznamu</th>
                    <th className="col-1">Zobrazit</th>
                  </tr>
                </thead>
                <tbody className="ListOfRecords">
                  {logs.map((log, index) => (
                    <LogDbModal key={index} csvFileId={log.csvFileId} csvFileName={log.csvFileName} userId={log.userId} uploadDate={log.uploadDate} firstTimeStamp={log.firstTimeStamp} lastTimeStamp={log.lastTimeStamp} logId={index} />
                  ))}

                </tbody>
              </table>


            </form>
            <FileUploadForm />
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