import React from 'react'
import DocumentItem from './DocumentItem'

const DocumentTable = ({documents}) => {
  return (
    <table
        style={{display:'flex', flexDirection:'column',width:'80%',margin:'auto',gap:'0.5em',
            height:'88vh',overflowY:'scroll'}}>
        <thead>
            <tr
                style={{display:'flex', justifyContent:'space-between', borderBottom:'1px solid #c5c5c5',padding:'1em',fontWeight:'600'}}>
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