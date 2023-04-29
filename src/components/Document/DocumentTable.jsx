import React from 'react'
import DocumentItem from './DocumentItem'
import './document.css';


const DocumentTable = ({documents}) => {
  return (
    <table className='document-table'>
        <thead>
            <tr className='document-table-row'>
            <td style={{display:'flex',flex:2}}>Name</td>
            <td style={{flex:1}}>Type</td>
            <td style={{display:'flex',justifyContent:'flex-end',flex:1}}>Last Modified</td>
            </tr>
        </thead>

        <tbody>
        {
            documents.map(document =>
                <DocumentItem document={document}/>
                )
        }
        </tbody>
    </table>
  )
}

export default DocumentTable