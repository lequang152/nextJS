'use-client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@mui/material';
// import TextSelector from 'text-selection-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddModal from './app.addmodal';
import UpdateModal from './app.updatemodal';
import { mutate } from 'swr';
import DeleteModal from './app.deletemodal';

interface IProps {
    blogs: IBlog[];
}

function AppTable(props: IProps) {
    const { blogs } = props;
    const [showModalCreate, setShowModalCreate] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const idCRUD = useRef(0);

    const handlerSubmit = () => {};

    return (
        <div className="container mx-auto">
            <ToastContainer />

            <div className=" lg:w-[80%] w-[90%] mb-3 flex justify-between container mx-auto">
                <h3 className="text-2xl font-bold">Table Blogs</h3>
                <Button variant="contained" onClick={() => setShowModalCreate(true)}>
                    Add New
                </Button>
                <AddModal showModalCreate={showModalCreate} setShowModalCreate={setShowModalCreate} />
            </div>
            <div>
                <table className="lg:w-[80%] w-[90%] table-auto border border-collapse mb-6 mx-auto container">
                    <thead>
                        <tr className="border border-collapse">
                            <th className="p-3 border border-collapse hover:bg-slate-300">ID</th>
                            <th className="p-3 border border-collapse hover:bg-slate-300">Title</th>
                            <th className="p-3 border border-collapse hover:bg-slate-300">Author</th>
                            <th className="p-3 border border-collapse hover:bg-slate-300">Content</th>
                            <th className="p-3 border border-collapse hover:bg-slate-300">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs?.map((item: any, index) => {
                            return (
                                <tr key={index} className="border border-collapse">
                                    {/* <TextSelector
                                        unmark={true}
                                        unmarkText={'Undo'}
                                        events={[
                                            {
                                                text: 'Mark',
                                                handler: handlerSubmit,
                                            },
                                        ]}
                                        color={'yellow'}
                                        colorText={true}
                                    ></TextSelector> */}
                                    {/* <Popover
                                        render={({ clientRect, isCollapsed, textContent }) => {
                                            if (clientRect == null || isCollapsed) return null;

                                            // I'm using emotion for this example but you can use anything really
                                            const style = css`
                                                position: absolute;
                                                left: ${clientRect.left + clientRect.width / 2}px;
                                                top: ${clientRect.top - 40}px;
                                                margin-left: -75px;
                                                width: 50px;
                                                background: #a3b4d5;
                                                font-size: 0.7em;
                                                text-align: center;
                                                color: white;
                                                border-radius: 3px;
                                                cursor: pointer;
                                            `;

                                            return (
                                                <div className={style}>
                                                    <button onClick={handlerSubmit}>Mark</button>
                                                </div>
                                            );
                                        }}
                                    /> */}
                                    <td className="p-3 border border-collapse hover:bg-slate-300">{item.id}</td>

                                    <td className="p-3 border border-collapse hover:bg-slate-300">{item.title}</td>
                                    <td className="p-3 border border-collapse hover:bg-slate-300">
                                        <p>{item.author}</p>
                                    </td>
                                    <td className="p-3 border border-collapse hover:bg-slate-300">
                                        <p>{item.content}</p>
                                    </td>
                                    <td className="p-3">
                                        <div className="flex justify-between">
                                            <div className="mr-3">
                                                <Button
                                                    className="mr-2"
                                                    variant="contained"
                                                    color="secondary"
                                                    size="small"
                                                    onClick={() => {
                                                        idCRUD.current = item.id;
                                                        setShowModalUpdate(true);
                                                    }}
                                                >
                                                    Update
                                                </Button>
                                                <UpdateModal
                                                    blogs={blogs}
                                                    id={idCRUD.current}
                                                    showModalUpdate={showModalUpdate}
                                                    setShowModalUpdate={setShowModalUpdate}
                                                />
                                            </div>
                                            <Button
                                                variant="contained"
                                                color="error"
                                                size="small"
                                                onClick={() => {
                                                    idCRUD.current = item.id;
                                                    setShowModalDelete(true);
                                                }}
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                        <DeleteModal
                                            id={idCRUD.current}
                                            showModalDelete={showModalDelete}
                                            setShowModalDelete={setShowModalDelete}
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AppTable;
