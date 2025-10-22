import './App.css'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Studio from "./routes/studio/Studio.tsx";
import Layout from "./components/layout/Layout.tsx";
import Schedule from "./routes/schedule/Schedule.tsx";
import TableauList from "./routes/tableau/list/TableauList.tsx";
import TableauDetail from "./routes/tableau/detail/TableauDetail.tsx";
import TableauLayout from "./routes/tableau/TableauLayout.tsx";


const App = () => {

    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route index element={<Schedule/>}/>
                        <Route path="/studios" element={<Studio/>}/>
                        <Route path="/hosts" element={<Studio/>}/>
                        <Route path="/shows" element={<Studio/>}/>
                        <Route path="/schedules" element={<Studio/>}/>

                        <Route path="/tableau" element={<TableauLayout/>}>
                            <Route index element={<TableauList/>}/>
                            <Route path=":id" element={<TableauDetail/>}/>
                        </Route>

                        <Route path="/timeslots" element={<Studio/>}/>
                    </Route>


                </Routes>
            </Router>
        </>
    )
}

export default App
