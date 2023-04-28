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
    <tr
        style={{display:'flex', justifyContent:'space-between',borderBottom:'1px solid #c5c5c5',gap:'0.5em',alignItems:'center'}}
    >
            <td style={{display:'flex',gap:'0.5em', flex:'2'}}>
                <img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTogax9zpIngdIedKws_YR74E7zM36-uRqFYw'}
                    height={35}/>
                {/* <img src={'https://images.freeimages.com/fic/images/icons/2813/flat_jewels/32/file.png'} /> */}
                <span>{document.name}</span>
            </td>
            <td style={{flex:'1'}}>{getDocumentType(document.mimeType)}</td>
            <td style={{display:'flex',flex:'1',justifyContent:'flex-end'}}>{getDate(document.modifiedTime)}</td>
    </tr>
    )
}

export default DocumentItem