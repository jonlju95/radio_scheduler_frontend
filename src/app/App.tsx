import {BrowserRouter, Route, Routes} from "react-router-dom";
import Studio from "./routes/studio/StudioLayout.tsx";
import Layout from "./components/layout/Layout.tsx";
import TableauList from "./routes/tableau/list/TableauList.tsx";
import TableauDetail from "./routes/tableau/detail/TableauDetail.tsx";
import TableauLayout from "./routes/tableau/TableauLayout.tsx";
import Dashboard from "./routes/dashboard/Dashboard.tsx";
import Timeslot from "./routes/timeslot/Timeslot.tsx";
import RadioShowLayout from "./routes/radioShow/RadioShowLayout.tsx";
import RadioHostLayout from "./routes/radioHost/RadioHostLayout.tsx";
import StudioList from "./routes/studio/list/StudioList.tsx";
import StudioDetail from "./routes/studio/detail/StudioDetail.tsx";
import RadioShowList from "./routes/radioShow/list/RadioShowList.tsx";
import RadioShowDetail from "./routes/radioShow/detail/RadioShowDetail.tsx";
import RadioHostList from "./routes/radioHost/list/RadioHostList.tsx";
import RadioHostDetail from "./routes/radioHost/detail/RadioHostDetail.tsx";
import {DialogProvider} from "../contexts/DialogContext.tsx";
import {ModalProvider} from "../contexts/ModalContext.tsx";


const App = () => {

    return (
        <>
            <DialogProvider>
                <ModalProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Layout/>}>
                                <Route index element={<Dashboard/>}/>
                                <Route path="/tableau" element={<TableauLayout/>}>
                                    <Route index element={<TableauList/>}/>
                                    <Route path=":id" element={<TableauDetail/>}/>
                                </Route>
                                <Route path="/timeslots" element={<Timeslot/>}/>
                                <Route path="/shows" element={<RadioShowLayout/>}>
                                    <Route index element={<RadioShowList/>}/>
                                    <Route path=":id" element={<RadioShowDetail/>}/>
                                </Route>
                                <Route path="/hosts" element={<RadioHostLayout/>}>
                                    <Route index element={<RadioHostList/>}/>
                                    <Route path=":id" element={<RadioHostDetail/>}/>
                                </Route>
                                <Route path="/studios" element={<Studio/>}>
                                    <Route index element={<StudioList/>}/>
                                    <Route path=":id" element={<StudioDetail/>}/>
                                </Route>
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </ModalProvider>
            </DialogProvider>
        </>
    )
}

export default App
