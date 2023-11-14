import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import axios from 'axios';

const UploadList = () => {

    const [list, setList] = useState([]);

    useEffect(()=>{
        axios.get(`/user/getUploadList`)
            .then(res=>{
                setList(res.data);
                //console.log(res.data)
            })
            .catch(error => console.log(error))
    },[])

    return (
        <div className='container'>
            <Nav />
            <h1>이미지 목록</h1>
            <table className='table table-hover'>
                <thead>
                    <tr>
                        <th scope="col">seq</th>
                        <th scope="col">TITLE</th>
                        <th scope="col">CONTENT</th>
                        <th scope="col">IMAGE</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        list.length !== 0 ? list.map((item,index) => {
                            return <tr key={index}>
                                <td>{item.seq}</td>
                                <td>
                                    {item.imageName}
                                </td>
                                <td>{item.imageContent}</td>
                                <td><img className='img-thumbnail' src={ decodeURIComponent(`../storage/${item.imageOriginalName}`,"UTF-8")} alt={item.imageName}/></td>
                            </tr>
                        }):
                        <tr><td colSpan={3}>데이터가 없습니다.</td></tr>
                    }
                </tbody>
            </table>
        </div>
    );
};

export default UploadList;