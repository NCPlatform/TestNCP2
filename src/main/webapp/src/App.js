import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./main/index.js";
import WriteForm from "./user/WriteForm";
import List from "./user/List";
import UpdateForm from "./user/UpdateForm";
import UploadForm from "./user/UploadForm.js";
import UploadList from "./user/UploadList.js";
import FilterTest from "./user/FilterTest.js";

function App() {
  return (
    <BrowserRouter>
      {/* 화면에 보이는 영역 */}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/user">
          <Route path="writeForm" element={<WriteForm />} />
          <Route path="list">
            <Route rscindex element={<List/>}/>
            <Route path=":cPage" element={<List/>}/>
          </Route>
          <Route path="updateForm" >
            <Route path=":userId" element={<UpdateForm/>}/>
          </Route>
          <Route path="uploadForm" element={<UploadForm />}/>
          <Route path="uploadList" element={<UploadList />}/>
        </Route>
        <Route path="filterTest" element={<FilterTest/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
