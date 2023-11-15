import axios from 'axios'
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import mainImg from '../image/choonWithYoung.jpg'
import Nav from './Nav';

const WriteForm = () => {

    const [userDTO, setUserDTO] = useState({
        name: '',
        id: '',
        password: ''
    });

    const {name, id, password} = userDTO;

    const navigate = useNavigate();

    const onInput = (e) => {
        setUserDTO({...userDTO, [e.target.name] : e.target.value})
    }

    const [nameDiv, setNameDiv] = useState('')
    const [idDiv, setIdDiv] = useState('')
    const [passwordDiv, setPasswordDiv] = useState('')

    // 아이디 중복체크
    const onIsExistId = () => {
        axios.post(`/user/isExistId?id=${id}`)
            .then(res=>{
                setIdDiv(res.data === 'non_exist' ? '사용 가능' : '사용 불가능')
            })
            .catch(error => console.log(error))
    }

    const onWriteSubmit = (e) => {
        e.preventDefault();

        setNameDiv('')
        if(idDiv === '아이디를 입력해주세요')
            setIdDiv('')
        setPasswordDiv('')

        if(!name){
            setNameDiv('이름을 입력해주세요')
        }
        else if(!id){
            setIdDiv('아이디를 입력해주세요')
        }
        else if(!password){
            setPasswordDiv('비밀번호를 입력해주세요')
        }
        else if(idDiv === '사용 불가능'){
            alert('중복된 아이디로는 가입이 불가능합니다');
            setUserDTO({
                ...userDTO,
                id: ''
            })
            setIdDiv('')
        }
        else if(idDiv === '사용 가능'){

            // // Solution 1
            // axios.post('http://localhost:8080/user/write', null, {
            //     params: {
            //         name,
            //         id,
            //         password
            //     }
            // })
            // .then(res=>{
            //     alert('회원가입을 축하합니다');
            //     navigate('/user/lists');
            // })
            // .catch(error => console.log(error))

            // Solution 2
            axios.post('/user/write', null, { params: userDTO })
            .then(res=>{
                alert('회원가입을 축하합니다');
                navigate('/user/list');
            })
            .catch(error => console.log(error))
        }
    }

    const onReset = (e) => {
        e.preventDefault();

        // 초기화
        setUserDTO({
            name: '',
            id: '',
            password: ''
        })
        setNameDiv('')
        setIdDiv('')
        setPasswordDiv('')
    }

    return (
        <div className='container'>
            <Nav />
            <h1>입력</h1>
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
                                <input type="text" name="id" value={id} id="id" onChange={onInput} onBlur={onIsExistId}/>
                                <div id="idDiv" style={{color: idDiv === '사용 가능' ? 'blue' : 'red'}}>{ idDiv }</div>
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
                                <button onClick={onWriteSubmit}>등록</button>
                                <button onClick={onReset}>취소</button>
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

export default WriteForm;