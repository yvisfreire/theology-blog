'use client';
import { useEffect, useState } from "react";

export default function ProfileImage({ user, className }) {
    const [imgSrc, setImgSrc] = useState(`${process.env.NEXT_PUBLIC_API_URL}/users/${user.username}/profileImg`);
    const handleImageError = () => {
        console.log('erro');
        setImgSrc('/blank-profile.png');
    };

    return (
        <img src={imgSrc} onError={handleImageError} alt="Foto de perfil" className={className} />
    );
}