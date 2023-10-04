import Image from 'next/image';
import Link from 'next/link';
import Facebook from './facebook/page';
import { Button } from '@mui/material';

export default function Page() {
    return (
        <div className="container m-auto flex">
            <div className="m-auto">
                <Link href={'/facebook'}>Facebook</Link>
            </div>
        </div>
    );
}
