import * as C from "./style";
import { IoClose } from "react-icons/io5"
import { useEffect, useState } from "react";
type props = {
    template: JSX.Element | undefined,
    title: string | undefined,
    disableModal: () => void,
    state : boolean
}
const Modal = ({ template, title, disableModal, state}: props) => {
    return(
        <C.Container active={state}>
            <C.Modal className="modal">
                <C.Header>
                    <C.Title>{title}</C.Title>
                    <IoClose onClick={()=> disableModal()} className="close-modal" size={30}/>
                </C.Header>
                {template}
            </C.Modal>
        </C.Container>
    )
}
export default Modal;