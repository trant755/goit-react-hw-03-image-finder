import * as SC from './Modal.styled';

export const Modal = ({ src, alt, onClick }) => (
  <SC.Overlay onClick={onClick}>
    <SC.Modal>
      <img src={src} alt={alt} />
    </SC.Modal>
  </SC.Overlay>
);
