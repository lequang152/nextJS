'use-client';

import { useState } from 'react';
// import TextSelector from 'text-selection-react';
// import { css } from '@emotion/css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSWRConfig } from 'swr';
import { Button, Modal, Box } from '@mui/material';

interface IProps {
    id: number;
    showModalDelete: boolean;
    setShowModalDelete: (value: boolean) => void;
}

function DeleteModal(props: IProps) {
    const { id, showModalDelete, setShowModalDelete } = props;
    const { mutate } = useSWRConfig();
    const handleClose = () => {
        setShowModalDelete(false);
    };

    async function deleteJSON(id: number) {
        try {
            const response = await fetch('http://localhost:8000/blogs/' + id, {
                method: 'DELETE',
            })
                .then((res) => res.text()) // or res.json()
                .then((res) => console.log(res));
            mutate('http://localhost:8000/blogs');
        } catch (e) {
            console.error('Error', e);
        }
    }

    const handleDelete = (id: number) => {
        deleteJSON(id);
        toast.success('Delete Success!');
        handleClose();
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
            open={showModalDelete}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div className="mb-3">
                    <label className="text-lg font-bold text-stone-700">Do you want to delete this content?</label>
                </div>

                <Button variant="outlined" color="error" onClick={handleClose}>
                    Close
                </Button>
                <Button className="float-right" variant="outlined" onClick={() => handleDelete(id)}>
                    Delete
                </Button>
            </Box>
        </Modal>
    );
}

export default DeleteModal;
