import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelection } from '../context/SelectionContext';

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
  width: 100%;
  max-width: 600px;
`;

const QuestionTitle = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const OptionButton = styled.button`
  background-color: ${(props) => (props.selected ? '#4CAF50' : '#f0f0f0')};
  color: ${(props) => (props.selected ? '#fff' : '#333')};
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  margin: 5px 0;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #ddd;
  }
`;

const Question = ({ question, options, index, resetOptions }) => {
  const { selectedOptions, updateSelection } = useSelection();
  const selectedOption = selectedOptions[index];

  useEffect(() => {
    if (resetOptions) {
      updateSelection(index, null); // Reset selection when spin happens
    }
  }, [resetOptions, index, updateSelection]);

  return (
    <QuestionContainer>
      <QuestionTitle>{question}</QuestionTitle>
      {options.map((option, optIndex) => (
        <OptionButton
          key={optIndex}
          selected={selectedOption === optIndex}
          onClick={() => updateSelection(index, optIndex)}
        >
          {option}
        </OptionButton>
      ))}
    </QuestionContainer>
  );
};

export default Question;
