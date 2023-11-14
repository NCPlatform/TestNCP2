import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Nav from './Nav';

const List = () => {

    const{ cPage } = useParams();

    const [list, setList] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(cPage*1 || 0);
    const [searchKey,setSearchKey] = useState('name');
    const [searchValue,setSearchValue] = useState('');

    const onSearchList = (e) => {
        e.preventDefault();
        setCurrentPage(0);
        getList()
    }

    useEffect(()=>{
        getList();
    },[currentPage]);

    const getList = () => {
        axios.get(`/user/getList?page=${currentPage}&searchKey=${searchKey}&searchValue=${searchValue}`)
            .then(res=>{
                setList(res.data.content);
                setTotalPage(res.data.totalPages)
            })
            .catch(error => console.log(error))
    }

    return (
        <div className='container'>
            <Nav />
            <h1>출력</h1>
            <table className='table table-hover'>
                <thead >
                    <tr>
                        <th style={{width: '30%'}}>이름</th>
                        <th style={{width: '40%'}}>아이디</th>
                        <th style={{width: '30%'}}>비밀번호</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        list.length !== 0 ? list.map((item,index) => {
                            return <tr key={index}>
                                <td>{item.name}</td>
                                <td>
                                    <Link to={`/user/updateForm/${item.id}`}>
                                        {item.id}
                                    </Link>
                                </td>
                                <td>{item.password}</td>
                            </tr>
                        }):
                        <tr><td colSpan={3}>데이터가 없습니다.</td></tr>
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={3} align='center'>
                            {/* 페이징 처리 */}
                            <div className='my-2 btn-group' role='group'>
                            { 
                                Array.from({ length: totalPage }).map((item, index) => (
                                    <button key={index} onClick={()=>setCurrentPage(index)} className={index === currentPage ? 'btn btn-dark':'btn btn-outline-dark'}>{index+1}</button>
                                ))
                            }
                            </div>
                            <form>
                                <select id='searchListForm' onChange={(e)=>setSearchKey(e.target.value)}>
                                    <option value='name'>이름</option>
                                    <option value='id' >아이디</option>
                                </select>
                                <input type="text" id='value' name="searchValue" value={ searchValue } onChange={ (e) => setSearchValue(e.target.value) } />
                                <button onClick={ onSearchList }>검색</button>
                            </form>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default List;