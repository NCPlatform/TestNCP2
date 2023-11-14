import React, { useState } from 'react';
import axios from 'axios';
import Nav from './Nav';
import { useNavigate } from 'react-router-dom';

const UploadForm = () => {

    const [imageDTO, setImageDTO] = useState({
        imageName:'',
        imageContent:'',
        imageFileName: ' ',
        imageOriginalName: ' '
    });

    const [imageList, setImageList] = useState([]);
    const [imageShowList, setImageShowList] = useState([]);
    
    const navigate = useNavigate();

    const onInput = (e) => {
        if(e.target.name === "imageFile"){
            const imageLists = e.target.files;
            let imageUrlLists = [...imageShowList];

            for (let i = 0; i < imageLists.length; i++) {
                const currentImageUrl = URL.createObjectURL(imageLists[i]);
                imageUrlLists.push(currentImageUrl);
            }

            if (imageUrlLists.length > 10) {
                imageUrlLists = imageUrlLists.slice(0, 10);
            }

            setImageShowList([...imageUrlLists])

            setImageList(e.target.files)
        }else{
            setImageDTO({...imageDTO, [e.target.name] : e.target.value})
        }
    }

    const onSubmit = () => {

        const formData = new FormData()
        
        formData.append('userImageDTO', new Blob([JSON.stringify(imageDTO)], {type:'application/json'})) // = formdata에 imagedto의 값을 json화 시켜서 binary형식으로 붙여라
        
        // Solution 1
        Object.values(imageList).forEach((file) => formData.append("list",file))

        // Solution 2
        // for(var i=0; i<imageList.length; i++){
        //     formData.append('list', imageList[i]);
        // }

        axios.post('/user/upload', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            transformRequest: [
            function () {
                return formData;
            },
            ],
        })
        .then(res => {
            alert("이미지 등록을 완료했습니다.")
            navigate('/user/uploadList')
        })
        .catch(error => console.log(error))
    }

    const onReset = () => {
        setImageDTO({
            seq: 0,
            imageName:'',
            imageContent:'',
            imageFileName: ' ',
            imageOriginalName: ' ',
        });
        setImageList([])
        setImageShowList([])
    }

    const handleDeleteImage = (id) => {
        setImageList([...imageList.filter((_, index) => index !== id)]);
    };

    return (
        <div className='container mt-5'>
            <Nav />
            <h1>이미지 업로드</h1>
            <div className="mb-3">
                <label htmlFor="imageName" className="form-label">ImageName</label>
                <input type="email" className="form-control" id="imageName" name="imageName" value={imageDTO.imageName} onChange={(e)=>onInput(e)}/>
            </div>
            <div className="mb-3">
                <label htmlFor="imageContent" className="form-label">ImageContent</label>
                <textarea className="form-control" id="imageContent" name="imageContent" rows="5" value={imageDTO.imageContent} onChange={(e)=>onInput(e)}></textarea>
            </div>
            <div className="mb-3">
                <label htmlFor="imageFile">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-camera" viewBox="0 0 16 16">
                        <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z"/>
                        <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/>
                    </svg>
                    <input className="form-control" type="file" id="imageFile" name="imageFile" multiple={true} file={imageDTO.imageFile} onChange={(e)=>onInput(e)} style={{display:"none"}}/>
                </label>
            </div>
            <div className='mb-5 row row-cols-3'>
            {
                imageShowList.map((image,id) => (
                    <div className='col position-relative p-0' key={id}>
                        <img className="rounded" style={{width:"100%", height:"20vw", objectFit:"cover"}} src={image} alt={`${image}-${id}`} />
                        <button type="button" className="btn btn-danger position-absolute top-0 end-0 shadow-lg p-0" onClick={() => handleDeleteImage(id)}>
                            <button className='btn-close px-1 m-0'></button>
                        </button>
                    </div>
                ))
            }
            </div>
            <div className='d-grid gap-2 d-md-flex justify-content-md-end'>
                <button className='btn btn-success' onClick={onSubmit}>업로드</button>
                <button className='btn btn-danger' onClick={onReset}>취소</button>
            </div>
        </div>
    );
};

export default UploadForm;