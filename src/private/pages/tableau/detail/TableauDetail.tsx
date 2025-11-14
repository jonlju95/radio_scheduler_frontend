import {useLocation} from "react-router-dom";
import type {Tableau} from "../../../../models/Tableau.ts";
import {useEffect, useState} from "react";
import {apiClient} from "../../../../api/apiClient.ts";
import ContentHeader from "../../../../components/private/contentHeader/ContentHeader.tsx";
import ContentBody from "../../../../components/private/contentBody/ContentBody.tsx";
import Button from "../../../../components/shared/button/Button.tsx";
import {useModal} from "../../../../contexts/modal/UseModal.tsx";
import TimeslotModal from "../../../../components/private/modals/TimeslotModal.tsx";
import type {Timeslot} from "../../../../models/Timeslot.ts";

const TableauDetail = () => {
    const {state} = useLocation();
    const isNew = state.row.id === "new";

    const emptyTableau: Tableau = {
        id: "new",
        date: state.row.date,
        timeslots: []
    };

    const [tableau, setTableau] = useState<Tableau>(isNew ? emptyTableau : state.row);
    // const [originalTableau, setOriginalTableau] = useState<Tableau>(isNew ? emptyTableau : state.row);
    const [loading, setLoading] = useState(!isNew);

    // const {triggerDialog} = useDialog();
    const {openModal} = useModal();

    useEffect(() => {
        if (!isNew) {
            apiClient.get<Tableau>(`/tableaux/${tableau.id}`)
                .then(response => {
                    setTableau(response.data);
                    // setOriginalTableau(response.data);
                    setLoading(false);
                });
        }
    }, [isNew, tableau.id]);

    // const saveTableau = (data: Tableau) => {
    //     console.log(data);
    // };


    const triggerModal = () => {

        openModal<Timeslot>(<TimeslotModal timeslotId={"new"}/>).then((data) => {
            console.log(data);
            // const timeslot: Timeslot = {
            //     ...data
            // };
            // tableau.timeslots.push(timeslot);
            // console.log(tableau);
        });
    }

    return (
        <div className={"content"}>
            <ContentHeader title={!isNew ? String(tableau?.date) : String(tableau?.date.getFullYear() + "-" + (tableau?.date.getMonth() + 1) + "-" + ('0' + tableau?.date.getDate()).slice(-2))} detailPage={true}/>
            <ContentBody>
                {loading ? (<div>Loading...</div>) : (
                    <div>
                        <Button btnClasses={"btn-primary"} btnLabel={"Add timeslot"} onClickAction={triggerModal}></Button>
                        {/*<ModalContext.Provider value={{showModal, toggleModal}}>*/}
                        {/*    <Modal canShow={showModal} updateModalState={toggleModal}></Modal>*/}
                        {/*</ModalContext.Provider>*/}
                        {/*<InputField inputLabel={"Capacity"} inputType={"text"} inputName={"studioCapacity"}*/}
                        {/*       value={""}*/}
                        {/*       onChange={(e) => {*/}

                        {/*       }} required/>*/}
                        {/*<DropdownField dropdownLabel={"Host"} options={options} onChange={(() => {})}></DropdownField>*/}
                    </div>
                )}
            </ContentBody>
        </div>
    )
};

export default TableauDetail;