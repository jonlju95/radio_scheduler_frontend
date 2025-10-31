import {useLocation} from "react-router-dom";
import type {Tableau} from "../../../../models/Tableau.ts";
import {useEffect, useState} from "react";
import {apiClient} from "../../../../api/apiClient.ts";
import ContentHeader from "../../../components/contentHeader/ContentHeader.tsx";
import ContentBody from "../../../components/contentBody/ContentBody.tsx";
import Button from "../../../components/button/Button.tsx";
import {useModal} from "../../../../contexts/UseModal.tsx";
import {useDialog} from "../../../../contexts/UseDialog.tsx";
import TimeslotModal from "../../../components/modals/TimeslotModal.tsx";

const TableauDetail = () => {
    const {state} = useLocation();
    const isNew = state.row.id === "new";

    const emptyTableau: Tableau = {
        id: "new",
        date: new Date(Date.now()),
        timeslots: []
    };

    const [tableau, setTableau] = useState<Tableau>(isNew ? emptyTableau : state.row);
    const [originalTableau, setOriginalTableau] = useState<Tableau>(isNew ? emptyTableau : state.row);
    const [loading, setLoading] = useState(!isNew);

    const {triggerDialog} = useDialog();
    const {openModal, closeModal} = useModal();

    useEffect(() => {
        if (!isNew) {
            apiClient.get<Tableau>(`/tableaux/${tableau.id}`)
                .then(response => {
                    setTableau(response.data);
                    setOriginalTableau(response.data);
                    setLoading(false);
                });
        }
    }, [isNew, tableau.id]);

    const saveTableau = (formData: FormData) => {

    };


    function triggerModal() {
        openModal(<TimeslotModal timeslotId={"new"}/>);
    }

    return (
        <div className={"content"}>
            <ContentHeader title={`${isNew ? "New tableau" : String(tableau?.date)}`} detailPage={true}/>
            <ContentBody>
                {loading ? (<div>Loading...</div>) : (
                    <div>
                        <Button btnLabel={"Modal"} onClickAction={triggerModal}></Button>
                        {/*<ModalContext.Provider value={{showModal, toggleModal}}>*/}
                        {/*    <Modal canShow={showModal} updateModalState={toggleModal}></Modal>*/}
                        {/*</ModalContext.Provider>*/}
                        {/*<Input inputLabel={"Capacity"} inputType={"text"} inputName={"studioCapacity"}*/}
                        {/*       value={""}*/}
                        {/*       onChange={(e) => {*/}

                        {/*       }} required/>*/}
                        {/*<Dropdown dropdownLabel={"Host"} options={options} onChange={(() => {})}></Dropdown>*/}
                    </div>
                )}
            </ContentBody>
        </div>
    )
};

export default TableauDetail;