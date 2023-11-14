import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <div className='container mt-5'>
            <div className='navbar navbar-expand-lg bg-body-tertiary'>
                <Link className='navbar-brand' to='/'><h3>JAVAWITHREACT</h3></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" to='/user/writeForm'>입력</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/user/list/0'>출력</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/user/uploadForm'>이미지 업로드</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/user/uploadList'>이미지 목록</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Nav;