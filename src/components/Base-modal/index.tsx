import * as C from "./style";
import { IoClose } from "react-icons/io5"
import { useEffect, useState } from "react";
type props = {
    template: JSX.Element | undefined,
    title: string | undefined,
    disableModal: () => void,
    state : boolean,
    ref?: React.MutableRefObject<HTMLDivElement | null>
}
const Modal = ({ template, title, disableModal, state, ref}: props) => {
    return(
        <C.Container active={state} ref={ref}>
            <C.Modal className="modal">
                <C.Header>
                    <C.Title>{title}</C.Title>
                    <IoClose onClick={()=> disableModal()} className="close-modal" size={30}/>
                </C.Header>
                <C.Content>
                    {template}
                </C.Content>
            </C.Modal>
        </C.Container>
    )
}
export default Modal;