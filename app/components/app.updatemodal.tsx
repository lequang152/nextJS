'use-client';

import { useEffect, useState } from 'react';
// import TextSelector from 'text-selection-react';
// import { css } from '@emotion/css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { mutate } from 'swr';
import { Button, Modal, Box } from '@mui/material';

interface IProps {
    blogs: IBlog[];
    id: number;
    showModalUpdate: boolean;
    setShowModalUpdate: (value: boolean) => void;
}

function UpdateModal(props: IProps) {
    const { blogs, id, showModalUpdate, setShowModalUpdate } = props;
    const [titleUpdate, setTitleUpdate] = useState('');
    const [contentUpdate, setContentUpdate] = useState('');
    const [authorUpdate, setAuthorUpdate] = useState('');
    useEffect(() => {
        console.log(blogs.at(id - 1)?.title);
        setTitleUpdate(blogs.at(id - 1)?.title as string);
        setAuthorUpdate(blogs.at(id - 1)?.author as string);
        setContentUpdate(blogs.at(id - 1)?.content as string);
    }, [id]);

    const handleClose = () => {
        setShowModalUpdate(false);
    };

    async function updateJSON(data: object) {
        try {
            const response = await fetch('http://localhost:8000/blogs/' + id, {
                method: 'PUT', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            mutate('http://localhost:8000/blogs');
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleUpdate = () => {
        if (titleUpdate !== '' && authorUpdate !== '' && contentUpdate !== '') {
            const data = {
                title: titleUpdate,
                author: authorUpdate,
                content: contentUpdate,
            };
            updateJSON(data);
            toast.success('Update Success!');
            handleClose();
        } else {
            toast.error('Please complete all information');
        }
    };

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <Modal
            className="lg"
            open={showModalUpdate}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div className="mb-3">
                    <label className="text-lg font-bold text-stone-700">UPDATE ITEM</label>
                </div>
                <div className="mb-3">
                    <label className="mr-2">Title</label>
                    <input
                        className="border w-[100%]"
                        type="text"
                        onChange={(e) => setTitleUpdate(e.target.value)}
                        value={titleUpdate}
                    ></input>
                </div>
                <div className="mb-3">
                    <label className="mr-2">Author</label>
                    <input
                        className="border w-[100%]"
                        type="text"
                        onChange={(e) => setAuthorUpdate(e.target.value)}
                        value={authorUpdate}
                    ></input>
                </div>
                <div className="mb-3">
                    <label className="mr-2">Content</label>
                    <textarea
                        className="border w-[100%]"
                        onChange={(e) => setContentUpdate(e.target.value)}
                        value={contentUpdate}
                    ></textarea>
                </div>
                <Button variant="outlined" color="error" onClick={handleClose}>
                    Close
                </Button>
                <Button className="float-right" variant="outlined" onClick={handleUpdate}>
                    Update
                </Button>
            </Box>
        </Modal>
    );
}

export default UpdateModal;
