import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import mainImg from '../image/choonWithYoung.jpg'
import Nav from './Nav';

const UpdateForm = () => {

    const{ userId } = useParams()

    const [userDTO, setUserDTO] = useState({
        name: '',
        id: '',
        password: ''
    });

    const [userOriginDTO, setUserOriginDTO] = useState({
        name: '',
        id: '',
        password: ''
    });

    useEffect(()=>{
        axios.get(`/user/getItem?id=${userId}`)
            .then(res=>{
                setUserDTO(res.data);
                setUserOriginDTO(res.data);
            })
            .catch(error => console.log(error))

    },[userID]); 

    const {name, id, password} = userDTO;

    const navigate = useNavigate();

    const onInput = (e) => {
        setUserDTO({...userDTO, [e.target.name] : e.target.value})
    }

    const [nameDiv, setNameDiv] = useState('')
    const [passwordDiv, setPasswordDiv] = useState('')

    const onUpdateSubmit = (e) => {
        e.preventDefault();

        setNameDiv('')
        setPasswordDiv('')

        if(!name){
            setNameDiv('이름을 입력해주세요')
        }
        else if(!password){
            setPasswordDiv('비밀번호를 입력해주세요')
        }
        else {
            axios.put('/user/update', null, { params: userDTO })
            .then(res=>{
                alert('정보를 수정했습니다.');
                navigate('/user/list');
            })
            .catch(error => console.log(error))
        }
    }

    const onDeleteSubmit = (e) => {
        e.preventDefault();

        console.log('삭제')
        
        axios.delete(`/user/delete?id=${userId}`)
        .then(
            alert('정보를 삭제했습니다.'),
            navigate('/user/list')
            )
        .catch(error => console.log(error))
     
    }

    const onReset = (e) => {
        e.preventDefault();

        // 초기화
        setUserDTO(userOriginDTO)
        setNameDiv('')
        setPasswordDiv('')
    }

    return (
        <div className='container'>
            <Nav />
            <form>
                <table>
                    <tbody>
                        <tr>
                            <th>
                                이름
                            </th>
                            <td>
                                <input type="text" name="name" value={name} id="name" onChange={onInput}/>
                                <div id="nameDiv" style={{color: 'red'}}>{ nameDiv }</div>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                아이디
                            </th>
                            <td>
                                <input type="text" name="id" value={id} id="id" onChange={onInput} readOnly/>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                비밀번호
                            </th>
                            <td>
                                <input type="password" name="password" value={password} id="password" onChange={onInput}/>
                                <div id="passwordDiv" style={{color: 'red'}}>{ passwordDiv }</div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2} align='center'>
                                <button onClick={onUpdateSubmit}>수정</button>
                                <button onClick={onReset}>취소</button>
                                <button onClick={onDeleteSubmit}>삭제</button>
                                <button onClick={()=>{navigate('/user/list/0')}}>목록</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
            <Link to="/"><img style={{width: '100px'}} src="https://item.kakaocdn.net/do/07b822e434d42166cdf3123e30c9dcb4f43ad912ad8dd55b04db6a64cddaf76d" alt="이미지"/></Link>
            <Link to="/"><img style={{width: '100px'}} src={mainImg} alt="이미지"/></Link>
        </div>
    );
};

export default UpdateForm;