import { Dialog } from '@mui/material';
import { FunctionComponent, ReactElement, ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';

const modalRoot = document.createElement('div');
modalRoot.setAttribute('id', 'modal-root');
document.body.appendChild(modalRoot);

interface IProps {
    children: ReactElement<ReactNode>;
    isOpen: boolean;
    modalClose: () => void;
}

const Portal: FunctionComponent<IProps> = ({ isOpen, modalClose, children }) => {
    const el = document.createElement('div');

    useEffect(() => {
        modalRoot.appendChild(el);
        return () => { modalRoot.removeChild(el) };
    });

    return ReactDOM.createPortal(
        <>
            <Dialog onClose={modalClose} open={isOpen} maxWidth={false} scroll="paper">
                {children}
            </Dialog>
        </>,
        el
    );
};

export default Portal;
