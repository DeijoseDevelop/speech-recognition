import { useLayoutEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const useAuthHook = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useLayoutEffect(() => {
        if (status === 'loading') return;
        if (!session) {
            router.replace('/login');
        } else {
            setLoading(false);
        }
    }, [session, status, router]);

    return { session, status, loading };
};

export default useAuthHook;