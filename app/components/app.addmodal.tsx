'use-client';

import { useState } from 'react';
// import TextSelector from 'text-selection-react';
// import { css } from '@emotion/css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { mutate } from 'swr';
import { Button, Modal, Box } from '@mui/material';

interface IProps {
    showModalCreate: boolean;
    setShowModalCreate: (value: boolean) => void;
}

function AddModal(props: IProps) {
    const { showModalCreate, setShowModalCreate } = props;
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');

    const handleClose = () => {
        setTitle('');
        setAuthor('');
        setContent('');
        setShowModalCreate(false);
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

    async function postJSON(data: object) {
        try {
            const response = await fetch('http://localhost:8000/blogs', {
                method: 'POST', // or 'PUT'
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

    const handleSubmit = () => {
        if (title !== '' && author !== '' && content !== '') {
            const data = {
                title,
                author,
                content,
            };
            postJSON(data);
            toast.success('Add Success!');
            handleClose();
        } else {
            toast.error('Please complete all information');
        }
    };

    return (
        <Modal
            className="lg"
            open={showModalCreate}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div className="mb-3">
                    <label className="text-lg font-bold text-stone-700">ADD ITEM</label>
                </div>
                <div className="mb-3">
                    <label className="mr-2">Title</label>
                    <input
                        className="border w-[100%]"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    ></input>
                </div>
                <div className="mb-3">
                    <label className="mr-2">Author</label>
                    <input
                        className="border w-[100%]"
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    ></input>
                </div>
                <div className="mb-3">
                    <label className="mr-2">Content</label>
                    <textarea
                        className="border w-[100%]"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                </div>
                <Button variant="outlined" color="error" onClick={handleClose}>
                    Close
                </Button>
                <Button className="float-right" variant="outlined" onClick={() => handleSubmit()}>
                    Add
                </Button>
            </Box>
        </Modal>
    );
}

export default AddModal;
