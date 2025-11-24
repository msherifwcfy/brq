import Link from 'next/link';

export default function NotFound() {
    return (
        <div className='min-h-screen bg-black text-white flex items-center justify-center'>
            <div className='text-center'>
                <h2 className='text-4xl font-bold mb-4'>Resource Not Found</h2>
                <p className='mb-6 text-gray-400'>The resource you&apos;re looking for doesn&apos;t exist.</p>
                <Link
                    href='/resources'
                    className='px-6 py-3 rounded-lg bg-[#25B8E4] text-black font-bold hover:bg-[#1ea5d1] transition-colors inline-block'
                >
                    Back to Resources
                </Link>
            </div>
        </div>
    );
}

