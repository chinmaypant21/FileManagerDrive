import React from 'react'

const DocumentItem = ({document}) => {

    function getDate(time) {
        const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        const date = new Date(time)
        return (`${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()}`)
    }

    function getDocumentType(document){
        var list = document.split('/')[1].split('.')
        return list[list.length-1]
    }

    return (
    <tr>
        <td style={{display:'flex',gap:'0.5em', flex:'2'}}>
            <img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTogax9zpIngdIedKws_YR74E7zM36-uRqFYw'}
                height={35}/>
            <span className='row-name'>{document.name}</span>
        </td>
        <td style={{flex:'1'}}>{getDocumentType(document.mimeType)}</td>
        <td style={{display:'flex',flex:'1',justifyContent:'flex-end'}}>{getDate(document.modifiedTime)}</td>
    </tr>
    )
}

export default DocumentItem