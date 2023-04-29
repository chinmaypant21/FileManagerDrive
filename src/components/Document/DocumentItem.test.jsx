import React from 'react';
import { render } from '@testing-library/react';
import DocumentItem from './DocumentItem';

describe('DocumentItem', () => {
  const document = {
    name: 'My Document',
    mimeType: 'application/xyz.pdf',
    modifiedTime: '2022-05-01T12:00:00Z',
  };

  it('renders the document name', () => {
    const { getByText } = render(<DocumentItem document={document} />);
    expect(getByText('My Document')).toBeInTheDocument();
  });

  it('renders the document type', () => {
    const { getByText } = render(<DocumentItem document={document} />);
    expect(getByText('pdf')).toBeInTheDocument();
  });

  it('renders the document modification date', () => {
    const { getByText } = render(<DocumentItem document={document} />);
    expect(getByText('1 May 2022')).toBeInTheDocument();
  });
});