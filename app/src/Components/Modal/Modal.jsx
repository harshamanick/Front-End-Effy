import { Modal } from "antd";

// Modal Component.
const ModalView = (props) => {
  const { mainContent, onCancelClick, onCreateClick, isModelOpen, title } =
    props;
  const handleOk = () => {
    onCreateClick();
  };
  const handleCancel = () => {
    onCancelClick();
  };
  return (
    <>
      <Modal
        title={title}
        open={isModelOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
        cancelText="Discard"
        okText="Create"
      >
        {mainContent}
      </Modal>
    </>
  );
};
export default ModalView;
