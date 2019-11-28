import styled from 'styled-components';

export const Button = styled.button`
  width: 50%;
  text-transform: capitalize;
  font-size: 1.4rem;
  background: #007bff;
  border: 0.05rem solid #2a2a72;
  color: #fff;
  border-radius: 0.5rem;
  padding: 0.2rem 0.5rem;
  cursor: pointer;
  margin: 0.2rem 0.5rem 0.5rem 0;
  transition: all 0.5s ease-in-out;
  &:hover {
    background: transparent;
    color: #2a2a72;
  }
  &:focus {
    outline: none;
  }
`;