import { createPortal } from "react-dom";
import Image from "next/image";



export default function Modal({ open, children, toggle }: { open?: boolean, children: React.ReactNode, toggle: () => void }) {
    return (
        <>
            {
                open && createPortal(
                    <div className="fixed top-0 left-0 w-screen h-screen bg-[#00000080] z-10 flex justify-center items-center" data-testid="modal">
                        <div className="bg-white min-w-[47.9375rem] max-h-fit rounded-[20px] flex flex-col p-8 shadow-md">
                            <Image 
                                src="/close.svg"
                                alt="close icon"
                                className="self-end cursor-pointer mb-4"

                                width={16}
                                height={16}
                                onClick={toggle}
                            />

                            {children}
                        </div>
                    </div>,
                    document.body
                )
            }

        </>
    )
}