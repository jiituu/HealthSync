import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

export default function CustomModal(
    {
        modalTitle,
        open,
        setOpen,
        children,
        width,
        onOk,
        okText,
        height,
        confirmationModal,
        confirmationModalText
    }: {
        modalTitle: string,
        open: boolean,
        setOpen: any,
        children: any,
        width?: string,
        onOk?: () => void,
        okText?: string,
        height?: string,
        confirmationModal?:boolean,
        confirmationModalText?:string
    }
) {
    return (
        <>
            <Modal
                open={open}
                title={modalTitle}
                width={width ?? "fit-content"}
                className='antd-modal-container'
                onOk={() => onOk}
                footer={onOk === undefined ? null : <></>}
                okText={okText ?? "Save"}
                onCancel={() => {
                    if (confirmationModal==true){
                        Modal.confirm({
                            title: 'Confirm',
                            icon: <ExclamationCircleOutlined />,
                            content: confirmationModalText?? 'Are you sure',
                            okText: 'Yes',
                            cancelText: 'No',
                            onOk: async () => {
                                setOpen(false);
                            }
                        });
                    }else{
                        setOpen(false);
                    }
                }}
                style={{
                    position: 'relative',
                    zIndex: 9999,
                    height: height ?? "auto"
                }}
                centered={true}
                destroyOnClose={true}
            >
                {children}
            </Modal>
        </>
    );
}
