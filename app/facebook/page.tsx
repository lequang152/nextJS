'use client';
import { useRouter } from 'next/navigation';
import AppTable from '../components/app.table';
import useSWR from 'swr';

function Facebook() {
    const router = useRouter();
    const handleBtn = () => {
        router.push('/');
    };

    const url = 'http://localhost:8000/blogs';

    const fetcher = (url: string) => fetch(url).then((res) => res.json());

    const { data, error, isLoading } = useSWR(url, fetcher, {
        revalidateOnMount: true,
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    if (error) return <div>Error</div>;
    if (isLoading) {
        return (
            <div className="max-w-5xl animate-pulse container mx-auto mt-3">
                <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[930px] mb-2.5"></div>
                <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[930px] mb-2.5"></div>
                <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[930px] mb-2.5"></div>
                <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[930px]"></div>
            </div>
        );
    }
    return (
        <div>
            <AppTable blogs={data} />
            <button className="bg-red-500 p-1" onClick={handleBtn}>
                Back Home
            </button>
        </div>
    );
}

export default Facebook;
