'use client';

import AuthContext from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function Settings() {
    const { isAuthenticated } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login');
        }
    }, []);

    return (
        <div></div>
    );
}