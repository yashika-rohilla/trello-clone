import { Modal } from "react-bootstrap";

interface PopupProps {
  show: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const PopupComponent: React.FC<PopupProps> = ({
  show,
  onClose,
  title,
  children,
}: PopupProps) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

export default PopupComponent;
