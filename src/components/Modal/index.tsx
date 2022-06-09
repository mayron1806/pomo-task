import * as C from "./style";
import { IoClose } from "react-icons/io5"
type props = {
    template: JSX.Element | undefined,
    title: string | undefined,
    disableModal: () => void,
    isActive : boolean,
    ref?: React.MutableRefObject<HTMLDivElement | null>
}
const Modal = ({ template, title, disableModal, isActive, ref}: props) => {
    return(
        <C.Container active={isActive} ref={ref}>
            <C.Modal className="modal">
                <C.Header>
                    <C.Title>{title}</C.Title>
                    <IoClose onClick={()=> disableModal()} className="close-modal" size={30}/>
                </C.Header>
                <C.Content hasContent={template !== undefined}>
                    {template}
                </C.Content>
            </C.Modal>
        </C.Container>
    )
}
export default Modal;